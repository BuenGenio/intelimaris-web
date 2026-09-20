<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Departure window</h1><p class="scr-sub scr-small">When should I leave? One row per departure the engine will plan — with its clear probability at your margin and the waits it attributed.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row dp-actions"><span class="scr-pill scr-pill--bare" data-tone="info">Sample</span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Plan on the map</button></div>

    <div class="scr-alert"><ScrIcon name="map" /><div><strong>Wanderer → Miami Beach Marina</strong><span class="scr-small">Planned on the map · 6.2 NM · draft 4.6 ft · margin 2.0 ft · next 12 hours.</span></div></div>

    <section class="scr-section">
      <p class="scr-ov">Offered departures</p>
      <p class="scr-small scr-muted dp-desc">Refused ones are not listed. This is not weather routing — ocean legs refuse asserted sea limits outright.</p>
      <div class="scr-stack scr-stack--tight">
        <div v-for="d in ROWS" :key="d.at" class="scr-card" :class="{ 'scr-card--accent': d.best }">
          <div class="scr-row scr-row--between">
            <span class="scr-h3 scr-num">Leave {{ d.at }}</span>
            <span class="scr-row"><span v-if="d.best" class="scr-pill" data-tone="safe">Best window</span><span class="scr-pill scr-pill--bare">uncorrected</span></span>
          </div>
          <p class="scr-small scr-num dp-line">{{ d.min }} min · {{ d.clear }}% clear at your 2.0 ft margin · {{ d.wait }} min waiting<span v-if="d.wait > d.min / 2"> — more than half the passage</span></p>
          <div class="scr-progress dp-bar"><i :style="{ width: d.clear + '%' }" :data-low="d.clear < 70 || undefined"></i></div>
          <p v-if="d.waits" class="scr-micro scr-muted">{{ d.waits }}</p>
          <button type="button" class="scr-btn scr-btn--sm dp-btn">Re-plan at {{ d.at }}</button>
        </div>
      </div>
      <p class="scr-micro scr-muted dp-foot">“Uncorrected” means no buoy bias sample tightened the limit (sample_n 0) — the honest expected state today. Where a bias corrected it, the row says so.</p>
    </section>

    <section class="scr-section">
      <p class="scr-ov">No window</p>
      <div class="scr-empty"><strong>When every departure is refused</strong><span class="scr-small">No departure in the next 12 hours clears your stated limits. Nothing is hidden here — the engine refused every one.</span></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const ROWS = [
  { at: '06:10', min: 47, clear: 82, wait: 0, waits: '', best: true },
  { at: '11:45', min: 73, clear: 61, wait: 26, waits: '26 min for bridge at Las Olas', best: false },
  { at: '15:30', min: 52, clear: 74, wait: 8, waits: '8 min for tide at Haulover', best: false },
]
</script>

<style scoped>
.dp-actions { margin: -6px 0 10px; }
.dp-desc { margin-bottom: 8px; }
.dp-line { margin-top: 4px; }
.dp-bar { margin: 8px 0 6px; }
.dp-bar i[data-low] { background: var(--warn); }
.dp-btn { margin-top: 8px; }
.dp-foot { margin-top: 10px; }
</style>
