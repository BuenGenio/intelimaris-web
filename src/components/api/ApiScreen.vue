<template>
  <!-- Will she fit? -->
  <div v-if="id === 'fit'" class="scr" data-kind="marina">
    <div class="scr-head">
      <div><h1 class="scr-h1">Will she fit?</h1><p class="scr-sub scr-small">Bahia Mar · {{ v.loa_ft }} ft × {{ v.beam_ft }} ft · draws {{ v.draft_ft }} ft</p></div>
      <span class="scr-pill" :data-tone="VERDICT[fit.marina.verdict]!.tone">{{ VERDICT[fit.marina.verdict]!.label }}</span>
    </div>
    <svg class="api-basin" :viewBox="basinBox" role="img" :aria-label="`Basin plan: ${fit.tally.fits} berths fit, ${fit.tally.will_not_fit} will not, ${fit.tally.unknown} unknown`">
      <rect x="-100" y="-100" width="1100" height="800" class="api-basin-water" />
      <g v-for="b in fit.berths" :key="b.id">
        <rect :x="geom(b.id).x" :y="geom(b.id).y" :width="geom(b.id).w" :height="geom(b.id).h" rx="6" class="api-basin-berth" :data-verdict="b.fit.verdict" :data-closed="b.status === 'closed'" />
        <text :x="geom(b.id).x + geom(b.id).w / 2" :y="geom(b.id).y + geom(b.id).h / 2" text-anchor="middle" dominant-baseline="central" class="api-basin-label" :transform="geom(b.id).h > geom(b.id).w * 1.4 ? `rotate(-90 ${geom(b.id).x + geom(b.id).w / 2} ${geom(b.id).y + geom(b.id).h / 2})` : undefined">{{ b.id }}</text>
      </g>
    </svg>
    <div class="scr-row scr-row--wrap api-tally">
      <span class="scr-pill" data-tone="safe">{{ fit.tally.fits }} fit</span>
      <span class="scr-pill" data-tone="danger">{{ fit.tally.will_not_fit }} won’t fit</span>
      <span class="scr-pill" data-tone="offline">{{ fit.tally.unknown }} unknown</span>
    </div>
    <div class="scr-list">
      <div v-for="b in fit.berths" :key="b.id" class="scr-item">
        <span class="scr-item-icon" :data-tone="VERDICT[b.fit.verdict]!.icon"><ScrIcon :name="b.fit.verdict === 'fits' ? 'check' : b.fit.verdict === 'will_not_fit' ? 'x' : 'dots'" /></span>
        <span>
          <span class="scr-item-title">{{ b.label }}</span>
          <span class="scr-item-sub">{{ b.fit.verdict === 'fits' ? reasonFor(b.fit.checks, 'loa') : b.fit.summary }}</span>
        </span>
        <span class="api-end">
          <span class="scr-pill" :data-tone="VERDICT[b.fit.verdict]!.tone">{{ VERDICT[b.fit.verdict]!.label }}</span>
          <span v-if="b.status === 'closed'" class="scr-pill" data-tone="offline">Closed</span>
        </span>
      </div>
    </div>
    <p class="scr-micro scr-muted api-foot">{{ fit.disclaimer }}</p>
  </div>

  <!-- Where can I stay? -->
  <div v-else-if="id === 'stay'" class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">Stays near {{ placeLabel }}</h1><p class="scr-sub scr-small">{{ stayDates }} · {{ v.nights }} night{{ v.nights === 1 ? '' : 's' }} · {{ v.loa_ft }} ft</p></div>
    </div>
    <ScrMap :height="140" :pins="stayPins" :self="{ x: 200, y: 120 }" />
    <div class="scr-list api-gap">
      <div v-for="s in stays" :key="s.name" class="scr-item">
        <span class="scr-item-icon" :data-tone="s.kind === 'marina' ? 'accent' : undefined"><ScrIcon :name="s.kind === 'marina' ? 'anchor' : 'home'" /></span>
        <span>
          <span class="scr-item-title">{{ s.name }}</span>
          <span class="scr-item-sub">{{ away(s.distance_m) }} · takes up to {{ Math.round(s.max_loa_m / 0.3048) }} ft</span>
          <span class="scr-item-sub"><strong class="scr-num">{{ money(s.from_cents_per_night) }}</strong> a night<template v-if="s.cta !== 'unavailable'"> · {{ money(s.from_cents_per_night * Number(v.nights)) }} in all</template></span>
        </span>
        <span class="api-end">
          <span class="scr-pill" :data-tone="CTA[s.cta]!.tone">{{ CTA[s.cta]!.label }}</span>
          <span v-if="s.max_loa_m < Number(v.loa_ft) * 0.3048" class="scr-pill" data-tone="danger">Too short</span>
        </span>
      </div>
      <p v-if="!stays.length" class="scr-empty"><strong>Nothing within 8 km</strong>Try another place.</p>
    </div>
    <p class="scr-micro scr-muted api-foot">A marina has no calendar to pre-check: you send a request and the dockmaster allocates.</p>
  </div>

  <!-- Plan my passage -->
  <div v-else-if="id === 'passage'" class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">{{ routeLabel }}</h1><p class="scr-sub scr-small">Tomorrow · draws {{ v.draft_ft }} ft · keeps {{ v.margin_ft }} ft under the keel</p></div>
    </div>
    <ScrMap :height="150" :track="routeTrack" :self="routeStart" />
    <div class="scr-kpis api-gap">
      <div class="scr-stat"><p class="scr-stat-label">Leave</p><p class="scr-stat-value scr-num">{{ clock(plan.passage.departs_at) }}</p></div>
      <div class="scr-stat"><p class="scr-stat-label">Arrive</p><p class="scr-stat-value scr-num">{{ clock(plan.passage.arrives_at) }}</p></div>
      <div class="scr-stat"><p class="scr-stat-label">Distance</p><p class="scr-stat-value scr-num">{{ nm(plan.passage.distance_m) }}</p></div>
      <div class="scr-stat"><p class="scr-stat-label">Under way</p><p class="scr-stat-value scr-num">{{ plan.passage.duration_min }} min</p></div>
    </div>
    <div class="scr-card api-gap">
      <p class="scr-card-title">Depth</p>
      <p class="scr-small"><strong class="scr-num">{{ Math.round(plan.passage.clear_prob_at_margin * 100) }}%</strong> sure to clear your {{ v.margin_ft }} ft margin at {{ plan.passage.pinch_points[0]!.name }}</p>
      <div class="scr-progress"><i :style="{ width: `${plan.passage.clear_prob_at_margin * 100}%`, background: plan.passage.clear_prob_at_margin >= 0.9 ? 'var(--safe)' : plan.passage.clear_prob_at_margin >= 0.6 ? 'var(--warn)' : 'var(--danger)' }"></i></div>
      <p class="scr-micro scr-muted">{{ plan.passage.pinch_points[0]!.note }}</p>
    </div>
    <div class="scr-list api-gap">
      <div v-for="w in plan.passage.waits" :key="w.near" class="scr-item">
        <span class="scr-item-icon" data-tone="warn"><ScrIcon name="clock" /></span>
        <span><span class="scr-item-title">Wait {{ w.minutes }} min</span><span class="scr-item-sub">{{ w.near }} · opens at {{ clock(w.to) }}</span></span>
      </div>
      <p v-if="!plan.passage.waits.length" class="scr-small scr-muted">No waits on this route at this time.</p>
    </div>
    <ul class="api-notes"><li v-for="n in plan.passage.notes" :key="n" class="scr-micro scr-muted">{{ n }}</li></ul>
  </div>

  <!-- Hazards -->
  <div v-else-if="id === 'hazards'" class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">Hazards</h1><p class="scr-sub scr-small">Within {{ v.radius_nm }} nm of {{ placeLabel }}, nearest first</p></div>
    </div>
    <ScrMap :height="140" :pins="hazardPins" :self="{ x: 200, y: 120 }" />
    <div class="scr-list api-gap">
      <div v-for="h in hazards" :key="h.id" class="scr-item">
        <span class="scr-item-icon" :data-tone="h.category === 'disabled_vessel' ? 'danger' : h.category === 'wildlife' ? 'accent' : 'warn'"><ScrIcon name="alert" /></span>
        <span>
          <span class="scr-item-title">{{ HAZARD_LABEL[h.category] ?? h.category }}</span>
          <span class="scr-item-sub">{{ h.note }}</span>
          <span class="scr-item-sub scr-micro">Reported {{ ago(h.reported_at) }} · {{ h.confirmations }} confirmation{{ h.confirmations === 1 ? '' : 's' }} · until {{ clock(h.expires_at) }}</span>
        </span>
        <span class="api-end"><span class="scr-num scr-small">{{ nm(h.distance_m) }}</span><span class="scr-pill" :data-tone="h.status === 'expiring' ? 'warn' : h.status === 'confirmed' ? 'accent' : 'info'">{{ cap(h.status) }}</span></span>
      </div>
      <p v-if="!hazards.length" class="scr-empty"><strong>Nothing reported within {{ v.radius_nm }} nm</strong>Only active reports appear. Expired and cleared ones don’t.</p>
    </div>
    <p class="scr-micro scr-muted api-foot">Reports come from other skippers. They are unverified claims, drawn apart from charted dangers.</p>
  </div>

  <!-- Events -->
  <div v-else-if="id === 'events'" class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">On the water</h1><p class="scr-sub scr-small">Near {{ placeLabel }} · next {{ v.horizon_days }} days</p></div>
    </div>
    <div class="scr-list">
      <div v-for="e in events" :key="e.slug" class="scr-item">
        <span class="api-date"><b>{{ dayNum(e.starts_at) }}</b>{{ month(e.starts_at) }}</span>
        <span>
          <span class="scr-item-title">{{ e.name }}</span>
          <span class="scr-item-sub">{{ EVENT_KIND[e.kind] }} · {{ when(e.starts_at, e.ends_at) }}</span>
          <span class="scr-row scr-row--wrap api-pills">
            <span class="scr-pill" :data-tone="e.status === 'active' ? 'safe' : 'info'">{{ e.status === 'active' ? 'Now' : 'Upcoming' }}</span>
            <span v-if="e.affects_navigation" class="scr-pill" data-tone="warn">Affects navigation</span>
          </span>
          <span class="scr-item-sub scr-micro">{{ e.description }}</span>
          <span class="scr-item-sub scr-micro">{{ EVENT_SOURCE[e.source] }}{{ e.source_ref ? ` · ${e.source_ref}` : '' }}</span>
        </span>
      </div>
      <p v-if="!events.length" class="scr-empty"><strong>Nothing in the next {{ v.horizon_days }} days</strong>Look further ahead.</p>
    </div>
  </div>

  <!-- Traffic -->
  <div v-else-if="id === 'traffic'" class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">Traffic</h1><p class="scr-sub scr-small">{{ areaLabel }}</p></div>
      <span class="scr-pill" :data-tone="traffic.status.state === 'live' ? 'safe' : 'offline'">{{ traffic.status.state === 'live' ? 'AIS live' : 'No feed' }}</span>
    </div>
    <div v-if="traffic.status.state !== 'live'" class="scr-alert" data-tone="warn"><ScrIcon name="radio" /><span><strong>We can’t see traffic right now.</strong> The feed is down, so this is not the same as an empty harbour.</span></div>
    <template v-else>
      <ScrMap :height="150" :pins="trafficPins" />
      <p class="scr-small scr-muted api-gap">{{ traffic.matched }} matching · {{ traffic.status.vessel_count }} heard in the last 20 minutes</p>
      <div class="scr-list">
        <div v-for="f in traffic.vessels.features" :key="f.properties.mmsi" class="scr-item">
          <span class="scr-item-icon" :data-tone="f.properties.class === 'tanker' || f.properties.class === 'cargo' ? 'warn' : f.properties.class === 'passenger' ? 'accent' : undefined"><ScrIcon name="vessel" /></span>
          <span>
            <span class="scr-item-title">{{ CLASS_LABEL[f.properties.class] }}</span>
            <span class="scr-item-sub">{{ f.properties.sog_kn < 0.5 ? 'Stopped' : `${f.properties.sog_kn} kn · heading ${f.properties.cog_deg}°` }}{{ f.properties.destination ? ` · to ${f.properties.destination}` : '' }}</span>
          </span>
          <span class="api-end scr-micro scr-muted scr-num">MMSI {{ f.properties.mmsi }}</span>
        </div>
        <p v-if="!traffic.vessels.features.length" class="scr-empty"><strong>No vessels match</strong>The feed is live; nothing here fits the filter.</p>
      </div>
    </template>
  </div>

  <!-- Marinas near -->
  <div v-else class="scr" data-kind="vessel">
    <div class="scr-head">
      <div><h1 class="scr-h1">Marinas</h1><p class="scr-sub scr-small">Within {{ v.radius_nm }} nm of {{ placeLabel }}</p></div>
    </div>
    <ScrMap :height="150" :pins="marinaPins" :self="{ x: 200, y: 120 }" />
    <div class="scr-list api-gap">
      <div v-for="m in marinas" :key="m.slug" class="scr-item">
        <span class="scr-item-icon" data-tone="accent"><ScrIcon name="anchor" /></span>
        <span><span class="scr-item-title">{{ m.name }}</span><span class="scr-item-sub">{{ away(m.distance_m) }}</span></span>
        <span class="api-end"><ScrIcon name="chevron" /></span>
      </div>
      <p v-if="!marinas.length" class="scr-empty"><strong>No marinas within {{ v.radius_nm }} nm</strong>Widen the search.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import { BERTHS, PLAN_H, PLAN_W } from '@/data/playbook/berth-fit-berths'
