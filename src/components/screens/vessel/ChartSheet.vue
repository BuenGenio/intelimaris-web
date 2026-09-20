<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Chart sheet</h1><p class="scr-sub scr-small">The planned passage as a printable sheet — waypoints, bearings, distances, gates — as PDF.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row cs-actions"><span class="scr-pill scr-pill--bare">PDF</span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Open the map</button></div>

    <div class="scr-alert"><ScrIcon name="map" /><div><strong>Passage on screen</strong><span class="scr-small">Bahia Mar → Miami Beach Marina · leaves 12 Oct 2026 14:00 · plan 7f3a-2c · the sheet never draws a line the engine did not.</span></div></div>

    <section class="scr-section">
      <p class="scr-ov">What the sheet carries</p>
      <p class="scr-small scr-muted cs-desc">Its sections, in print order.</p>
      <div class="scr-list">
        <div v-for="s in SECTIONS" :key="s[0]" class="scr-item scr-item--plain">
          <span><span class="scr-item-title">{{ s[0] }}</span><span class="scr-item-sub">{{ s[1] }}</span></span>
          <span class="scr-pill scr-pill--bare" :data-tone="s[2] ? 'safe' : 'offline'">{{ s[2] ? 'Ready' : 'Waiting' }}</span>
        </div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Waypoints</p>
      <div class="scr-card scr-card--flush">
        <table class="scr-table"><thead><tr><th>#</th><th>Name</th><th class="scr-num">Brg</th><th class="scr-num">NM</th><th class="scr-num">ETA</th></tr></thead>
          <tbody><tr v-for="w in WAYPOINTS" :key="w[0]"><td class="scr-num">{{ w[0] }}</td><td>{{ w[1] }}</td><td class="scr-num">{{ w[2] }}</td><td class="scr-num">{{ w[3] }}</td><td class="scr-num">{{ w[4] }}</td></tr></tbody>
        </table>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Export</p>
      <p class="scr-small scr-muted cs-desc">A4 or Letter, portrait. The PNG export on the map stays as it is.</p>
      <div class="scr-tabs cs-paper"><button type="button" class="scr-tab is-on">A4</button><button type="button" class="scr-tab">Letter</button></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block" disabled title="The chart-sheet renderer is not built (DEV-430)."><ScrIcon name="download" />Export chart sheet</button>
      <p class="scr-micro scr-muted cs-foot">Not for navigation. A printed sheet is an aid; the official chart and the operator's judgment decide.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const SECTIONS: [string, string, boolean][] = [
  ['Header', 'Vessel name, passage from → to, planned departure, the engine\'s plan id, the date printed.', true],
  ['Waypoint table', 'Every corridor node: name, position, leg bearing, leg distance in NM, cumulative distance, ETA on the router\'s clock.', true],
  ['Gates', 'Each bridge, tide and weather gate the engine evaluated, with the window and the wait it planned — refused gates absent, never greyed.', true],
  ['Scale and rose', 'A distance scale in NM and a compass rose true-north, from the export\'s own projection.', false],
  ['Provenance', 'Chart and depth sources with their datum, the forecast bias in force, and the non-certification line.', false],
]
const WAYPOINTS = [['1', 'Bahia Mar entrance', '—', '0.0', '14:00'], ['2', 'Las Olas Bridge', '178°', '1.1', '14:09'], ['3', 'Port Everglades turn', '164°', '2.4', '14:19'], ['4', 'Haulover Cut', '181°', '5.0', '14:33'], ['5', 'Miami Beach Marina', '196°', '6.2', '14:41']]
</script>

<style scoped>
.cs-actions { margin: -6px 0 10px; }
.cs-desc { margin-bottom: 8px; }
.cs-paper { max-width: 160px; margin-bottom: 10px; }
.cs-foot { margin-top: 10px; }
</style>
