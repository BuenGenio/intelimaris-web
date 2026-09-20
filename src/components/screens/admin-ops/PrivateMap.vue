<template>
  <div class="scr">
    <div class="scr-row scr-row--wrap pm-top">
      <a href="#" class="scr-row scr-small scr-muted pm-back"><ScrIcon name="back" /> Workspaces</a>
      <div>
        <h1 class="scr-h3">Isle of Venice dock — own berths</h1>
        <p class="scr-small scr-muted scr-num">1 structures · 3 berths · 0 facilities · 0 hazards · occupancy as of 2026-10-14</p>
        <p class="scr-micro scr-muted">Drag to move it · arrows nudge · [ ] rotate · Alt for fine control · ⌘Z undo</p>
      </div>
      <span class="scr-spacer"></span>
      <div class="scr-row scr-row--wrap pm-tools">
        <button v-for="t in tools" :key="t" type="button" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': t === tool }" @click="tool = t">{{ t }}</button>
      </div>
    </div>

    <div class="pm-split">
      <ScrMap variant="satellite" :height="440" class="pm-map">
        <svg class="pm-draw" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <path d="M60 60 L340 60" stroke="#cdb98b" stroke-width="7" stroke-linecap="round" />
          <text x="62" y="52" fill="#fff" font-size="9" font-weight="600">East face · fixed dock</text>
          <g v-for="b in berths" :key="b.label" :transform="`translate(${b.x} 66)`">
            <rect width="54" height="70" rx="3" :fill="b.label === 'E-2' ? '#fdf1e2' : '#e6f5ea'" :fill-opacity="b.label === 'E-2' ? 0.85 : 0.75" :stroke="b.label === 'E-2' ? '#e38b1c' : '#2e9b4e'" :stroke-width="b.label === 'E-2' ? 2.5 : 1.2" />
            <path d="M27 66 L27 20 M21 28 L27 20 L33 28" fill="none" stroke="#2c3d68" stroke-width="1.5" />
            <text x="27" y="12" text-anchor="middle" fill="#2c3d68" font-size="9" font-weight="700">{{ b.label }}</text>
          </g>
        </svg>
        <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip">Satellite · dock frame</span>
      </ScrMap>

      <aside class="scr-stack pm-panel">
        <section class="scr-card pm-selected">
          <div class="scr-row scr-row--between"><h2 class="scr-h3">1 berth selected</h2><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Clear</button></div>
          <div class="pm-nudge">
            <span></span><button type="button" class="scr-btn scr-btn--sm" aria-label="Move north 0.5 metres">↑</button><span></span>
            <button type="button" class="scr-btn scr-btn--sm" aria-label="Move west 0.5 metres">←</button><button type="button" class="scr-btn scr-btn--sm" aria-label="Rotate">↻</button><button type="button" class="scr-btn scr-btn--sm" aria-label="Move east 0.5 metres">→</button>
            <span></span><button type="button" class="scr-btn scr-btn--sm" aria-label="Move south 0.5 metres">↓</button><span></span>
          </div>
          <p class="scr-micro scr-muted">1 berth moved — not saved · <span class="scr-num">E-2 · 0.85 m</span></p>
          <div class="scr-row"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Save this move</button><button type="button" class="scr-btn scr-btn--sm">Discard all</button></div>
        </section>

        <section class="scr-card">
          <div class="scr-row scr-row--between"><h2 class="scr-h3">Drawn shapes</h2><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Select all berths</button></div>
          <ul class="pm-shapes">
            <li class="scr-row"><strong>East face</strong><span class="scr-small scr-muted">fixed dock</span></li>
            <li v-for="b in berths" :key="b.label" class="scr-row" :class="{ 'is-on': b.label === 'E-2' }"><strong class="scr-num">{{ b.label }}</strong><span class="scr-small scr-muted">{{ b.kind }} · {{ b.dims }}</span></li>
          </ul>
        </section>

        <section class="scr-card scr-stack scr-stack--tight">
          <div class="scr-field"><span class="scr-label">Label</span><span class="scr-input pm-input scr-num">E-2</span></div>
          <div class="scr-field"><span class="scr-label">Kind of berth</span><span class="scr-select pm-input">Alongside <span aria-hidden="true">⌄</span></span></div>
          <div class="scr-field"><span class="scr-label">Tie to</span><span class="scr-select pm-input">East face <span aria-hidden="true">⌄</span></span></div>
          <div class="scr-grid-2">
            <div class="scr-field"><span class="scr-label">Depth alongside (m)</span><span class="scr-input pm-input scr-num">2.1</span></div>
            <div class="scr-field"><span class="scr-label">Depth datum</span><span class="scr-select pm-input">MLLW <span aria-hidden="true">⌄</span></span></div>
          </div>
          <p class="scr-hint">Empty = not stated, never 0.</p>
          <div class="scr-field"><span class="scr-label">Status</span><span class="scr-select pm-input">In service <span aria-hidden="true">⌄</span></span></div>
          <div class="scr-field"><span class="scr-label">Notes</span><span class="scr-textarea pm-notes">Shore power 30 A on the post; water at the head of the dock.</span></div>
          <div class="scr-row"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Save changes</button><button type="button" class="scr-btn scr-btn--sm pm-delete">Delete</button></div>
        </section>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'

const tools = ['Draw dock line', 'Draw mooring field', 'Draw berth', 'Drop mooring ball']
const tool = ref('')
const berths = [
  { label: 'E-1', x: 90, kind: 'alongside', dims: '14.0 × 5.0 m · 2.4 m MLLW' },
  { label: 'E-2', x: 172, kind: 'alongside', dims: '14.0 × 5.0 m · 2.1 m MLLW' },
  { label: 'E-3', x: 254, kind: 'alongside', dims: '12.0 × 4.5 m · 1.9 m MLLW' },
]
</script>

<style scoped>
.pm-top { gap: 10px 14px; margin-bottom: 12px; align-items: flex-start; }
.pm-back { gap: 4px; padding-top: 3px; }
.pm-tools { gap: 6px; justify-content: flex-end; }
.pm-split { display: grid; grid-template-columns: minmax(0, 1.4fr) 300px; gap: 14px; align-items: start; }
.pm-draw { position: absolute; inset: 0; width: 100%; height: 100%; }
.pm-panel { max-height: 440px; overflow: auto; }
.pm-selected { background: var(--ink-50); }
.pm-nudge { display: grid; grid-template-columns: repeat(3, 34px); gap: 4px; margin: 10px 0 8px; }
.pm-nudge .scr-btn { padding: 0; min-height: 30px; }
.pm-selected .scr-row:last-child { margin-top: 8px; }
.pm-shapes { display: grid; gap: 4px; margin-top: 8px; }
.pm-shapes li { gap: 8px; padding: 4px 6px; border-radius: 6px; }
.pm-shapes li.is-on { background: var(--ink-100); }
.pm-input { min-height: 32px; padding: 5px 9px; font-size: 12px; display: inline-flex; align-items: center; justify-content: space-between; }
.pm-notes { min-height: 48px; font-size: 12px; }
.pm-delete { color: var(--danger); }
</style>
