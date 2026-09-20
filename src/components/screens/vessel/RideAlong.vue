<template>
  <div class="scr scr--map">
    <ScrMap variant="satellite" height="100%" :track="TRACK" :pins="PINS" :self="{ x: 200, y: 170, heading: 0 }">
      <div class="scr-map-overlay scr-map-overlay--tl">
        <span class="scr-map-chip"><span class="scr-dot" data-tone="safe"></span>live: GPS 3 s · vessels · zones</span>
      </div>
      <div class="scr-map-overlay scr-map-overlay--tr ra-view">
        <div class="scr-tabs">
          <button type="button" class="scr-tab is-on">Helm</button><button type="button" class="scr-tab" disabled>Above</button><button type="button" class="scr-tab" disabled>3D</button>
        </div>
        <span class="scr-micro ra-why">The ride is the helm view — exit Ride Along to change</span>
      </div>
      <span class="scr-map-overlay ra-gate scr-map-chip"><ScrIcon name="clock" />Las Olas Bridge opens 2:30 PM · 26 min hold</span>

      <!-- the ride bar replaces the card shelf while it runs -->
      <div class="scr-map-overlay scr-map-overlay--b scr-card ra-bar">
        <div class="scr-row">
          <button type="button" class="ra-play" :aria-label="playing ? 'Pause' : 'Play'" @click="playing = !playing"><span v-if="playing">❚❚</span><span v-else>▶</span></button>
          <div class="ra-scrub">
            <div class="scr-progress"><i style="width: 48%"></i></div>
            <div class="scr-row scr-row--between scr-micro scr-muted scr-num"><span>2:12 PM · Intracoastal Waterway</span><span>3.1 NM to run · 19 min</span></div>
          </div>
        </div>
        <div class="scr-row ra-speeds">
          <button v-for="s in SPEEDS" :key="s" type="button" class="scr-chip" :class="{ 'is-on': s === speed }" :title="s === 1 ? 'The vessel\'s actual speed' : `${s}× route time`" @click="speed = s">{{ s }}×</button>
          <span class="scr-spacer"></span>
          <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Exit</button>
        </div>
        <div class="ra-figures scr-num">
          <div v-for="f in FIGURES" :key="f[0]" :data-tone="f[2]"><span class="scr-micro scr-muted">{{ f[0] }}</span><strong>{{ f[1] }}</strong></div>
        </div>
        <div class="scr-row scr-row--between"><span class="scr-pill" data-tone="warn">Holding station</span><span class="scr-ov">48% of route time</span></div>
      </div>
    </ScrMap>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const SPEEDS = [1, 10, 30, 60]
const FIGURES: [string, string, string][] = [['Under keel', '6.8 ft', 'safe'], ['Confident', '82%', ''], ['Tide MLLW', '2.1 ft', ''], ['Wind', '9 kn', ''], ['Sea', '0.7 ft', ''], ['Heading', '174°', '']]
const TRACK = 'M200 240 L 200 170 C 200 120, 230 90, 250 30'
const PINS = [{ x: 250, y: 30, tone: 'safe' as const }, { x: 214, y: 112, tone: 'warn' as const }]
const playing = ref(true)
const speed = ref(30)
</script>

<style scoped>
.ra-view { display: grid; justify-items: end; gap: 4px; }
.ra-view .scr-tabs { background: rgba(255, 255, 255, 0.92); }
.ra-view .scr-tab { min-height: 26px; padding: 2px 10px; font-size: 11px; }
.ra-view .scr-tab:disabled { opacity: 0.45; }
.ra-why { color: #fff; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5); max-width: 200px; text-align: right; }
.ra-gate { top: 96px; left: 10px; }
.ra-bar { display: grid; gap: 8px; padding: 12px; box-shadow: 0 8px 24px rgba(24, 32, 54, 0.3); }
.ra-play { display: grid; place-items: center; width: 44px; height: 44px; border-radius: 50%; border: 0; background: var(--scr-accent); color: #fff; font-size: 14px; }
.ra-scrub { flex: 1; display: grid; gap: 5px; min-width: 0; }
.ra-speeds .scr-chip { min-height: 28px; padding: 2px 9px; font-weight: 700; font-family: var(--font-mono, monospace); font-size: 11px; }
.ra-figures { display: grid; grid-template-columns: repeat(3, 1fr); gap: 6px 10px; padding-top: 8px; border-top: 1px solid var(--ink-200); }
.ra-figures div { display: grid; line-height: 1.2; }
.ra-figures strong { font-size: 15px; }
.ra-figures [data-tone='safe'] strong { color: var(--safe); }
</style>
