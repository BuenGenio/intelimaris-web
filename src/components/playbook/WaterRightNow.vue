<template>
  <section class="wrn" aria-labelledby="wrn-title">
    <div class="wrn-stage" :class="{ 'is-ready': tideState !== 'loading' }">
      <header class="wrn-top">
        <div class="wrn-heading">
          <p class="wrn-overline">Your water, right now</p>
          <h2 id="wrn-title" class="wrn-marina">
            {{ marina.name }}
            <span class="wrn-place">{{ marina.place }}</span>
          </h2>
        </div>
        <div class="wrn-locate-wrap">
          <button type="button" class="wrn-locate" :disabled="locating" @click="locate">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <circle cx="10" cy="10" r="6.5" fill="none" stroke="currentColor" stroke-width="1.6" />
              <circle cx="10" cy="10" r="2" fill="currentColor" />
              <path d="M10 1v3M10 16v3M1 10h3M16 10h3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            </svg>
            {{ locating ? 'Finding you…' : 'Use my location' }}
          </button>
          <p v-if="locateMsg" class="wrn-locate-msg" role="status">{{ locateMsg }}</p>
        </div>
      </header>

      <!-- Marina picker: chip row on wide screens, thumb-reachable sheet on phones. -->
      <div class="wrn-picker">
        <label class="wrn-search">
          <span class="sr-only">Search the six marinas</span>
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M13 13l4.5 4.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
          </svg>
          <input v-model="query" type="search" placeholder="Search the six" autocomplete="off" spellcheck="false" />
        </label>
        <div ref="chipRow" class="wrn-chips" role="radiogroup" aria-label="Marina" @keydown="onChipKeydown">
          <button
            v-for="m in filtered"
            :key="m.id"
            type="button"
            role="radio"
            class="wrn-chip"
            :aria-checked="m.id === marina.id"
            :tabindex="m.id === marina.id || (filtered.every((f) => f.id !== marina.id) && m.id === filtered[0]?.id) ? 0 : -1"
            @click="select(m.id)"
          >
            <span class="wrn-chip-name">{{ m.name }}</span>
            <span class="wrn-chip-place">{{ m.place }}</span>
          </button>
          <p v-if="!filtered.length" class="wrn-chip-empty">No marina by that name in the six. Clear the search to see them all.</p>
        </div>
      </div>

      <!-- Hero: the tide as a large number with its unit and its age. -->
      <div class="wrn-hero">
        <div class="wrn-hero-main">
          <p class="wrn-hero-label">Tide {{ hero.kind === 'observed' ? 'observed' : hero.kind === 'predicted' ? 'predicted' : '' }}</p>
          <p class="wrn-hero-number t-num" :class="{ 'is-unknown': hero.value === null }">
            <span class="wrn-hero-digits">{{ hero.value === null ? '—' : shown.toFixed(1) }}</span>
            <span class="wrn-hero-unit">ft <small>MLLW</small></span>
          </p>
          <p class="wrn-hero-stamp t-num">{{ hero.stamp }}</p>
          <p v-if="hero.note" class="wrn-note" :class="`is-${hero.noteTone}`">{{ hero.note }}</p>
          <p v-if="trendLine" class="wrn-trend">
            <span class="wrn-trend-arrow" :data-trend="tideInfo.trend" aria-hidden="true"></span>
            {{ trendLine }}
          </p>
        </div>
        <dl class="wrn-extremes" aria-label="Next highs and lows">
          <div v-for="x in upcoming" :key="x.t" class="wrn-extreme">
            <dt>{{ x.type === 'H' ? 'High' : 'Low' }} <span class="wrn-extreme-day">{{ fmtDay(x.t, marina.tz, now) }}</span></dt>
            <dd class="t-num">{{ fmtTime(x.t, marina.tz) }} <span class="wrn-extreme-v">{{ x.v.toFixed(1) }} ft</span></dd>
          </div>
          <div v-if="!upcoming.length" class="wrn-extreme wrn-extreme--empty">
            <dt>Highs and lows</dt>
            <dd>{{ tideState === 'loading' ? 'Asking NOAA…' : 'Not available from this station right now.' }}</dd>
          </div>
        </dl>
      </div>

      <!-- Tide curve for the next 24 h, predicted, with now marked. -->
      <figure class="wrn-curve" :aria-label="curveLabel" role="img">
        <div class="wrn-curve-frame">
          <svg v-if="chart" viewBox="0 0 1000 280" preserveAspectRatio="none" class="wrn-curve-svg" aria-hidden="true">
            <defs>
              <linearGradient :id="`${uid}-fill`" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#3D8EE0" stop-opacity="0.45" />
                <stop offset="1" stop-color="#3D8EE0" stop-opacity="0.02" />
              </linearGradient>
            </defs>
            <path :d="chart.area" :fill="`url(#${uid}-fill)`" />
            <path :d="chart.line" fill="none" stroke="#82A6CA" stroke-width="2" vector-effect="non-scaling-stroke" />
            <line v-for="g in chart.ticks" :key="g.t" :x1="g.x" :x2="g.x" y1="0" y2="280" stroke="rgba(255,255,255,0.08)" vector-effect="non-scaling-stroke" />
            <line :x1="chart.nowX" :x2="chart.nowX" y1="0" y2="280" stroke="#ffffff" stroke-opacity="0.6" stroke-width="1" stroke-dasharray="3 4" vector-effect="non-scaling-stroke" />
          </svg>
          <div v-else class="wrn-curve-empty">
            <p>{{ tideState === 'loading' ? `Asking NOAA station ${marina.tide.id} for the next 24 h…` : 'No prediction curve from this station right now. Use the highs and lows above if they are shown, or the station page at tidesandcurrents.noaa.gov.' }}</p>
          </div>
          <template v-if="chart">
            <span
              class="wrn-now-dot"
              :class="{ 'is-observed': hero.kind === 'observed' }"
              :style="{ left: `${chart.nowX / 10}%`, top: `${(chart.nowY / 280) * 100}%` }"
            ></span>
            <span class="wrn-now-label t-num" :style="{ left: `${chart.nowX / 10}%` }">now</span>
            <span
              v-for="x in chart.extremes"
              :key="x.t"
              class="wrn-curve-extreme t-num"
              :class="x.type === 'H' ? 'is-high' : 'is-low'"
              :style="{ left: `${x.x / 10}%`, top: `${(x.y / 280) * 100}%` }"
            >
              <b>{{ x.v.toFixed(1) }}</b><span v-if="!narrow" class="wrn-curve-extreme-time">{{ fmtTime(x.t, marina.tz) }}</span>
            </span>
            <span v-for="g in chart.ticks" :key="g.t" class="wrn-curve-tick t-num" :style="{ left: `${g.x / 10}%` }">{{ fmtHour(g.t, marina.tz) }}</span>
          </template>
        </div>
        <figcaption class="wrn-curve-caption">Predicted, {{ marina.tide.name }}, MLLW. The dot is {{ hero.kind === 'observed' ? 'the observed level' : 'the prediction' }} now.</figcaption>
      </figure>

      <!-- Today on the water -->
      <div class="wrn-strip" aria-label="Today on the water">
        <p class="wrn-strip-title">Today on the water</p>
        <ul class="wrn-pills">
          <li v-for="p in pills" :key="p.label" class="wrn-pill">
            <span class="wrn-pill-label">{{ p.label }}</span>
            <span class="wrn-pill-value t-num">{{ p.value }}</span>
          </li>
        </ul>
      </div>

      <!-- Cards -->
      <div class="wrn-cards">
        <article class="wrn-card">
          <p class="wrn-card-label">Wind</p>
          <template v-if="weather && weather.windKmh !== null">
            <p class="wrn-card-number t-num">
              {{ Math.round(kmhToKn(weather.windKmh)) }}<span class="wrn-card-unit">kn</span>
              <span v-if="weather.windDirDeg !== null && weather.windKmh > 0" class="wrn-card-dir">
                <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true" :style="{ transform: `rotate(${weather.windDirDeg + 180}deg)` }">
                  <path d="M10 2l5 14-5-3-5 3z" fill="currentColor" />
                </svg>
                {{ compassPoint(weather.windDirDeg) }}
              </span>
            </p>
            <p class="wrn-card-sub t-num">
              {{ weather.gustKmh !== null ? `gusts ${Math.round(kmhToKn(weather.gustKmh))} kn` : 'no gusts reported' }}
              <template v-if="weather.windDirDeg !== null && weather.windKmh > 0"> · from {{ String(Math.round(weather.windDirDeg)).padStart(3, '0') }}°</template>
            </p>
          </template>
          <p v-else class="wrn-card-number t-num is-unknown">—<span class="wrn-card-unit">kn</span></p>
          <p class="wrn-card-stamp t-num">{{ weatherStamp }}</p>
          <p v-if="weatherNote" class="wrn-note is-warn">{{ weatherNote }}</p>
        </article>

        <article class="wrn-card">
          <p class="wrn-card-label">Air</p>
          <template v-if="weather && weather.tempC !== null">
            <p class="wrn-card-number t-num">{{ Math.round(cToF(weather.tempC)) }}<span class="wrn-card-unit">°F</span></p>
            <p class="wrn-card-sub">{{ weather.text ? weather.text.toLowerCase() : 'sky not reported' }} · {{ weather.tempC.toFixed(0) }} °C</p>
          </template>
          <p v-else class="wrn-card-number t-num is-unknown">—<span class="wrn-card-unit">°F</span></p>
          <p class="wrn-card-stamp t-num">{{ weatherStamp }}</p>
        </article>

        <article class="wrn-card wrn-card--sun">
          <p class="wrn-card-label">{{ sun.nextIsSunset ? 'Sunset' : 'Sunrise' }}</p>
          <p class="wrn-card-number t-num wrn-card-number--time">{{ sun.nextAt === null ? '—' : fmtTime(sun.nextAt, marina.tz) }}</p>
          <p class="wrn-card-sub t-num">{{ sun.nextAt === null ? 'the sun does not set here today' : untilLabel(sun.nextAt - now) }}</p>
          <p class="wrn-card-stamp t-num">
            <template v-if="sun.otherAt !== null">{{ sun.nextIsSunset ? 'sunrise' : 'sunset' }} {{ fmtTime(sun.otherAt, marina.tz) }} · </template>computed here from the marina's position
          </p>
        </article>
      </div>

      <footer class="wrn-sources">
        <p>
          Tide: NOAA CO-OPS station {{ marina.tide.id }}, {{ marina.tide.name }}, {{ stationNmi }} nmi from the marina, MLLW.
          Wind and air: NWS station {{ weather?.stationId ?? marina.nwsHint }}.
          Sun: computed from {{ marina.lat.toFixed(3) }}, {{ marina.lon.toFixed(3) }}.
          Public feeds, not InteliMARIS sensors; each station is asked at most once every 5 min.
        </p>
      </footer>

      <p class="sr-only" aria-live="polite" aria-atomic="true">{{ announce }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MARINAS, type Marina } from '@/data/playbook/water-right-now-marinas'
