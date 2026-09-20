<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Man overboard</h1><p class="scr-sub">Mark the spot, keep the bearing on it, and get help coming.</p></div>
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Underway</button>
    </div>

    <div class="scr-card mob-mark">
      <span class="mob-beacon"><ScrIcon name="alert" /></span>
      <div>
        <h2 class="scr-h2 mob-red">Man overboard</h2>
        <p class="scr-small scr-num scr-muted">2:17 PM · 1 min 42 s ago</p>
        <p class="scr-micro scr-muted">this device · marked from the live fix, ±6 m</p>
      </div>
    </div>

    <div class="scr-card mob-card">
      <p class="scr-card-title">Back to the mark</p>
      <p class="scr-micro scr-muted">From your live fix. Stale is said, never hidden.</p>
      <div class="scr-grid-2 mob-stats">
        <div><span class="scr-stat-label">Range</span><span class="scr-stat-value mob-big">0.08<small>NM</small></span></div>
        <div><span class="scr-stat-label">Bearing</span><span class="scr-stat-value mob-big">312<small>°T</small></span></div>
      </div>
      <div class="mob-dial" aria-hidden="true"><svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" /><path d="M50 12 L 56 48 L 50 44 L 44 48 Z" transform="rotate(312 50 50)" /><text x="50" y="9">N</text></svg><span class="scr-micro scr-muted">Bearing is true · your heading 174° · the mark is astern to starboard</span></div>
      <p class="scr-micro scr-muted mob-mono">this device · GPS fix 3 s ago</p>
    </div>

    <div class="scr-card mob-card">
      <p class="scr-card-title">Read this over the radio</p>
      <p class="scr-micro scr-muted">The mark's position, in both forms · VHF channel 16 · 156.800 MHz</p>
      <p class="mob-pos mob-mono scr-num">26° 06.91′ N  080° 06.35′ W</p>
      <p class="mob-mono scr-num">26.1152, -80.1058</p>
    </div>

    <button type="button" class="scr-btn scr-btn--danger scr-btn--block mob-broadcast" disabled title="Every vessel in range seeing your bearing and distance is DEV-426, a real-time service that does not exist yet. Pressing this tells nobody. Call on VHF 16 or DSC."><ScrIcon name="radio" />Alert nearby vessels — not built yet</button>

    <div class="scr-card mob-card">
      <p class="scr-card-title">Stand down</p>
      <p class="scr-micro scr-muted">Deliberate and confirmed: two clicks, never the back button.</p>
      <div v-if="confirming" class="scr-row scr-row--wrap mob-confirm">
        <button type="button" class="scr-btn scr-btn--danger scr-btn--sm">Yes, stand down — clear the mark</button>
        <button type="button" class="scr-btn scr-btn--sm" @click="confirming = false">Keep the mark</button>
      </div>
      <button v-else type="button" class="scr-btn scr-btn--sm mob-confirm" @click="confirming = true">Stand down</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const confirming = ref(false)
</script>

<style scoped>
.mob-mark { display: flex; align-items: center; gap: 14px; padding: 16px; border-radius: 16px; }
.mob-beacon { display: grid; place-items: center; flex-shrink: 0; width: 56px; height: 56px; border-radius: 50%; background: var(--danger); color: #fff; box-shadow: 0 0 0 6px rgba(200, 50, 43, 0.2), 0 0 0 12px rgba(200, 50, 43, 0.1), 0 0 0 18px rgba(200, 50, 43, 0.05); }
.mob-red { color: var(--danger); }
.mob-card { margin-top: 10px; }
.mob-stats { gap: 8px; margin-top: 10px; }
.mob-big { font-size: 30px; }
.mob-dial { display: flex; align-items: center; gap: 12px; margin-top: 8px; }
.mob-dial svg { width: 72px; height: 72px; flex-shrink: 0; }
.mob-dial circle { fill: var(--ink-50); stroke: var(--ink-300); stroke-width: 1.5; }
.mob-dial path { fill: var(--danger); }
.mob-dial text { font-size: 9px; font-weight: 700; text-anchor: middle; fill: var(--ink-500); }
.mob-mono { font-family: var(--font-mono, ui-monospace, monospace); margin-top: 6px; }
.mob-pos { font-size: 17px; font-weight: 700; margin-top: 8px; white-space: pre; }
.mob-broadcast { margin-top: 10px; opacity: 0.55; }
.mob-confirm { margin-top: 10px; }
</style>
