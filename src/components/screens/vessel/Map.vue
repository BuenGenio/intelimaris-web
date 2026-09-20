<template>
  <div class="scr scr--map">
    <ScrMap variant="chart" height="100%" :track="TRACK" :pins="PINS" :self="{ x: 150, y: 168, heading: 24 }">
      <!-- top band: what is live, which ground, which camera -->
      <div class="scr-map-overlay scr-map-overlay--tl mp-top">
        <span class="scr-map-chip mp-status"><span class="scr-dot" data-tone="safe"></span>live: marinas · docks · zones · vessels · GPS 4 s — sample: cards</span>
        <div class="scr-tabs mp-tabs">
          <button v-for="m in GROUNDS" :key="m" type="button" class="scr-tab" :class="{ 'is-on': m === ground }" @click="ground = m">{{ m }}</button>
        </div>
        <div class="scr-row">
          <div class="scr-tabs mp-tabs mp-tabs--view">
            <button v-for="v in VIEWS" :key="v" type="button" class="scr-tab" :class="{ 'is-on': v === view }" @click="view = v">{{ v }}</button>
          </div>
          <span class="scr-map-chip"><ScrIcon name="compass" />Ride along</span>
        </div>
      </div>

      <!-- left column: who is near, the search pill, the field view -->
      <div class="scr-map-overlay mp-left">
        <span class="scr-map-chip"><span class="scr-dot" data-tone="safe"></span>SV Meridian <span class="scr-muted">0.6 NM</span></span>
        <span class="scr-map-chip"><ScrIcon name="search" />Search the water <span class="scr-pill scr-pill--bare" data-tone="info">planned</span></span>
        <div class="scr-card mp-field">
          <p class="scr-ov">Field view</p>
          <div class="scr-chips">
            <span v-for="c in FIELD" :key="c" class="scr-chip" :class="{ 'is-on': c === 'Confidence' }">{{ c }}</span>
            <span class="scr-chip">Cells</span>
          </div>
          <p class="scr-micro scr-muted mp-legend">Clear at your 2.0 ft margin · <span class="mp-sw" style="background: #2e9b4e"></span>≥ 90% <span class="mp-sw" style="background: #e38b1c"></span>60–90% <span class="mp-sw" style="background: #c8322b"></span>&lt; 60%</p>
        </div>
      </div>

      <!-- right rail: the FABs, then the two doors that must stay reachable -->
      <div class="scr-map-overlay scr-map-overlay--tr mp-rail">
        <button v-for="f in FABS" :key="f.icon" type="button" class="scr-btn scr-btn--icon scr-btn--pill" :title="f.label"><ScrIcon :name="f.icon" /></button>
        <span class="scr-spacer"></span>
        <button type="button" class="scr-btn scr-btn--danger scr-btn--sm scr-btn--pill"><ScrIcon name="alert" />Emergency</button>
        <button type="button" class="scr-btn scr-btn--primary scr-btn--sm scr-btn--pill"><ScrIcon name="plus" />Hazard</button>
      </div>

      <!-- the card shelf: marina, route, today on the water -->
      <div class="scr-map-overlay scr-map-overlay--b mp-shelf">
        <div class="scr-card mp-card">
          <div class="scr-row scr-row--between"><span class="scr-strong">Bahia Mar Marina</span><span class="scr-pill" data-tone="safe">Open</span></div>
          <p class="scr-small scr-muted">Verified · 0.4 NM · 4.6 (128 reviews)</p>
          <p class="scr-small">Approach depth 8 ft MLLW · VHF 16/71</p>
        </div>
        <div class="scr-card mp-card">
          <p class="scr-strong">Route · Wanderer → Bahia Mar</p>
          <dl class="mp-rows scr-num">
            <div v-for="r in ROUTE" :key="r[0]"><dt>{{ r[0] }}</dt><dd>{{ r[1] }}</dd></div>
          </dl>
          <p class="scr-micro scr-muted">Clear probability at your 2.0 ft margin.</p>
        </div>
        <div class="scr-card mp-card">
          <p class="scr-strong">Today on the water</p>
          <div class="mp-tiles">
            <div v-for="t in TODAY" :key="t[0]"><span class="scr-micro scr-muted">{{ t[0] }}</span><strong class="scr-num">{{ t[1] }}</strong><span class="scr-micro scr-muted">{{ t[2] }}</span></div>
          </div>
        </div>
      </div>
    </ScrMap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const GROUNDS = ['Map', 'Satellite', 'Nautical', 'Seamarks', 'Bundled']