import {
  ageLabel,
  cToF,
  compassPoint,
  fmtDay,
  fmtHour,
  fmtTime,
  haversineKm,
  kmToNmi,
  kmhToKn,
  levelAt,
  loadTide,
  loadWeather,
  nearestMarina,
  nextSunEvents,
  tideNow,
  untilLabel,
  type TideFetch,
  type WeatherData,
} from '@/data/playbook/water-right-now-conditions'

const uid = `wrn-${Math.random().toString(36).slice(2, 8)}`
const FRESH_TIDE_MS = 60 * 60000
const FRESH_WX_MS = 90 * 60000
const REFRESH_MS = 5 * 60000

/* ------------------------------------------------------------ selection */

const selectedId = ref(MARINAS[0]!.id)
const marina = computed<Marina>(() => MARINAS.find((m) => m.id === selectedId.value) ?? MARINAS[0]!)
const query = ref('')
const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return MARINAS
  return MARINAS.filter((m) => `${m.name} ${m.place}`.toLowerCase().includes(q))
})
const chipRow = ref<HTMLElement | null>(null)
const announce = ref('')

function select(id: string) {
  if (id === selectedId.value) return
  selectedId.value = id
  announce.value = `Showing ${marina.value.name}, ${marina.value.place}.`
}

function onChipKeydown(e: KeyboardEvent) {
  const delta = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
  if (!delta || !filtered.value.length) return
  e.preventDefault()
  const list = filtered.value
  const i = list.findIndex((m) => m.id === selectedId.value)
  const next = list[(Math.max(i, 0) + delta + list.length) % list.length]!
  select(next.id)
  chipRow.value?.querySelectorAll<HTMLElement>('.wrn-chip')[list.indexOf(next)]?.focus()
}