import { CLASS_LABEL, EVENT_KIND, EVENT_SOURCE, HAZARD_LABEL, PLACES, ROUTE_TRACK, project, type Values } from '@/data/api-explorer'

/* The answer's shape is the API's own and differs per question, so it is read loosely here. */
const props = defineProps<{ id: string; response: any; v: Values; now: Date; options: Record<string, string> }>()

type Tone = 'safe' | 'warn' | 'danger' | 'high' | undefined
const VERDICT: Record<string, { label: string; tone: string; icon: string | undefined }> = {
  fits: { label: 'Fits', tone: 'safe', icon: 'safe' },
  will_not_fit: { label: 'Won’t fit', tone: 'danger', icon: 'danger' },
  unknown: { label: 'Unknown', tone: 'offline', icon: undefined },
}
const CTA: Record<string, { label: string; tone: string }> = {
  instant_book: { label: 'Instant book', tone: 'safe' },
  request: { label: 'Request', tone: 'info' },
  call_marina: { label: 'Call', tone: 'info' },
  unavailable: { label: 'Booked', tone: 'warn' },
}

const fit = computed(() => props.response)
const stays = computed<any[]>(() => props.response)
const plan = computed(() => props.response)
const hazards = computed<any[]>(() => props.response)
const events = computed<any[]>(() => [...props.response].sort((a, b) => Date.parse(a.starts_at) - Date.parse(b.starts_at)))
const traffic = computed(() => props.response)
const marinas = computed<any[]>(() => props.response)

