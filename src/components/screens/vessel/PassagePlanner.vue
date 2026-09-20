<template>
  <div class="scr">
    <ScrMap variant="chart" :height="150" :track="TRACK" :pins="PINS" :self="{ x: 96, y: 176, heading: 40 }">
      <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip"><ScrIcon name="back" />Back to search</span>
      <span class="scr-map-overlay scr-map-overlay--tr scr-map-chip"><span class="scr-dot" data-tone="safe"></span>Above</span>
    </ScrMap>

    <div class="scr-card pp-panel">
      <div class="scr-stack scr-stack--tight">
        <div class="pp-end"><span class="pp-badge">A</span><span class="scr-strong pp-name">Bahia Mar Marina</span><ScrIcon name="x" /></div>
        <div class="pp-end"><span class="pp-badge">B</span><span class="scr-strong pp-name">Miami Beach Marina</span><ScrIcon name="x" /></div>
        <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm pp-swap">Swap ends</button>
      </div>

      <p class="pp-for"><strong>Planning for Wanderer</strong> <span class="scr-muted">· her envelope, not a form</span></p>
      <div class="scr-grid-2 pp-form">
        <label v-for="f in FIELDS" :key="f[0]" class="scr-field"><span class="scr-ov">{{ f[0] }}</span><span class="scr-input scr-num">{{ f[1] }} <small class="scr-muted">{{ f[2] }}</small></span></label>
        <label class="scr-field"><span class="scr-ov">Hull</span><span class="scr-select">Sailing keel</span></label>
        <label class="scr-field"><span class="scr-ov">Departure</span><span class="scr-input scr-num">12 Oct 2026 14:00</span></label>
      </div>
      <p class="scr-micro scr-muted">Draft, air draft and cruise are the vessel's own — overtype any of them.</p>

      <button type="button" class="scr-btn scr-btn--primary scr-btn--block pp-plan">Re-plan</button>

      <!-- the engine's answer -->
      <div class="pp-ribbon" aria-hidden="true"><i style="flex: 3; background: #2e9b4e"></i><i style="flex: 1; background: #e38b1c"></i><i style="flex: 4; background: #2e9b4e"></i><i class="pp-hatch" style="flex: 1"></i><i style="flex: 2; background: #2e9b4e"></i></div>
      <div class="scr-row scr-row--between scr-micro scr-muted"><span>Bahia Mar</span><span>Miami Beach</span></div>
      <div class="scr-row pp-figures"><span class="scr-h2 scr-num">38 min</span><span class="scr-muted scr-num">6.2 NM</span><span class="scr-spacer"></span><span class="scr-pill" data-tone="safe">82% clear</span></div>
      <p class="scr-small scr-muted">No sea limits stated — no wave or wind gate ran.</p>

      <p class="scr-ov pp-h">26 min waiting</p>
      <p class="scr-small">26 min for bridge at Las Olas</p>

      <p class="scr-ov pp-h">Pinch points</p>
      <ul class="scr-small pp-list">
        <li>Las Olas Bridge — 82% on air draft (21 ft against 24 ft closed)</li>
        <li>Haulover Cut — 91% on depth</li>
      </ul>

      <p class="scr-ov pp-h">Other departures <span class="scr-micro pp-note">(refused ones are not listed)</span></p>
      <ul class="pp-alts scr-num">
        <li v-for="a in ALTS" :key="a[0]"><strong>{{ a[0] }}</strong><span>{{ a[1] }} min</span><span v-if="a[2]" class="scr-muted">({{ a[2] }} waiting)</span><span class="scr-spacer"></span><span>{{ a[3] }}%</span></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const FIELDS = [['Draft', '4.6', 'ft'], ['Margin', '2.0', 'ft'], ['Air draft', '21', 'ft'], ['Cruise', '8', 'kn'], ['Max wave', '—', 'ft'], ['Max wind', '—', 'kn']]
const ALTS = [['Leave 06:10', 47, 0, 82], ['Leave 11:45', 73, 26, 61], ['Leave 15:30', 52, 8, 74]]
const TRACK = 'M96 176 C 140 140, 220 130, 300 40'
const PINS = [{ x: 96, y: 176, tone: 'info' as const }, { x: 300, y: 40, tone: 'safe' as const }, { x: 212, y: 128, tone: 'warn' as const }]
</script>

<style scoped>
.pp-panel { margin-top: 10px; }
.pp-end { display: flex; align-items: center; gap: 8px; padding: 7px 9px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); color: var(--ink-400); }
.pp-badge { display: grid; place-items: center; width: 20px; height: 20px; border-radius: 50%; background: var(--ink-900); color: #fff; font-size: 10px; font-weight: 700; }
.pp-name { flex: 1; }
.pp-swap { justify-self: start; padding-inline: 4px; color: var(--ink-500); }
.pp-for { margin: 10px 0 8px; padding: 5px 8px; border-radius: 6px; background: var(--wave-50); font-size: 12px; }
.pp-form { gap: 8px; }
.pp-form .scr-input, .pp-form .scr-select { min-height: 34px; padding: 6px 9px; display: flex; align-items: center; gap: 4px; }
.pp-plan { margin: 10px 0; }
.pp-ribbon { display: flex; height: 10px; border-radius: 4px; overflow: hidden; gap: 1px; }
.pp-hatch { background: repeating-linear-gradient(135deg, #b7bfcf 0 3px, #eaedf3 3px 6px); }
.pp-figures { margin-top: 6px; }
.pp-h { margin-top: 10px; margin-bottom: 2px; }
.pp-note { text-transform: none; letter-spacing: 0; font-weight: 500; color: var(--ink-400); }
.pp-list { display: grid; gap: 2px; }
.pp-alts { display: grid; gap: 2px; font-size: 12.5px; }
.pp-alts li { display: flex; gap: 6px; align-items: baseline; padding: 3px 4px; border-radius: 6px; }
.pp-alts li:first-child { background: var(--wave-50); }
</style>