/* ----------------------------------------------------------- the clock */

const now = ref(Date.now())
let tick: ReturnType<typeof setInterval> | undefined
let refresh: ReturnType<typeof setInterval> | undefined

/* --------------------------------------------------------------- feeds */

const tide = ref<TideFetch | null>(null)
const tideState = ref<'loading' | 'ready' | 'failed'>('loading')
const weather = ref<WeatherData | null>(null)
const weatherState = ref<'loading' | 'ready' | 'failed'>('loading')
let loadToken = 0

async function load(m: Marina, quiet = false) {
  const token = ++loadToken
  if (!quiet) {
    tideState.value = 'loading'
    weatherState.value = 'loading'
    tide.value = null
    weather.value = null
  }
  void loadTide(m).then((r) => {
    if (token !== loadToken) return
    tide.value = r
    tideState.value = r.data ? 'ready' : 'failed'
  })
  void loadWeather(m).then((w) => {
    if (token !== loadToken) return
    weather.value = w
    weatherState.value = w ? 'ready' : 'failed'
  })
}

watch(marina, (m) => void load(m), { immediate: true })

/* ---------------------------------------------------------------- tide */

const tideInfo = computed(() => tideNow(tide.value?.data?.curve ?? [], tide.value?.data?.extremes ?? [], now.value))

const observedFresh = computed(() => {
  const o = tide.value?.data?.observed
  return !!o && now.value - o.t <= FRESH_TIDE_MS
})

const stationNmi = computed(() => kmToNmi(haversineKm(marina.value.lat, marina.value.lon, marina.value.tide.lat, marina.value.tide.lon)).toFixed(1))

interface Hero {
  kind: 'observed' | 'predicted' | 'unknown'
  value: number | null
  stamp: string
  note: string
  noteTone: 'warn' | 'alert'
}