const centre = computed(() => PLACES[String(props.v.near)] ?? PLACES['bahia-mar']!)
const placeLabel = computed(() => centre.value.label)
const areaLabel = computed(() => props.options.area ?? '')
const routeLabel = computed(() => props.options.route ?? '')
const routeTrack = computed(() => ROUTE_TRACK(String(props.v.route)))
const routeStart = computed(() => {
  const m = /M(\d+) (\d+)/.exec(routeTrack.value)
  return { x: Number(m?.[1] ?? 200), y: Number(m?.[2] ?? 20), heading: 180 }
})

const geom = (id: string) => {
  const g = BERTHS.find(b => b.id === id)!.geom
  return { x: g.x * (900 / PLAN_W), y: g.y * (600 / PLAN_H), w: g.w * (900 / PLAN_W), h: g.h * (600 / PLAN_H) }
}
/* Crop the plan to the berths, with a little water around them. */
const basinBox = computed(() => {
  const g = BERTHS.map(b => geom(b.id))
  const x = Math.min(...g.map(r => r.x)) - 30, y = Math.min(...g.map(r => r.y)) - 30
  const w = Math.max(...g.map(r => r.x + r.w)) - x + 30, h = Math.max(...g.map(r => r.y + r.h)) - y + 30
  return `${x} ${y} ${w} ${h}`
})
const reasonFor = (checks: any[], dim: string) => checks.find(c => c.dimension === dim)?.reason ?? ''

