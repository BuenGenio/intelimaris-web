<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Cells</h1>
        <p class="scr-sub">The data plane on its own grid: every H3 cell in view at the apps' zoom ladder, shaded by how much the platform holds there. Click a cell to read it; the time control replays the rows' own windows and arrival stamps — edits and deletions are not versioned.</p>
      </div>
    </div>

    <div class="scr-row scr-row--wrap ce-controls">
      <div class="scr-tabs ce-ground">
        <button type="button" class="scr-tab" :class="{ 'is-on': ground === 'map' }" @click="ground = 'map'">Map</button>
        <button type="button" class="scr-tab" :class="{ 'is-on': ground === 'satellite' }" @click="ground = 'satellite'">Satellite</button>
      </div>
      <span class="scr-row"><button type="button" class="scr-switch" :class="{ 'is-on': density }" aria-label="Density shading" @click="density = !density"></button>Density shading</span>
      <span class="scr-row ce-legend"><span v-for="r in legend" :key="r.label" class="scr-row ce-rung"><i :style="{ opacity: r.opacity }"></i><span class="scr-small scr-muted scr-num">{{ r.label }}</span></span></span>
      <span class="scr-row ce-time"><span class="scr-progress ce-slider"><i style="width: 50%"></i></span><span class="scr-input ce-date scr-num">2026-10-14T14:20</span><button type="button" class="scr-btn scr-btn--sm scr-btn--pill">Now</button><span class="scr-small scr-muted scr-num">now</span></span>
    </div>

    <ScrMap :variant="ground === 'satellite' ? 'satellite' : 'chart'" :height="400" class="ce-map">
      <svg class="ce-grid" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <polygon v-for="(h, i) in hexes" :key="i" :points="hex(h.x, h.y)" :fill="density ? '#4274bb' : 'none'" :fill-opacity="density ? h.o : 0" :stroke="h.selected ? '#4274bb' : '#2c3d68'" :stroke-opacity="h.selected ? 0.95 : 0.35" :stroke-width="h.selected ? 2.5 : 0.75" />
      </svg>
      <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip"><ScrIcon name="map" /> r9 · 142 cells</span>
      <aside class="scr-map-overlay scr-map-overlay--tr scr-card ce-inspector">
        <div class="scr-row scr-row--between">
          <div><p class="scr-micro scr-muted scr-num">892a30d2e5bffff</p><p class="scr-strong">1 marinas · 4 places · 2 hazard reports · 1 events · 2 docks</p></div>
          <button type="button" class="scr-btn scr-btn--icon scr-btn--sm" aria-label="Close"><ScrIcon name="x" /></button>
        </div>
        <p class="scr-micro scr-muted ce-gap">Viewing as of 10/14/2026, 2:20 PM (now) — reconstructed from each row's own windows and arrival stamps.</p>
        <section v-for="s in sections" :key="s.title" class="ce-gap">
          <h2 class="scr-ov">{{ s.title }}</h2>
          <ul class="scr-stack scr-stack--tight ce-rows">
            <li v-for="r in s.rows" :key="r.name" :class="{ 'ce-future': r.dim }">
              <p class="scr-row scr-row--wrap ce-line"><span class="scr-strong">{{ r.name }}</span><span v-if="r.meta" class="scr-small scr-muted">{{ r.meta }}</span><span v-for="p in r.pills" :key="p.label" class="scr-pill" :data-tone="p.tone">{{ p.label }}</span></p>
              <p class="scr-micro scr-muted">{{ r.stamp }}</p>
            </li>
          </ul>
        </section>
      </aside>
    </ScrMap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const ground = ref<'map' | 'satellite'>('map')
const density = ref(true)
const legend = [{ label: '1', opacity: 0.12 }, { label: '10', opacity: 0.3 }, { label: '100', opacity: 0.55 }, { label: '1 000+', opacity: 0.85 }]

const R = 22
const hexes: { x: number; y: number; o: number; selected?: boolean }[] = []
for (let row = 0; row < 7; row++) for (let col = 0; col < 11; col++) {
  const x = 30 + col * R * 1.73 + (row % 2 ? R * 0.866 : 0)
  const y = 20 + row * R * 1.5
  const o = [0, 0.12, 0.3, 0.12, 0, 0.55, 0.3, 0.12, 0, 0.85, 0.3][(row * 3 + col) % 11] ?? 0
  hexes.push({ x, y, o, selected: row === 3 && col === 5 })
}
const hex = (cx: number, cy: number) => Array.from({ length: 6 }, (_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return `${(cx + R * Math.cos(a)).toFixed(1)},${(cy + R * Math.sin(a)).toFixed(1)}` }).join(' ')

const sections = [
  { title: 'Marinas · 1', rows: [{ name: 'Bahia Mar Yachting Center', meta: '', pills: [], stamp: 'arrived 9/2/2026, 6:10 AM', dim: false }] },
  { title: 'Places · 4 (showing 2)', rows: [
    { name: 'Coconuts', meta: 'restaurant · dock_and_dine · curated · verified', pills: [], stamp: 'arrived 10/6/2026, 2:41 PM', dim: false },
    { name: 'Bahia Mar fuel dock', meta: 'fuel · marina_fuel · osm', pills: [], stamp: 'arrived 9/2/2026, 6:10 AM', dim: false },
  ] },
  { title: 'Hazard reports · 2', rows: [
    { name: 'shoaling', meta: '', pills: [{ label: 'active', tone: 'danger' }], stamp: 'reported 10/14/2026, 1:42 PM · expires 10/16/2026, 1:42 PM', dim: false },
    { name: 'floating debris', meta: '', pills: [{ label: 'cleared', tone: 'safe' }], stamp: 'reported 10/14/2026, 11:10 AM · cleared 10/14/2026, 11:52 AM', dim: false },
  ] },
  { title: 'Events · 1', rows: [{ name: 'Fort Lauderdale International Boat Show', meta: '', pills: [{ label: 'upcoming', tone: 'info' }, { label: 'navigation', tone: 'danger' }], stamp: 'from 10/28/2026, 8:00 AM · to 11/1/2026, 7:00 PM', dim: false }] },
  { title: 'Dock listings · 2', rows: [
    { name: 'Bahia Mar C dock', meta: '· C-14', pills: [{ label: 'instant', tone: 'safe' }], stamp: 'bahia-mar · USD 168/night · listed 9/20/2026, 10:00 AM', dim: false },
    { name: 'Isle of Venice dock · east face', meta: '· E-1', pills: [], stamp: 'USD 95/night · not yet listed — arrives 10/15/2026, 9:00 AM', dim: true },
  ] },
]
</script>

<style scoped>
.ce-controls { gap: 10px 18px; margin-bottom: 12px; }
.ce-ground { flex: 0 0 auto; }
.ce-legend { gap: 8px; }
.ce-rung { gap: 4px; }
.ce-rung i { display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #4274bb; box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.15); }
.ce-time { flex: 1; min-width: 260px; gap: 8px; }
.ce-slider { flex: 1; }
.ce-date { width: auto; min-height: 30px; padding: 4px 8px; font-size: 11.5px; }
.ce-grid { position: absolute; inset: 0; width: 100%; height: 100%; }
.ce-inspector { width: 300px; max-height: calc(100% - 20px); overflow: auto; padding: 12px; }
.ce-gap { margin-top: 10px; }
.ce-rows { margin-top: 6px; }
.ce-line { gap: 6px; }
.ce-future { opacity: 0.45; }
</style>