const hero = computed<Hero>(() => {
  const d = tide.value?.data
  const station = marina.value.tide.name
  if (tideState.value === 'loading') {
    return { kind: 'unknown', value: null, stamp: `asking NOAA station ${marina.value.tide.id}…`, note: '', noteTone: 'warn' }
  }
  if (!d) {
    return {
      kind: 'unknown',
      value: null,
      stamp: 'no reading',
      note: `We do not know the tide here right now. NOAA station ${station} did not answer. Try again in a minute, or read the gauge on the dock.`,
      noteTone: 'alert',
    }
  }
  if (d.observed && observedFresh.value) {
    return {
      kind: 'observed',
      value: d.observed.v,
      stamp: `observed ${ageLabel(now.value - d.observed.t)} · ${station}, ${stationNmi.value} nmi away`,
      note: '',
      noteTone: 'warn',
    }
  }
  const predicted = tideInfo.value.predicted
  const lastSeen = d.observed ? `The nearest reading is ${station}, from ${fmtTime(d.observed.t, marina.value.tz)} ${fmtDay(d.observed.t, marina.value.tz, now.value)}.` : `NOAA station ${station} has no observation on file.`
  if (predicted !== null) {
    return {
      kind: 'predicted',
      value: predicted,
      stamp: `predicted for ${fmtTime(now.value, marina.value.tz)} · ${station}`,
      note: `Nothing observed here in the last hour. ${lastSeen} The number shown is the prediction; treat it as a guide, not a gauge.`,
      noteTone: 'warn',
    }
  }
  return {
    kind: 'unknown',
    value: null,
    stamp: 'no reading',
    note: `Nothing observed here in the last hour, and no prediction came back. ${lastSeen} Try again in a minute.`,
    noteTone: 'alert',
  }
})

const trendLine = computed(() => {
  const t = tideInfo.value
  if (t.trend === 'unknown') return ''
  const rate = t.rate === null ? '' : ` · ${Math.abs(t.rate).toFixed(1)} ft/h`
  const next = t.next ? ` · ${t.next.type === 'H' ? 'high' : 'low'} ${fmtTime(t.next.t, marina.value.tz)} ${untilLabel(t.next.t - now.value)}` : ''
  const word = t.trend === 'slack' ? 'Slack water' : t.trend === 'rising' ? 'Rising' : 'Falling'
  return `${word}${t.trend === 'slack' ? '' : rate}${next}`
})

const upcoming = computed(() => (tide.value?.data?.extremes ?? []).filter((x) => x.t > now.value).slice(0, 4))

/* ---------------------------------------------------------------- chart */

const W = 1000
const H = 280
const PAD_T = 44
const PAD_B = 62

/* Narrow screens get 12-hour ticks and value-only extreme labels. */
const narrowQuery = typeof matchMedia === 'function' ? matchMedia('(max-width: 720px)') : null
const narrow = ref(narrowQuery?.matches ?? false)
const onNarrow = (e: MediaQueryListEvent) => (narrow.value = e.matches)

const chart = computed(() => {
  const curve = tide.value?.data?.curve ?? []
  if (curve.length < 2) return null
  const t0 = now.value - 4 * 3600000
  const t1 = now.value + 24 * 3600000
  const pts = curve.filter((p) => p.t >= t0 && p.t <= t1)
  if (pts.length < 2) return null
  let lo = Infinity
  let hi = -Infinity
  for (const p of pts) {
    lo = Math.min(lo, p.v)
    hi = Math.max(hi, p.v)
  }
  const obs = tide.value?.data?.observed
  if (obs && observedFresh.value) {
    lo = Math.min(lo, obs.v)
    hi = Math.max(hi, obs.v)
  }
  const span = Math.max(hi - lo, 0.5)
  const x = (t: number) => ((t - t0) / (t1 - t0)) * W
  const y = (v: number) => PAD_T + (1 - (v - lo) / span) * (H - PAD_T - PAD_B)
  const line = pts.map((p, i) => `${i ? 'L' : 'M'}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`).join(' ')
  const area = `${line} L${x(pts[pts.length - 1]!.t).toFixed(1)} ${H} L${x(pts[0]!.t).toFixed(1)} ${H} Z`
  const nowV = obs && observedFresh.value ? obs.v : (levelAt(curve, now.value) ?? pts[0]!.v)
  const extremes = (tide.value?.data?.extremes ?? [])
    .filter((e) => e.t >= t0 + 1800000 && e.t <= t1 - 1800000)
    .map((e) => ({ ...e, x: x(e.t), y: y(e.v) }))
  const ticks: { t: number; x: number }[] = []
  const hourStart = Math.ceil(t0 / 3600000) * 3600000
  const hourOf = new Intl.DateTimeFormat('en-US', { hour: 'numeric', hour12: false, timeZone: marina.value.tz })
  const step = narrow.value ? 12 : 6
  for (let t = hourStart; t <= t1; t += 3600000) {
    const h = Number(hourOf.format(new Date(t)).replace(/\D/g, '')) % 24
    const px = x(t)
    if (h % step === 0 && px > 25 && px < W - 25) ticks.push({ t, x: px })
  }
  return { line, area, nowX: x(now.value), nowY: y(nowV), extremes, ticks }
})

