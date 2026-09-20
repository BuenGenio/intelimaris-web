<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Anchor watch</h1><p class="scr-sub">Tell me if the vessel moves while I am asleep.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row aw-actions"><span class="aw-beacon" :data-tone="dragging ? 'danger' : 'safe'"><ScrIcon name="anchor" /></span><span class="scr-spacer"></span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Alarm centre</button></div>

    <div v-if="dragging" class="scr-alert" data-tone="danger"><ScrIcon name="alert" /><div><strong>Dragging · Wanderer</strong><span class="scr-small">You are 52 ft from the drop point, 3 ft outside your swing radius. Check your set.</span><span class="scr-micro">Device fix · 3 s ago</span></div></div>
    <div v-else class="scr-alert" data-tone="safe"><ScrIcon name="check" /><div><strong>Holding</strong><span class="scr-small">31 ft from the drop point.</span></div></div>

    <ScrMap variant="chart" :height="180" class="aw-map" :pins="[{ x: 200, y: 120, tone: 'info' }]" :self="{ x: 214, y: 132, heading: 210 }">
      <svg class="aw-ring" viewBox="0 0 400 240" aria-hidden="true"><circle cx="200" cy="120" r="46" /><path d="M200 120 L 206 128 L 210 126 L 214 132" /></svg>
      <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip scr-micro">Swing circle 49 ft · track since 22:14</span>
    </ScrMap>

    <div class="scr-card aw-card">
      <div class="scr-row scr-row--between">
        <div><p class="scr-card-title">Anchor watch — set</p><p class="scr-micro scr-muted scr-num">Radius 49 ft · dropped 22:14 · Isle of Venice anchorage</p></div>
        <button type="button" class="scr-btn scr-btn--sm">Stop the watch</button>
      </div>
      <div class="scr-grid-2 aw-stats">
        <div class="scr-stat"><span class="scr-stat-label">Current offset</span><span class="scr-stat-value">{{ dragging ? 52 : 31 }}<small>ft</small></span><span class="scr-stat-delta">from the drop point</span></div>
        <div class="scr-stat"><span class="scr-stat-label">Swing radius</span><span class="scr-stat-value">49<small>ft</small></span><span class="scr-stat-delta">15 m, in your units</span></div>
        <div class="scr-stat"><span class="scr-stat-label">Drop point</span><span class="scr-stat-value aw-mono">26.1172, -80.1129</span></div>
        <div class="scr-stat"><span class="scr-stat-label">Worst offset</span><span class="scr-stat-value">44<small>ft</small></span><span class="scr-stat-delta">at 03:20</span></div>
      </div>
      <div class="scr-row aw-toggle"><span class="scr-small">Simulate a drag</span><span class="scr-spacer"></span><button type="button" class="scr-switch" :class="{ 'is-on': dragging }" aria-label="Simulate a drag" @click="dragging = !dragging"></button></div>
      <p class="scr-micro scr-muted">The swing circle on the map, the track inside it and a sound are the lane this scaffold waits on.</p>
    </div>

    <p class="scr-micro scr-muted aw-foot"><span class="scr-pill scr-pill--bare">Web</span> A watch in a browser tab stops when the tab is closed or the laptop sleeps. It will say it cannot, rather than quietly stop, once the lane exists.</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const dragging = ref(false)
</script>

<style scoped>
.aw-actions { margin: -6px 0 10px; }
.aw-beacon { display: grid; place-items: center; width: 36px; height: 36px; border-radius: 50%; color: #fff; background: var(--safe); box-shadow: 0 0 0 5px rgba(46, 155, 78, 0.18); }
.aw-beacon[data-tone='danger'] { background: var(--danger); box-shadow: 0 0 0 5px rgba(200, 50, 43, 0.2), 0 0 0 10px rgba(200, 50, 43, 0.08); }
.aw-map { margin-top: 10px; }
.aw-ring { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; stroke: #2c3d68; }
.aw-ring circle { stroke-dasharray: 5 4; stroke-width: 1.5; fill: rgba(66, 116, 187, 0.12); }
.aw-ring path { stroke: #c4157f; stroke-width: 2; }
.aw-card { margin-top: 10px; }
.aw-stats { gap: 8px; margin: 12px 0 10px; }
.aw-stats .scr-stat { padding: 10px 12px; }
.aw-mono { font-size: 13px; font-family: var(--font-mono, ui-monospace, monospace); }
.aw-toggle { padding: 8px 0; border-top: 1px solid var(--ink-100); border-bottom: 1px solid var(--ink-100); margin-bottom: 8px; }
.aw-foot { margin-top: 12px; }
</style>
