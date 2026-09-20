<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">GPX</h1><p class="scr-sub scr-small">Get your existing routes and waypoints in, and get your passages back out to your chartplotter.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row gx-actions"><span class="scr-pill scr-pill--bare">GPX 1.1 · WGS84</span></div>

    <section class="scr-section gx-first">
      <p class="scr-ov">Import a file</p>
      <p class="scr-small scr-muted gx-desc">Routes, tracks and waypoints. Import works entirely offline.</p>
      <button type="button" class="scr-btn scr-btn--block"><ScrIcon name="download" />Choose a .gpx file</button>
      <div class="scr-alert gx-note" data-tone="warn"><ScrIcon name="alert" /><div><strong>Partial import</strong><span class="scr-small">keys-2025.gpx (184 KB) · 192 of 214 waypoints imported. 22 were skipped: 18 had no coordinates, 4 were duplicates.</span></div></div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Imported</p>
      <p class="scr-small scr-muted gx-desc">One row per route or track, with its source file and date.</p>
      <div class="scr-list">
        <div v-for="r in IMPORTED" :key="r[0]" class="scr-item">
          <span class="scr-item-icon" :data-tone="r[4]"><ScrIcon :name="r[3]" /></span>
          <span><span class="scr-item-title">{{ r[0] }}</span><span class="scr-item-sub">{{ r[1] }}</span></span>
          <span class="scr-item-end scr-num">{{ r[2] }}</span>
        </div>
      </div>
      <p class="scr-micro scr-muted gx-foot">Not for navigation — an imported route has not been checked against depth, clearance or zones.</p>
    </section>

    <section class="scr-section">
      <div class="scr-row scr-row--between"><p class="scr-ov">Export</p><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Plan a passage</button></div>
      <p class="scr-small scr-muted gx-desc">The passages you have planned, each as .gpx. Exported routes carry your waypoints exactly as you drew them — WaterWayz does not add or move a point.</p>
      <div class="scr-list">
        <div v-for="p in PASSAGES" :key="p[0]" class="scr-item scr-item--plain">
          <span><span class="scr-item-title">{{ p[0] }}</span><span class="scr-item-sub scr-num">{{ p[1] }}</span></span>
          <button type="button" class="scr-btn scr-btn--sm">Export .gpx</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const IMPORTED: [string, string, string, string, string][] = [
  ['Keys run · route', 'keys-2025.gpx · 14 waypoints · imported 9 Oct 2026', '61 NM', 'map', 'accent'],
  ['Biscayne Bay · track', 'keys-2025.gpx · 2,140 points · imported 9 Oct 2026', '18 NM', 'activity', ''],
  ['Anchorages · waypoints', 'anchorages.gpx · 192 of 214 · imported 9 Oct 2026', '192', 'pin', ''],
]
const PASSAGES = [['Bahia Mar → Miami Beach Marina', '6.2 NM · 5 waypoints · planned 12 Oct 2026'], ['Bahia Mar → Isle of Venice dock', '1.4 NM · 3 waypoints · planned 4 Oct 2026']]
</script>

<style scoped>
.gx-actions { margin: -6px 0 4px; }
.gx-first { margin-top: 8px; }
.gx-desc { margin-bottom: 8px; }
.gx-note { margin-top: 10px; }
.gx-foot { margin-top: 8px; }
</style>