const curveLabel = computed(() => {
  const ex = (tide.value?.data?.extremes ?? []).filter((e) => e.t > now.value).slice(0, 3)
  if (!ex.length) return 'Predicted tide for the next 24 hours; no data yet.'
  return `Predicted tide for the next 24 hours at ${marina.value.tide.name}: ${ex.map((e) => `${e.type === 'H' ? 'high' : 'low'} ${e.v.toFixed(1)} ft at ${fmtTime(e.t, marina.value.tz)}`).join(', ')}.`
})

/* ------------------------------------------------------------- weather */

const weatherFresh = computed(() => !!weather.value && now.value - weather.value.observedAt <= FRESH_WX_MS)

const weatherStamp = computed(() => {
  if (weatherState.value === 'loading') return 'asking the NWS…'
  const w = weather.value
  if (!w) return 'no reading'
  return `observed ${ageLabel(now.value - w.observedAt)} · ${w.stationId}`
})

const weatherNote = computed(() => {
  if (weatherState.value === 'loading') return ''
  const w = weather.value
  if (!w) return `No wind reading here right now. The NWS station for this water did not answer. Listen to the marine forecast on VHF WX before you leave.`
  if (!weatherFresh.value) return `Nothing observed at ${w.stationId} in the last hour. The last reading is from ${fmtTime(w.observedAt, marina.value.tz)} ${fmtDay(w.observedAt, marina.value.tz, now.value)}. Treat it as history, not conditions.`
  if (w.windKmh === null) return `${w.stationId} reported no wind speed in its last observation. Look at the flags on the dock before you cast off.`
  return ''
})

/* ------------------------------------------------------------------ sun */

const sun = computed(() => {
  const n = nextSunEvents(now.value, marina.value.lat, marina.value.lon)
  const nextIsSunset = n.sunset !== null && (n.sunrise === null || n.sunset < n.sunrise)
  return { nextIsSunset, nextAt: nextIsSunset ? n.sunset : n.sunrise, otherAt: nextIsSunset ? n.sunrise : n.sunset }
})

/* ----------------------------------------------------- today on the water */

const pills = computed(() => {
  const out: { label: string; value: string }[] = []
  const t = tideInfo.value
  if (t.trend === 'unknown') out.push({ label: 'Tide', value: tideState.value === 'loading' ? 'asking…' : 'unknown' })
  else if (t.trend === 'slack') out.push({ label: 'Tide', value: 'slack water' })
  else out.push({ label: 'Tide', value: `${t.trend} · ${Math.abs(t.rate ?? 0).toFixed(1)} ft/h` })
  if (t.next) out.push({ label: `Next ${t.next.type === 'H' ? 'high' : 'low'}`, value: `${fmtTime(t.next.t, marina.value.tz)} · ${t.next.v.toFixed(1)} ft` })
  const w = weather.value
  if (w && w.windKmh !== null && weatherFresh.value) {
    const kn = Math.round(kmhToKn(w.windKmh))
    out.push({ label: 'Wind', value: kn === 0 ? 'calm' : `${kn} kn ${w.windDirDeg !== null ? compassPoint(w.windDirDeg) : ''}`.trim() })
  } else out.push({ label: 'Wind', value: weatherState.value === 'loading' ? 'asking…' : 'unknown' })
  if (sun.value.nextAt !== null) out.push({ label: sun.value.nextIsSunset ? 'Sunset' : 'Sunrise', value: untilLabel(sun.value.nextAt - now.value) })
  return out
})

/* ---------------------------------------------------------- hero motion */

const reduced = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches
const shown = ref(0)
let raf = 0

watch(
  () => hero.value.value,
  (target, prevTarget) => {
    cancelAnimationFrame(raf)
    if (target === null) return
    if (reduced || typeof requestAnimationFrame !== 'function') {
      shown.value = target
      return
    }
    const from = prevTarget ?? 0
    const start = performance.now()
    const dur = 720
    const step = (t: number) => {
      const k = Math.min(1, (t - start) / dur)
      const e = 1 - Math.pow(1 - k, 3)
      shown.value = from + (target - from) * e
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
  },
  { immediate: true },
)

/* ------------------------------------------------------------- location */

const locating = ref(false)
const locateMsg = ref('')

function locate() {
  if (typeof navigator === 'undefined' || !navigator.geolocation) {
    locateMsg.value = 'Your browser does not share location. Pick a marina from the list.'
    return
  }
  locating.value = true
  locateMsg.value = ''
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      locating.value = false
      const near = nearestMarina(MARINAS, pos.coords.latitude, pos.coords.longitude)
      select(near.marina.id)
      const nmi = kmToNmi(near.km)
      locateMsg.value = `Nearest of the six to you: ${near.marina.name}, ${nmi < 100 ? nmi.toFixed(1) : Math.round(nmi)} nmi away.`
    },
    (err) => {
      locating.value = false
      locateMsg.value =
        err.code === err.PERMISSION_DENIED
          ? 'Location not shared. Pick a marina from the list instead.'
          : 'Could not read your location. Pick a marina from the list instead.'
    },
    { timeout: 8000, maximumAge: 5 * 60000 },
  )
}