const VIEWS = ['Helm', 'Above', '3D']
const FIELD = ['Confidence', 'Charted depth', 'Under your keel']
const FABS = [
  { icon: 'activity', label: 'Distraction-free view' }, { icon: 'compass', label: 'Re-orient north' }, { icon: 'pin', label: 'Locate my vessel' },
  { icon: 'list', label: 'Layers' }, { icon: 'download', label: 'Export this view' },
]
const ROUTE = [['ETA', '2:41 PM'], ['Time', '38 min'], ['Distance', '6.2 NM'], ['Clear @ 2.0 ft', '82%'], ['Wind', 'SE 9 kn'], ['Tide', '+2.1 ft ↑']]
const TODAY = [['Tide', '2.1 ft', 'Rising · 0.3 ft/hr'], ['Wind', 'SE 9 kn', 'Gusts 14 kn'], ['Debris', '2', 'Nearby'], ['Vessels', '6', '2 friends'], ['No-wake', '3', 'On route']]
const TRACK = 'M150 168 C 170 120, 230 110, 262 60'
const PINS = [{ x: 262, y: 60, tone: 'safe' as const }, { x: 96, y: 92, tone: 'warn' as const }, { x: 214, y: 150, tone: 'info' as const }, { x: 300, y: 128, tone: 'info' as const }]
const ground = ref('Map')
const view = ref('Above')
</script>

<style scoped>
.mp-top { right: 60px; display: grid; gap: 6px; justify-items: start; }
.mp-status { font-weight: 500; white-space: normal; line-height: 1.25; }
.mp-tabs { background: rgba(255, 255, 255, 0.92); box-shadow: 0 2px 8px rgba(24, 32, 54, 0.18); }
.mp-tabs .scr-tab { min-height: 26px; padding: 2px 8px; font-size: 11px; }
.mp-tabs--view { flex: 0 0 auto; }
.mp-left { top: 138px; left: 10px; display: grid; gap: 6px; justify-items: start; }
.mp-field { width: 210px; padding: 8px 10px; background: rgba(255, 255, 255, 0.94); }
.mp-field .scr-chips { margin-top: 4px; gap: 4px; }
.mp-field .scr-chip { min-height: 24px; padding: 2px 8px; font-size: 11px; }
.mp-legend { margin-top: 6px; }
.mp-sw { display: inline-block; width: 9px; height: 9px; border-radius: 2px; vertical-align: -1px; margin: 0 2px 0 4px; }
.mp-rail { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; bottom: 196px; }
.mp-rail .scr-btn--icon { box-shadow: 0 2px 8px rgba(24, 32, 54, 0.18); }
.mp-shelf { display: flex; gap: 8px; overflow-x: auto; scrollbar-width: none; padding-bottom: 2px; }
.mp-card { flex: 0 0 200px; padding: 10px 12px; box-shadow: 0 6px 18px rgba(24, 32, 54, 0.2); }
.mp-rows { display: grid; grid-template-columns: 1fr 1fr; gap: 2px 8px; margin: 6px 0; font-size: 11.5px; }
.mp-rows div { display: flex; justify-content: space-between; gap: 6px; }
.mp-rows dt { color: var(--ink-500); }
.mp-rows dd { font-weight: 600; }
.mp-tiles { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4px 8px; margin-top: 6px; }
.mp-tiles div { display: grid; line-height: 1.2; }
.mp-tiles strong { font-size: 14px; }
</style>
