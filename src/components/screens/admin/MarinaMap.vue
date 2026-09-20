<template>
  <div class="scr">
    <div class="scr-row scr-row--wrap" style="gap: 14px; margin-bottom: 12px">
      <a class="scr-small scr-muted scr-row" style="gap: 4px"><ScrIcon name="back" /> Bahia Mar</a>
      <div>
        <h1 class="scr-h3">Berth map — Bahia Mar</h1>
        <p class="scr-micro scr-muted scr-num">5 structures · 250 berths · 6 facilities · 2 hazards · occupancy as of 12 Oct 2026, 09:40</p>
        <p class="scr-micro scr-muted">Drag to move all 2 · arrows nudge · [ ] rotate · Alt for fine control · ⌘Z undo</p>
      </div>
      <div class="scr-chips" style="margin-left: auto">
        <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="list" /> Occupancy board</button>
        <button v-for="t in tools" :key="t" type="button" class="scr-chip" :class="{ 'is-on': t === 'Draw berth' }">{{ t }}</button>
      </div>
    </div>

    <div class="scr-split" style="grid-template-columns: minmax(0, 2fr) minmax(0, 1fr)">
      <ScrMap variant="basin" :height="440" :pins="[{ x: 350, y: 110, tone: 'warn' }, { x: 60, y: 200, tone: 'danger' }]">
        <div class="scr-map-overlay scr-map-overlay--tl"><span class="scr-map-chip"><span class="scr-dot" data-tone="safe"></span>Free · <span class="scr-dot" data-tone="info"></span>Taken</span></div>
        <div class="scr-map-overlay scr-map-overlay--br"><span class="scr-map-chip">Survey · 3 cm/px · flown 2 Oct</span></div>
      </ScrMap>

      <div class="scr-stack">
        <div class="scr-card" style="background: var(--ink-50)">
          <div class="scr-row scr-row--between"><h2 class="scr-h3">2 berths selected</h2><a class="scr-small scr-muted">Clear</a></div>
          <div class="scr-grid-3" style="gap: 4px; margin-top: 8px; max-width: 120px">
            <span></span><button type="button" class="scr-btn scr-btn--sm" aria-label="Move north 0.5 metres">↑</button><span></span>
            <button type="button" class="scr-btn scr-btn--sm" aria-label="Move west 0.5 metres">←</button><button type="button" class="scr-btn scr-btn--sm" aria-label="Move south 0.5 metres">↓</button><button type="button" class="scr-btn scr-btn--sm" aria-label="Move east 0.5 metres">→</button>
          </div>
          <div class="scr-row" style="margin-top: 8px; gap: 6px"><button type="button" class="scr-btn scr-btn--sm">↺ 5°</button><button type="button" class="scr-btn scr-btn--sm">↻ 5°</button><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Delete</button></div>
        </div>

        <div class="scr-card" style="background: var(--ink-50)">
          <h2 class="scr-h3">2 berths moved — not saved</h2>
          <div class="scr-kv" style="padding: 5px 0"><span class="scr-strong scr-num" style="font-family: monospace">C-14</span><span class="scr-micro scr-muted scr-num">1.42 m</span></div>
          <div class="scr-kv" style="padding: 5px 0"><span class="scr-strong scr-num" style="font-family: monospace">C-16</span><span class="scr-micro scr-muted scr-num">turned in place</span></div>
          <div class="scr-row" style="margin-top: 8px; gap: 6px"><button type="button" class="scr-btn scr-btn--sm scr-btn--primary">Save 2 berths</button><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Discard</button></div>
          <p class="scr-micro scr-muted" style="margin-top: 6px">Each berth keeps its id — bookings and closures follow it.</p>
        </div>

        <div>
          <div class="scr-row scr-row--between" style="margin-bottom: 6px"><h2 class="scr-h3">Drawn shapes</h2><a class="scr-small scr-muted scr-strong">Select all berths</a></div>
          <div class="scr-list">
            <div v-for="s in shapes" :key="s.name" class="scr-item scr-item--plain" :class="{ 'is-selected': s.on }" :style="s.on ? 'background: var(--wave-50)' : ''" style="padding: 7px 12px">
              <span><span class="scr-strong scr-small" :style="s.mono ? 'font-family: monospace' : ''">{{ s.name }}</span> <span class="scr-micro scr-muted">{{ s.sub }}</span></span>
              <span v-if="s.pill" class="scr-pill" :data-tone="s.tone">{{ s.pill }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const tools = ['Draw dock line', 'Draw mooring field', 'Draw berth', 'Place facility', 'Drop mooring ball', 'Mark hazard', 'Hazard area']
const shapes: { name: string; sub: string; mono?: boolean; on?: boolean; pill?: string; tone?: string }[] = [
  { name: 'A dock', sub: 'Fixed pier' },
  { name: 'C dock', sub: 'Floating pontoon · floating' },
  { name: 'C-14', sub: 'Slip · guest · 14.6 m LOA', mono: true, on: true, pill: 'Assigned', tone: 'info' },
  { name: 'C-16', sub: 'Slip · guest · 15.2 m LOA', mono: true, on: true, pill: 'Free', tone: 'safe' },
  { name: 'T-1', sub: 'T-head · courtesy · 2 h', mono: true, pill: 'Courtesy', tone: 'low' },
  { name: 'Fuel dock', sub: 'Facility · fuel' },
  { name: 'Shoal off B-dock', sub: 'Hazard area · warn', pill: 'Hazard', tone: 'warn' },
]
</script>