/* ------------------------------------------------------------ lifecycle */

onMounted(() => {
  tick = setInterval(() => (now.value = Date.now()), 1000)
  refresh = setInterval(() => void load(marina.value, true), REFRESH_MS)
  narrowQuery?.addEventListener('change', onNarrow)
})

onBeforeUnmount(() => {
  clearInterval(tick)
  clearInterval(refresh)
  cancelAnimationFrame(raf)
  narrowQuery?.removeEventListener('change', onNarrow)
})
</script>

<style scoped>
.wrn {
  --wrn-ink: #ffffff;
  --wrn-ink-2: rgba(255, 255, 255, 0.74);
  --wrn-ink-3: #93a0b4;
  --wrn-glass: rgba(255, 255, 255, 0.06);
  --wrn-glass-strong: rgba(255, 255, 255, 0.1);
  --wrn-edge: rgba(255, 255, 255, 0.1);
  color: var(--wrn-ink);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}

.wrn-stage {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  padding: clamp(1.25rem, 1rem + 2vw, 2.75rem);
  border-radius: var(--radius-xl);
  background:
    radial-gradient(ellipse 60% 45% at 18% 0%, rgba(61, 142, 224, 0.28), transparent 70%),
    radial-gradient(ellipse 50% 40% at 100% 100%, rgba(17, 45, 76, 0.9), transparent 70%),
    var(--navy);
  overflow: clip;
}

/* --- top ------------------------------------------------------------- */

.wrn-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-6);
  flex-wrap: wrap;
}

.wrn-overline {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--wrn-ink-3);
}

.wrn-marina {
  margin: var(--space-2) 0 0;
  font-family: var(--font-display);
  font-size: var(--type-h2);
  font-weight: 700;
  line-height: var(--type-h2-lh);
  letter-spacing: var(--type-h2-ls);
  color: var(--wrn-ink);
}

.wrn-place {
  display: block;
  margin-top: 0.125rem;
  font-family: var(--font-text);
  font-size: var(--type-body);
  font-weight: 400;
  color: var(--wrn-ink-2);
}

.wrn-locate-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--space-2);
  max-width: 34ch;
}

.wrn-locate {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid var(--wrn-edge);
  border-radius: 999px;
  background: var(--wrn-glass);
  color: var(--wrn-ink);
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 500;
  cursor: pointer;
  transition: background 200ms var(--ease-out), transform 240ms var(--ease-out);
}

.wrn-locate:hover {
  background: var(--wrn-glass-strong);
}

.wrn-locate:active {
  transform: scale(0.97);
}

.wrn-locate:disabled {
  opacity: 0.6;
  cursor: default;
}

.wrn-locate:focus-visible,
.wrn-chip:focus-visible,
.wrn-search input:focus-visible {
  outline: 2px solid var(--maris-night);
  outline-offset: 2px;
}

.wrn-locate-msg {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--wrn-ink-2);
  text-align: right;
}

/* --- picker ---------------------------------------------------------- */

.wrn-picker {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  min-width: 0;
}

.wrn-search {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  flex: 0 0 auto;
  padding: 0 0.875rem;
  height: 2.5rem;
  border: 1px solid var(--wrn-edge);
  border-radius: 999px;
  background: var(--wrn-glass);
  color: var(--wrn-ink-3);
}

.wrn-search input {
  width: 9.5rem;
  border: 0;
  background: transparent;
  color: var(--wrn-ink);
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
}

.wrn-search input::placeholder {
  color: var(--wrn-ink-3);
}

.wrn-search input::-webkit-search-cancel-button {
  filter: invert(1);
}

.wrn-chips {
  display: flex;
  gap: 0.375rem;
  min-width: 0;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px;
  -webkit-overflow-scrolling: touch;
}

.wrn-chips::-webkit-scrollbar {
  display: none;
}

.wrn-chip {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 0 0 auto;
  padding: 0.45rem 0.95rem;
  border: 1px solid var(--wrn-edge);
  border-radius: 999px;
  background: var(--wrn-glass);
  color: var(--wrn-ink-2);
  font-family: var(--font-text);
  text-align: left;
  cursor: pointer;
  transition: background 220ms var(--ease-out), color 220ms var(--ease-out), transform 260ms var(--ease-out);
}

.wrn-chip:hover {
  background: var(--wrn-glass-strong);
  color: var(--wrn-ink);
}

.wrn-chip:active {
  transform: scale(0.97);
}

.wrn-chip[aria-checked='true'] {
  background: #ffffff;
  border-color: #ffffff;
  color: var(--navy);
}

.wrn-chip-name {
  font-size: var(--type-body-sm);
  font-weight: 500;
  line-height: 1.2;
  white-space: nowrap;
}

.wrn-chip-place {
  font-size: 0.6875rem;
  line-height: 1.2;
  opacity: 0.8;
  white-space: nowrap;
}

.wrn-chip-empty {
  margin: 0;
  align-self: center;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--wrn-ink-2);
}

