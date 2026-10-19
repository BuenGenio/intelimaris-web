<template>
  <section class="fleet-console" aria-label="Fleet operations demonstration">
    <header class="fleet-topbar">
      <div><p class="fleet-kicker">InteliMARIS / Fleet operations</p><h2>South Florida operations</h2></div>
      <div class="fleet-live"><span class="fleet-dot"></span> Simulated feed <span>12× playback</span></div>
      <button class="fleet-control" type="button" @click="playing = !playing">{{ playing ? 'Pause demo' : 'Play demo' }}</button>
      <button class="fleet-control" type="button" @click="reset">Reset</button>
    </header>
    <div class="fleet-metrics" aria-label="Whole fleet summary">
      <div><strong>{{ DEMO_FLEET.length.toString().padStart(2, '0') }}</strong><span>Vessels in fleet</span></div>
      <div><strong>{{ allRows.filter(v => v.fix.status !== 'Stale' && v.fix.speedKn >= .5).length.toString().padStart(2, '0') }}</strong><span>Underway</span></div>
      <div><strong>{{ allRows.filter(v => v.fix.status === 'Alongside').length.toString().padStart(2, '0') }}</strong><span>Alongside</span></div>
      <div class="fleet-metric-attention"><strong>02</strong><span>Need attention · 1 stale</span></div>
    </div>
    <div class="fleet-toolbar">
      <label class="fleet-search"><span class="sr-only">Find a fleet vessel</span><input v-model="query" type="search" placeholder="Find vessel, job or destination…" /></label>
      <label><span class="sr-only">Fleet operation</span><select v-model="market" aria-label="Fleet operation"><option value="all">All operations</option><option v-for="item in FLEET_MARKETS" :key="item.id" :value="item.id">{{ item.label }}</option></select></label>
      <label class="fleet-attention"><input v-model="attentionOnly" type="checkbox" /> Needs attention</label>
      <span class="fleet-showing">{{ rows.length }} of {{ DEMO_FLEET.length }} vessels</span>
    </div>
    <div class="fleet-body">
      <div class="fleet-map">
        <svg :viewBox="viewBox" class="fleet-chart" aria-label="Fort Lauderdale fleet map. Select a vessel to inspect its reported track." role="group">
          <image :href="`${base}assets/playbook/basemap-1920.webp`" x="0" y="0" width="1600" height="900" />
          <rect x="0" y="0" width="1600" height="900" class="fleet-map-tint" />
          <g v-for="row in rows" :key="`track-${row.vessel.id}`" :class="['fleet-track', tone(row.fix.status), { selected: selectedId === row.vessel.id }]">
            <polyline :points="points(row.vessel.track)" class="fleet-planned" />
            <polyline :points="points(row.fix.path)" class="fleet-travelled" />
          </g>
          <g v-for="row in rows" :key="row.vessel.id" :transform="`translate(${row.fix.point[0] * 1600} ${row.fix.point[1] * 900})`"
            :class="['fleet-marker', tone(row.fix.status), { selected: selectedId === row.vessel.id }]" role="button" tabindex="0"
            :aria-label="`${row.vessel.name}, ${row.fix.status}, ${row.fix.speedKn.toFixed(1)} knots${row.fix.status === 'Stale' ? ', last reported' : ''}`"
            :aria-pressed="selectedId === row.vessel.id" @click="selectedId = row.vessel.id" @keydown.enter.prevent="selectedId = row.vessel.id" @keydown.space.prevent="selectedId = row.vessel.id">
            <circle r="29" class="fleet-marker-hit" /><circle r="21" class="fleet-marker-ring" />
            <path d="M0 -15 L10 12 L0 7 L-10 12 Z" :transform="`rotate(${row.fix.course})`" />
            <g class="fleet-map-label" :transform="row.fix.point[0] > .77 ? 'translate(-148 -34)' : 'translate(23 -34)'"><rect width="142" height="48" rx="7" /><text x="9" y="19">{{ row.vessel.name }}</text><text x="9" y="37" class="fleet-map-speed">{{ row.fix.status === 'Stale' ? 'Last: ' : '' }}{{ row.fix.speedKn.toFixed(1) }} kn · {{ row.fix.status }}</text></g>
          </g>
        </svg>
        <div class="fleet-map-heading"><span>Fort Lauderdale, FL</span><small>North ↑ · Satellite</small></div>
        <div class="fleet-zoom"><button type="button" aria-label="Zoom in on fleet map" :disabled="zoom >= 2" @click="zoom = Math.min(2, zoom + .25)">+</button><button type="button" aria-label="Zoom out on fleet map" :disabled="zoom <= 1" @click="zoom = Math.max(1, zoom - .25)">−</button></div>
        <div class="fleet-map-key"><span>━━ Reported path</span><span>┄┄ Example onward route</span></div>
        <p class="fleet-map-source">Imagery Esri, Maxar · Illustrative tracks · Not for navigation</p>
      </div>
      <aside class="fleet-roster" aria-label="Vessels in this view">
        <div class="fleet-roster-head"><h3>Fleet register</h3><span>{{ playing ? 'Playing' : 'Paused' }}</span></div>
        <p v-if="!rows.length" class="fleet-empty">No vessels match this view. <button type="button" @click="clearFilters">Clear filters</button></p>
        <button v-for="row in rows" :key="row.vessel.id" type="button" :class="['fleet-row', { selected: selectedId === row.vessel.id }]" :aria-pressed="selectedId === row.vessel.id" @click="selectedId = row.vessel.id">
          <span class="fleet-row-title"><strong>{{ row.vessel.name }}</strong><span :class="['fleet-status', tone(row.fix.status)]">{{ row.fix.status }}</span></span>
          <span class="fleet-row-job">{{ row.vessel.job }}</span>
          <span class="fleet-row-meta"><span>{{ row.fix.status === 'Stale' ? 'Last ' : '' }}{{ row.fix.speedKn.toFixed(1) }} kn</span><span>{{ fleetAge(row.fix.ageS) }}</span></span>
        </button>
      </aside>
    </div>
    <section v-if="selected" class="fleet-detail" aria-label="Selected vessel details" aria-live="polite">
      <div class="fleet-detail-identity"><p class="fleet-kicker">Selected vessel / {{ selected.vessel.market }}</p><h3>{{ selected.vessel.name }}</h3><p>{{ selected.vessel.job }}</p></div>
      <dl><div><dt>{{ selected.fix.status === 'Stale' ? 'Last reported speed' : 'Speed over ground' }}</dt><dd>{{ selected.fix.speedKn.toFixed(1) }} <small>kn</small></dd></div><div><dt>{{ selected.fix.status === 'Stale' ? 'Last reported course' : 'Course over ground' }}</dt><dd>{{ Math.round(selected.fix.course).toString().padStart(3, '0') }}°</dd></div><div><dt>Position report</dt><dd class="fleet-value-age">{{ fleetAge(selected.fix.ageS) }}</dd></div></dl>
      <div class="fleet-detail-note"><strong>{{ selected.vessel.destination }}</strong><p>{{ selected.vessel.note }}</p></div>
    </section>
    <footer class="fleet-source"><strong>Demonstration data</strong><span>Fictional vessels, jobs, speeds and alerts. Recent example reports refresh while playback runs; the stale vessel keeps its last position. Live service depends on authorized vessel data and connectivity.</span></footer>
  </section>