const pins = (rows: any[], radiusM: number, tone: (r: any) => Tone) => rows.map(r => ({ ...project(r, centre.value, radiusM), tone: tone(r) }))
const stayPins = computed(() => pins(stays.value, 8000, s => (s.cta === 'instant_book' ? 'safe' : s.cta === 'unavailable' ? 'warn' : undefined)))
const hazardPins = computed(() => pins(hazards.value, Number(props.v.radius_nm) * 1852, h => (h.category === 'disabled_vessel' ? 'danger' : 'warn')))
const marinaPins = computed(() => pins(marinas.value, Number(props.v.radius_nm) * 1852, () => undefined))
const trafficPins = computed(() => {
  const feats: any[] = traffic.value.vessels?.features ?? []
  if (!feats.length) return []
  const lats = feats.map(f => f.geometry.coordinates[1]), lngs = feats.map(f => f.geometry.coordinates[0])
  const c = { lat: (Math.min(...lats) + Math.max(...lats)) / 2, lng: (Math.min(...lngs) + Math.max(...lngs)) / 2 }
  return feats.map(f => ({ ...project({ lat: f.geometry.coordinates[1], lng: f.geometry.coordinates[0] }, c, 2600), tone: (f.properties.class === 'tanker' || f.properties.class === 'cargo' ? 'high' : undefined) as Tone }))
})