/* --- hero ------------------------------------------------------------ */

.wrn-hero {
  display: grid;
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  gap: var(--space-8);
  align-items: end;
}

.wrn-hero-label {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 500;
  color: var(--wrn-ink-2);
}

.wrn-hero-number {
  display: flex;
  align-items: baseline;
  gap: 0.35em;
  margin: 0;
  font-size: clamp(4.5rem, 3rem + 7vw, 8.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: var(--wrn-ink);
}

.wrn-hero-number.is-unknown {
  color: var(--wrn-ink-3);
}

.wrn-hero-unit {
  font-size: 0.32em;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--wrn-ink-2);
}

.wrn-hero-unit small {
  font-size: 0.6em;
  font-weight: 500;
  color: var(--wrn-ink-3);
  margin-left: 0.25em;
}

.wrn-hero-stamp {
  margin: var(--space-3) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--wrn-ink-2);
}

.wrn-trend {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: var(--space-3) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-body);
  color: var(--wrn-ink);
}

.wrn-trend-arrow {
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 9px solid var(--maris-night);
}

.wrn-trend-arrow[data-trend='falling'] {
  border-bottom: 0;
  border-top: 9px solid var(--maris-light);
}

.wrn-trend-arrow[data-trend='slack'] {
  width: 12px;
  height: 2px;
  border: 0;
  background: var(--wrn-ink-2);
}

.wrn-note {
  margin: var(--space-3) 0 0;
  padding: 0.625rem 0.875rem;
  border-radius: var(--radius-md);
  font-family: var(--font-text);
  font-size: var(--type-caption);
  line-height: 1.45;
  color: var(--wrn-ink);
  background: rgba(224, 161, 0, 0.14);
  border: 1px solid rgba(224, 161, 0, 0.35);
  max-width: 52ch;
}

.wrn-note.is-alert {
  background: rgba(208, 52, 44, 0.16);
  border-color: rgba(208, 52, 44, 0.4);
}

.wrn-extremes {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3);
  margin: 0;
}

.wrn-extreme {
  padding: 0.75rem 0.875rem;
  border-radius: var(--radius-lg);
  background: var(--wrn-glass);
  border: 1px solid var(--wrn-edge);
}

.wrn-extreme--empty {
  grid-column: 1 / -1;
}

.wrn-extreme dt {
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--wrn-ink-2);
}

.wrn-extreme-day {
  color: var(--wrn-ink-3);
}

.wrn-extreme dd {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--wrn-ink);
}

.wrn-extreme--empty dd {
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  font-weight: 400;
  color: var(--wrn-ink-2);
}

.wrn-extreme-v {
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--wrn-ink-2);
  margin-left: 0.25rem;
}

/* --- curve ----------------------------------------------------------- */

.wrn-curve {
  margin: 0;
}

.wrn-curve-frame {
  position: relative;
  height: clamp(180px, 22vw, 280px);
  border-radius: var(--radius-lg);
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--wrn-edge);
  overflow: hidden;
}

.wrn-curve-svg {
  display: block;
  width: 100%;
  height: 100%;
}

.wrn-curve-empty {
  display: grid;
  place-items: center;
  height: 100%;
  padding: var(--space-6);
  text-align: center;
}

.wrn-curve-empty p {
  margin: 0;
  max-width: 48ch;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--wrn-ink-2);
}

.wrn-now-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ffffff;
  border: 2px solid var(--navy);
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.18);
  transform: translate(-50%, -50%);
}

.wrn-now-dot.is-observed {
  background: var(--maris-night);
  border-color: #ffffff;
}

.wrn-now-label {
  position: absolute;
  top: 8px;
  transform: translateX(-50%);
  font-family: var(--font-text);
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--wrn-ink);
}

.wrn-curve-extreme {
  position: absolute;
  transform: translate(-50%, -140%);
  font-family: var(--font-text);
  font-size: 0.75rem;
  white-space: nowrap;
  color: var(--wrn-ink-2);
}

.wrn-curve-extreme b {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--wrn-ink);
}

.wrn-curve-extreme-time {
  margin-left: 0.3em;
}

.wrn-curve-extreme.is-low {
  transform: translate(-50%, 45%);
}

.wrn-curve-tick {
  position: absolute;
  bottom: 8px;
  transform: translateX(-50%);
  font-family: var(--font-text);
  font-size: 0.6875rem;
  white-space: nowrap;
  color: var(--wrn-ink-3);
}

.wrn-curve-caption {
  margin: var(--space-2) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--wrn-ink-3);
}

/* --- strip ----------------------------------------------------------- */

.wrn-strip-title {
  margin: 0 0 var(--space-3);
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--wrn-ink-3);
}

.wrn-pills {
  display: flex;
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
  overflow-x: auto;
  scrollbar-width: none;
}

.wrn-pills::-webkit-scrollbar {
  display: none;
}

.wrn-pill {
  display: inline-flex;
  flex-direction: column;
  flex: 0 0 auto;
  gap: 0.125rem;
  padding: 0.625rem 1rem;
  border-radius: 999px;
  background: var(--wrn-glass);
  border: 1px solid var(--wrn-edge);
}