</template>
<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { DEMO_FLEET, FLEET_MARKETS, filterFleet, fleetFix, fleetAge, type FleetPoint, type FleetStatus } from '@/data/playbook/fleet-scene'
const base = import.meta.env.BASE_URL
const query = ref('')
const market = ref('all')
const attentionOnly = ref(false)
const selectedId = ref('meridian')
const playing = ref(false)
const elapsed = ref(0)
const zoom = ref(1)
const allRows = computed(() => DEMO_FLEET.map(vessel => ({ vessel, fix: fleetFix(vessel, elapsed.value) })))
const rows = computed(() => filterFleet(market.value, query.value, attentionOnly.value).map(vessel => ({ vessel, fix: fleetFix(vessel, elapsed.value) })))
const selected = computed(() => rows.value.find(row => row.vessel.id === selectedId.value))
watch(rows, list => { if (!list.some(row => row.vessel.id === selectedId.value)) selectedId.value = list[0]?.vessel.id ?? '' })
const viewBox = computed(() => {
  const w = 1600 / zoom.value, h = 900 / zoom.value
  const p = selected.value?.fix.point ?? [.5, .5]
  return `${Math.min(1600 - w, Math.max(0, p[0]! * 1600 - w / 2))} ${Math.min(900 - h, Math.max(0, p[1]! * 900 - h / 2))} ${w} ${h}`
})
const points = (track: readonly FleetPoint[]) => track.map(p => `${p[0] * 1600},${p[1] * 900}`).join(' ')
const tone = (status: FleetStatus) => status === 'Stale' ? 'is-stale' : status === 'Attention' ? 'is-attention' : status === 'Alongside' ? 'is-alongside' : 'is-underway'
function clearFilters() { query.value = ''; market.value = 'all'; attentionOnly.value = false }
function reset() { elapsed.value = 0; selectedId.value = 'meridian'; zoom.value = 1; clearFilters() }
let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  playing.value = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  timer = setInterval(() => { if (playing.value && !document.hidden) elapsed.value += 1 }, 1000)
})
onUnmounted(() => clearInterval(timer))
</script>
<style scoped>
.fleet-console { --fleet-bg:var(--navy); --fleet-panel:var(--maris-deep); --fleet-ink:var(--ink-0); --fleet-muted:var(--maris-tint); --fleet-edge:color-mix(in srgb, var(--fleet-ink) 18%, transparent); --fleet-safe:color-mix(in srgb, var(--status-ok) 60%, var(--ink-0)); --fleet-warn:color-mix(in srgb, var(--status-warn) 65%, var(--ink-0)); --fleet-stale:var(--orbis-tint); padding:0; background:var(--fleet-bg); color:var(--fleet-ink); border:1px solid var(--fleet-edge); border-radius:18px; overflow:hidden; box-shadow:0 20px 60px color-mix(in srgb, var(--fleet-bg) 18%, transparent); text-align:left; font-family:var(--font-text); }
.fleet-topbar { display:flex; align-items:center; gap:12px; padding:22px 24px; }
.fleet-topbar > div:first-child { margin-right:auto; }
.fleet-kicker { margin:0 0 4px; font-size:.65rem; text-transform:uppercase; letter-spacing:.14em; color:var(--fleet-muted); }
.fleet-console h2,.fleet-console h3,.fleet-console p { margin-top:0; }
.fleet-topbar h2 { margin:0; font-size:1.25rem; color:var(--fleet-ink); font-family:var(--font-display); }
.fleet-live { display:flex; gap:7px; align-items:center; font-size:.72rem; }
.fleet-live > span:last-child { color:var(--fleet-muted); padding-left:6px; }
.fleet-dot { width:7px; height:7px; border-radius:50%; background:var(--fleet-safe); }
.fleet-control,.fleet-toolbar input[type=search],.fleet-toolbar select { color:var(--fleet-ink); background:var(--fleet-panel); border:1px solid var(--fleet-edge); border-radius:7px; padding:9px 12px; font:inherit; font-size:.75rem; }
.fleet-control { cursor:pointer; }
.fleet-metrics { display:grid; grid-template-columns:repeat(4,1fr); padding:0 24px 20px; gap:24px; }
.fleet-metrics > div { border-left:1px solid var(--fleet-edge); padding-left:18px; display:flex; flex-direction:column; gap:2px; }
.fleet-metrics strong { font:500 2.2rem var(--font-display); font-variant-numeric:tabular-nums; }
.fleet-metrics span { color:var(--fleet-muted); font-size:.72rem; }
.fleet-metric-attention strong { color:var(--fleet-warn); }
.fleet-toolbar { display:flex; align-items:center; gap:12px; padding:12px 24px; border-block:1px solid var(--fleet-edge); }
.fleet-search { flex:1; }
.fleet-toolbar input[type=search] { width:100%; min-width:120px; }
.fleet-toolbar input::placeholder { color:var(--fleet-muted); opacity:1; }
.fleet-attention { font-size:.72rem; display:flex; align-items:center; gap:7px; white-space:nowrap; }
.fleet-attention input { accent-color:var(--fleet-safe); }
.fleet-showing { font-size:.68rem; color:var(--fleet-muted); white-space:nowrap; }
.fleet-body { display:grid; grid-template-columns:minmax(0,1fr) 260px; }
.fleet-map { position:relative; min-width:0; min-height:435px; overflow:hidden; background:var(--fleet-panel); }
.fleet-chart { display:block; width:100%; height:100%; min-height:435px; }
.fleet-map-tint { fill:var(--fleet-bg); opacity:.38; }
.fleet-track { color:var(--fleet-safe); opacity:.5; }
.fleet-track.selected { opacity:1; }
.fleet-track polyline { fill:none; stroke:currentColor; stroke-linecap:round; stroke-linejoin:round; vector-effect:non-scaling-stroke; }
.fleet-planned { stroke-width:1.5; stroke-dasharray:5 7; opacity:.6; }
.fleet-travelled { stroke-width:2; }
.fleet-track.selected .fleet-travelled { stroke-width:3.5; }
.is-attention { color:var(--fleet-warn); }
.is-stale { color:var(--fleet-stale); }
.is-underway { color:var(--fleet-safe); }
.is-alongside { color:var(--fleet-muted); }
.fleet-marker { color:var(--fleet-safe); cursor:pointer; outline:none; }
.fleet-marker.is-attention { color:var(--fleet-warn); }
.fleet-marker.is-stale { color:var(--fleet-stale); }
.fleet-marker.is-alongside { color:var(--fleet-muted); }
.fleet-marker > path { fill:currentColor; stroke:var(--fleet-bg); stroke-width:2; }
.fleet-marker-hit { fill:transparent; }
.fleet-marker-ring { fill:var(--fleet-bg); fill-opacity:.6; stroke:currentColor; stroke-width:1; }
.fleet-marker.selected .fleet-marker-ring,.fleet-marker:focus .fleet-marker-ring { stroke-width:4; }
.fleet-map-label rect { fill:var(--fleet-bg); fill-opacity:.96; stroke:var(--fleet-edge); }
.fleet-map-label text { fill:var(--fleet-ink); font:600 14px var(--font-text); }
.fleet-map-label .fleet-map-speed { fill:currentColor; font-size:11px; font-weight:400; }
.fleet-map-heading { position:absolute; top:16px; left:16px; display:flex; flex-direction:column; gap:3px; background:var(--fleet-bg); padding:10px 13px; border:1px solid var(--fleet-edge); border-radius:8px; font-size:.75rem; pointer-events:none; }
.fleet-map-heading small { color:var(--fleet-muted); font-size:.65rem; }
.fleet-zoom { position:absolute; top:16px; right:16px; display:grid; gap:3px; }
.fleet-zoom button { width:32px; height:32px; background:var(--fleet-bg); color:var(--fleet-ink); border:1px solid var(--fleet-edge); border-radius:6px; font-size:1.15rem; cursor:pointer; }
.fleet-zoom button:disabled { opacity:.45; }
.fleet-map-key { position:absolute; left:16px; bottom:36px; display:flex; gap:16px; background:var(--fleet-bg); padding:8px 11px; border-radius:6px; font-size:.65rem; color:var(--fleet-safe); }
.fleet-map-source { position:absolute; bottom:0; left:0; right:0; margin:0; padding:6px 12px; background:var(--fleet-bg); font-size:.58rem; color:var(--fleet-muted); }
.fleet-roster { border-left:1px solid var(--fleet-edge); }
.fleet-roster-head { display:flex; align-items:center; justify-content:space-between; padding:15px; }
.fleet-roster-head h3 { margin:0; font:600 .8rem var(--font-text); color:var(--fleet-ink); }
.fleet-roster-head > span { color:var(--fleet-muted); font-size:.65rem; }
.fleet-row { display:block; width:100%; padding:12px 14px; border:0; border-top:1px solid var(--fleet-edge); border-left:3px solid transparent; background:transparent; color:var(--fleet-ink); text-align:left; cursor:pointer; font:inherit; }
.fleet-row.selected { background:var(--fleet-panel); border-left-color:var(--fleet-safe); }
.fleet-row:hover { background:var(--fleet-panel); }
.fleet-row-title,.fleet-row-meta { display:flex; align-items:center; justify-content:space-between; gap:6px; }
.fleet-row-title strong { font-size:.82rem; }
.fleet-status { font-size:.60rem; border:1px solid currentColor; border-radius:4px; padding:2px 5px; }
.fleet-row-job { display:block; margin:5px 0 7px; font-size:.65rem; color:var(--fleet-muted); }
.fleet-row-meta { font-size:.65rem; font-variant-numeric:tabular-nums; }
.fleet-row-meta > span:last-child { color:var(--fleet-muted); }
.fleet-empty { padding:18px; font-size:.8rem; }
.fleet-empty button { border:0; color:var(--fleet-safe); background:transparent; cursor:pointer; text-decoration:underline; }
.fleet-detail { display:grid; grid-template-columns:1fr 1.4fr 1.3fr; align-items:center; gap:22px; border-top:1px solid var(--fleet-edge); padding:20px 24px; }
.fleet-detail h3 { color:var(--fleet-ink); font-size:1.3rem; margin:0 0 4px; }
.fleet-detail-identity > p:last-child,.fleet-detail-note p { margin:0; color:var(--fleet-muted); font-size:.7rem; line-height:1.5; }
.fleet-detail dl { display:flex; gap:24px; margin:0; }
.fleet-detail dt { font-size:.62rem; color:var(--fleet-muted); margin-bottom:5px; }
.fleet-detail dd { margin:0; font:500 1.4rem var(--font-display); font-variant-numeric:tabular-nums; white-space:nowrap; }
.fleet-detail dd small { font-size:.7rem; color:var(--fleet-muted); }
.fleet-detail dd.fleet-value-age { font-size:.9rem; padding-top:6px; }
.fleet-detail-note strong { display:block; font-size:.75rem; margin-bottom:5px; }
.fleet-source { display:flex; gap:14px; padding:12px 24px; border-top:1px solid var(--fleet-edge); font-size:.65rem; line-height:1.5; color:var(--fleet-muted); }
.fleet-source strong { white-space:nowrap; color:var(--fleet-ink); }
.fleet-console button:focus-visible,.fleet-console input:focus-visible,.fleet-console select:focus-visible { outline:2px solid var(--fleet-safe); outline-offset:3px; }
@media (max-width:1000px) { .fleet-topbar { flex-wrap:wrap; } .fleet-live { order:4; width:100%; } .fleet-body { grid-template-columns:minmax(0,1fr) 225px; } .fleet-detail { grid-template-columns:1fr 1.6fr; } .fleet-detail-note { grid-column:1/-1; } .fleet-showing { display:none; } }
@media (max-width:700px) { .fleet-topbar,.fleet-toolbar { padding:15px; } .fleet-topbar h2 { font-size:1rem; } .fleet-control { padding:7px; font-size:.68rem; } .fleet-metrics { padding:0 15px 16px; gap:8px; } .fleet-metrics > div { padding-left:8px; } .fleet-metrics strong { font-size:1.6rem; } .fleet-metrics span { font-size:.6rem; } .fleet-toolbar { flex-wrap:wrap; gap:9px; } .fleet-search { flex-basis:100%; } .fleet-body { display:block; } .fleet-map,.fleet-chart { min-height:320px; height:320px; } .fleet-roster { border-left:0; display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); } .fleet-roster-head,.fleet-empty { grid-column:1/-1; } .fleet-row { padding:11px; } .fleet-row-title { align-items:start; flex-wrap:wrap; } .fleet-detail { display:block; padding:18px; } .fleet-detail dl { margin:18px 0; justify-content:space-between; gap:10px; } .fleet-source { display:block; padding:14px 18px; } .fleet-source strong { display:block; margin-bottom:5px; } .fleet-map-key { left:10px; font-size:.58rem; gap:10px; } }
</style>