const TZ = 'America/New_York'
const clock = (s: string) => new Intl.DateTimeFormat('en-GB', { timeZone: TZ, hour: '2-digit', minute: '2-digit' }).format(new Date(s))
const dayNum = (s: string) => new Intl.DateTimeFormat('en-US', { timeZone: TZ, day: 'numeric' }).format(new Date(s))
const month = (s: string) => new Intl.DateTimeFormat('en-US', { timeZone: TZ, month: 'short' }).format(new Date(s))
const weekday = (s: string) => new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(s))
const when = (a: string, b: string) => (weekday(a) === weekday(b) ? `${weekday(a)}, ${clock(a)}–${clock(b)}` : `${weekday(a)} – ${weekday(b)}`)
const ago = (s: string) => {
  const mins = Math.round((props.now.getTime() - Date.parse(s)) / 60000)
  return mins < 60 ? `${mins} min ago` : `${Math.round(mins / 60)} h ago`
}
const nm = (m: number) => `${(m / 1852).toFixed(m < 1852 ? 2 : 1)} nm`
const away = (m: number) => (m < 50 ? 'Right here' : `${nm(m)} away`)
const money = (cents: number) => `$${Math.round(cents / 100)}`
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const stayDates = computed(() => {
  const start = Date.parse(String(props.v.check_in))
  const end = start + Number(props.v.nights) * 86400000
  const f = new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', day: 'numeric', month: 'short' })
  return `${f.format(start)} – ${f.format(end)}`
})
</script>

<style scoped>
.api-basin { display: block; width: 100%; height: auto; border-radius: 12px; margin: 4px 0 10px; }
.api-basin-water { fill: #cfe2f3; }
.api-basin-berth { stroke: #fff; stroke-width: 3; }
.api-basin-berth[data-verdict='fits'] { fill: #2e9b4e; }
.api-basin-berth[data-verdict='will_not_fit'] { fill: #c8322b; }
.api-basin-berth[data-verdict='unknown'] { fill: #8e99af; }
.api-basin-berth[data-closed='true'] { opacity: .45; stroke-dasharray: 10 6; }
.api-basin-label { fill: #fff; font: 700 26px var(--font-text); }
.api-tally { gap: 6px; margin-bottom: 10px; }
.api-gap { margin-top: 10px; }
.api-end { display: grid; justify-items: end; gap: 4px; align-self: center; }
.api-foot { margin-top: 12px; }
.api-notes { margin: 10px 0 0; padding-left: 16px; }
.api-pills { gap: 4px; margin: 4px 0 2px; }
.api-date { display: grid; justify-items: center; align-content: center; width: 40px; height: 44px; border-radius: 10px; background: var(--wave-50); color: var(--wave-700); font: 600 10px var(--font-text); text-transform: uppercase; line-height: 1.1; }
.api-date b { font-size: 17px; }
</style>