.wrn-pill-label {
  font-family: var(--font-text);
  font-size: 0.6875rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--wrn-ink-3);
}

.wrn-pill-value {
  font-family: var(--font-display);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--wrn-ink);
  white-space: nowrap;
}

/* --- cards ----------------------------------------------------------- */

.wrn-cards {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4);
}

.wrn-card {
  padding: var(--space-6);
  border-radius: var(--radius-xl);
  background: var(--wrn-glass);
  border: 1px solid var(--wrn-edge);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
}

.wrn-card-label {
  margin: 0;
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--wrn-ink-3);
}

.wrn-card-number {
  display: flex;
  align-items: baseline;
  gap: 0.2em;
  margin: var(--space-3) 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 1.8rem + 1.6vw, 3.25rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.02em;
  color: var(--wrn-ink);
}

.wrn-card-number.is-unknown {
  color: var(--wrn-ink-3);
}

.wrn-card-number--time {
  font-size: clamp(1.9rem, 1.5rem + 1.3vw, 2.6rem);
}

.wrn-card-unit {
  font-size: 0.42em;
  font-weight: 500;
  color: var(--wrn-ink-2);
}

.wrn-card-dir {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 0.4em;
  font-size: 0.42em;
  font-weight: 500;
  color: var(--wrn-ink-2);
}

.wrn-card-dir svg {
  color: var(--maris-night);
}

.wrn-card-sub {
  margin: var(--space-2) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
  color: var(--wrn-ink-2);
}

.wrn-card-stamp {
  margin: var(--space-3) 0 0;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  color: var(--wrn-ink-3);
}

.wrn-card .wrn-note {
  max-width: none;
}

/* --- sources --------------------------------------------------------- */

.wrn-sources p {
  margin: 0;
  max-width: 90ch;
  font-family: var(--font-text);
  font-size: var(--type-caption);
  line-height: 1.5;
  color: var(--wrn-ink-3);
}

/* --- arrival --------------------------------------------------------- */

.wrn-hero,
.wrn-curve,
.wrn-strip,
.wrn-cards {
  opacity: 0.35;
  transform: translateY(6px);
  transition: opacity 520ms var(--ease-out), transform 620ms var(--ease-out);
}

.wrn-stage.is-ready .wrn-hero,
.wrn-stage.is-ready .wrn-curve,
.wrn-stage.is-ready .wrn-strip,
.wrn-stage.is-ready .wrn-cards {
  opacity: 1;
  transform: none;
}

.wrn-stage.is-ready .wrn-curve {
  transition-delay: 80ms;
}

.wrn-stage.is-ready .wrn-strip {
  transition-delay: 140ms;
}

.wrn-stage.is-ready .wrn-cards {
  transition-delay: 200ms;
}

/* --- phones ---------------------------------------------------------- */

@media (max-width: 860px) {
  .wrn-cards {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .wrn-card--sun {
    grid-column: 1 / -1;
  }
}

@media (max-width: 720px) {
  .wrn-stage {
    gap: var(--space-6);
    padding-bottom: 0;
  }

  .wrn-top {
    flex-direction: column;
    gap: var(--space-4);
  }

  .wrn-locate-wrap {
    align-items: flex-start;
  }

  .wrn-locate-msg {
    text-align: left;
  }

  .wrn-hero {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-4);
  }

  .wrn-hero-number {
    font-size: clamp(4.25rem, 22vw, 6rem);
  }

  .wrn-cards {
    grid-template-columns: minmax(0, 1fr);
  }

  .wrn-card {
    padding: var(--space-4) var(--space-6);
  }

  /* One UI: the control the thumb needs sits at the bottom, as a sheet. */
  .wrn-picker {
    order: 99;
    position: sticky;
    bottom: 0;
    z-index: 5;
    flex-direction: column;
    align-items: stretch;
    gap: var(--space-3);
    margin: 0 calc(-1 * clamp(1.25rem, 1rem + 2vw, 2.75rem));
    padding: var(--space-3) var(--space-4) var(--space-4);
    border-top: 1px solid var(--wrn-edge);
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    background: rgba(11, 18, 32, 0.82);
    -webkit-backdrop-filter: blur(22px);
    backdrop-filter: blur(22px);
    box-shadow: 0 -18px 40px rgba(0, 0, 0, 0.35);
  }

  .wrn-picker::before {
    content: '';
    width: 36px;
    height: 4px;
    margin: 0 auto;
    border-radius: 2px;
    background: rgba(255, 255, 255, 0.28);
  }

  .wrn-search {
    height: 2.75rem;
  }

  .wrn-search input {
    width: 100%;
  }

  .wrn-chip {
    padding: 0.55rem 1rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .wrn *,
  .wrn *::before {
    transition: none !important;
  }

  .wrn-hero,
  .wrn-curve,
  .wrn-strip,
  .wrn-cards {
    opacity: 1;
    transform: none;
  }
}
</style>
