<template>
  <div class="scr">
    <ScrMap variant="basin" :height="170" :pins="[{ x: 62, y: 214, tone: 'safe' }]">
      <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip"><span class="scr-dot" data-tone="safe"></span>Above · straight down</span>
      <div class="scr-map-overlay scr-map-overlay--tr scr-tabs mv-ground">
        <button type="button" class="scr-tab" :class="{ 'is-on': ground === 'imagery' }" @click="ground = 'imagery'">Imagery</button>
        <button type="button" class="scr-tab" :class="{ 'is-on': ground === 'survey' }" @click="ground = 'survey'">Survey</button>
      </div>
      <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip scr-micro">Entry · courtesy berth C-2 · dashed docks are mapped, not surveyed</span>
    </ScrMap>

    <div class="scr-card mv-panel">
      <div class="scr-head">
        <div class="scr-row">
          <span class="scr-item-icon" data-tone="accent"><ScrIcon name="anchor" /></span>
          <div><h2 class="scr-h2">Bahia Mar Marina</h2><p class="scr-sub scr-small">Marina · Fort Lauderdale</p></div>
        </div>
        <div class="scr-row"><span class="scr-pill" data-tone="safe">Claimed</span><ScrIcon name="x" /></div>
      </div>

      <dl class="mv-facts">
        <div v-for="f in FACTS" :key="f[0]"><dt class="scr-ov">{{ f[0] }}</dt><dd :class="{ 'mv-unknown': !f[1] }">{{ f[1] || f[2] }}<span v-if="f[1] && f[2]" class="scr-micro scr-muted"> · {{ f[2] }}</span></dd></div>
      </dl>

      <p class="scr-ov mv-h">Ground</p>
      <p class="scr-small scr-muted">{{ ground === 'survey' ? 'Our own survey, flown 3 Oct 2026, at 4 cm per pixel.' : 'This marina has been flown (3 Oct 2026) — switch to see the survey under the basin.' }}</p>

      <p class="scr-ov mv-h">Amenities</p>
      <div class="scr-chips"><span v-for="a in AMENITIES" :key="a" class="scr-pill scr-pill--bare">{{ a }}</span></div>

      <p class="scr-ov mv-h">Staying here</p>
      <p class="scr-small"><strong class="scr-num">C-2</strong> · Free · 2 h · no charge</p>
      <p class="scr-small">from <strong>$4.50 per ft per night</strong> <span class="scr-muted">· 3 bands</span></p>
      <button type="button" class="scr-btn scr-btn--block scr-btn--pill mv-book">Book this marina</button>

      <p class="scr-micro scr-muted mv-note">Showing 6 docks and 4 facility points from OpenStreetMap, drawn dashed because they are <strong>mapped, not surveyed</strong>.</p>

      <div class="scr-row mv-ends">
        <button type="button" class="scr-btn scr-btn--primary scr-btn--pill mv-half">Start here</button>
        <button type="button" class="scr-btn scr-btn--pill mv-half mv-dark">End here</button>
      </div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block scr-btn--pill mv-full">Full details <ScrIcon name="chevron" /></button>
      <button type="button" class="scr-btn scr-btn--block scr-btn--pill">Website</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const FACTS: [string, string, string][] = [
  ['Approach depth', '8 ft MLLW', 'sounded 3 d ago'], ['VHF', '16/71', 'listing'], ['Berth capacity', '245', ''], ['Max LOA', '300 ft', ''],
  ['Hours', '07:00–19:00', ''], ['Phone', '+1 954 555 0180', ''], ['Country', 'United States · Florida', ''],
]
const AMENITIES = ['Fuel', 'Pump-out', 'Shore power', 'Water', 'Wi-Fi', 'Showers', 'Restaurant']
const ground = ref<'imagery' | 'survey'>('imagery')
</script>

<style scoped>
.mv-ground { background: rgba(255, 255, 255, 0.92); }
.mv-ground .scr-tab { min-height: 26px; padding: 2px 10px; font-size: 11px; }
.mv-panel { margin-top: 10px; }
.mv-facts div { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; padding: 6px 0; border-bottom: 1px solid var(--ink-100); }
.mv-facts dd { font-size: 12.5px; font-weight: 500; text-align: right; }
.mv-unknown { font-style: italic; color: var(--ink-400); font-weight: 400; }
.mv-h { margin: 12px 0 4px; }
.mv-book { margin-top: 8px; }
.mv-note { margin-top: 10px; line-height: 1.4; }
.mv-ends { margin-top: 12px; }
.mv-half { flex: 1; }
.mv-dark { background: var(--ink-900); border-color: var(--ink-900); color: #fff; }
.mv-full { margin: 8px 0; }
</style>
