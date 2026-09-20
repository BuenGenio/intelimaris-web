<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Wanderer</h1>
        <p class="scr-sub">Everything about the vessel, her crew and her passages.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Vessel</span><span class="scr-pill scr-pill--bare">Owner</span></div>
    </div>
    <p class="scr-small scr-muted" style="margin-bottom: 10px">Account: <a href="#">Sam Miller</a> · 42 ft Sabre · home port Fort Lauderdale</p>
    <div class="scr-chips scr-chips--scroll" style="margin-bottom: 14px">
      <span v-for="l in links" :key="l" class="scr-chip">{{ l }}</span>
    </div>

    <div class="scr-kpis">
      <div v-for="t in tiles" :key="t.label" class="scr-stat">
        <span class="scr-stat-label">{{ t.label }}</span>
        <span class="scr-stat-value">{{ t.value }}<small v-if="t.unit">{{ t.unit }}</small></span>
        <span class="scr-stat-delta" :data-tone="t.tone">{{ t.context }}</span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">IDS</h2><p class="scr-sub scr-small">At rest · Bahia Mar, berth C-14</p></div>
        <span class="scr-pill" data-tone="safe">Centered</span>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-grid-3 ov-mini">
        <div v-for="c in conditions" :key="c.label"><span class="scr-ov">{{ c.label }}</span><span class="scr-tele-value">{{ c.value }}<small>{{ c.unit }}</small></span></div>
      </div>
      <p class="scr-alert scr-small" style="margin-top: 12px"><span></span><span>Conditions look good for docking. Proceed forward at idle speed and follow the guidance.</span></p>
      <button class="scr-btn scr-btn--block" style="margin-top: 12px"><ScrIcon name="compass" /> Start IDS</button>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Next passage</h2><p class="scr-sub scr-small">Bahia Mar → Haulover Inlet</p></div>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">Open map</button>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-grid-3 ov-mini">
        <div v-for="c in passage" :key="c.label"><span class="scr-ov">{{ c.label }}</span><span class="scr-tele-value">{{ c.value }}<small>{{ c.unit }}</small></span></div>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 10px">Safe depth is measured against your draft with your own margin. Unknown soundings are shown as unknown, never filled in.</p>
    </div>

    <div class="scr-section">
      <div class="scr-row scr-row--between" style="margin-bottom: 8px">
        <div><h2 class="scr-h3">Needs attention</h2><p class="scr-sub scr-small">Two open items on this vessel</p></div>
        <span class="scr-pill scr-pill--bare">Sample</span>
      </div>
      <div class="scr-list">
        <div class="scr-item scr-item--plain">
          <div><span class="scr-pill" data-tone="warn">Reported</span><span class="scr-item-title" style="margin-top: 4px">Debris reported 0.2 NM off your route</span></div>
          <button class="scr-btn scr-btn--ghost scr-btn--sm">Review</button>
        </div>
        <div class="scr-item scr-item--plain">
          <div><span class="scr-pill">Expiring</span><span class="scr-item-title" style="margin-top: 4px">Crew invite for Tom Wheeler expires in 3 days</span></div>
          <button class="scr-btn scr-btn--ghost scr-btn--sm">Open crew</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const links = ['Vessel profile', 'Track', 'Logbook', 'Find a berth', 'Report a fuel price', 'Dock and dine', 'Departure window', 'Float plan', 'GPX', 'Underway', 'Alarms', 'Emergency', 'Installer']
const tiles = [
  { label: 'Status', value: 'At rest', unit: '', context: 'Bahia Mar · C-14', tone: 'safe' },
  { label: 'Speed', value: '0.0', unit: ' kn', context: 'Heading 074°', tone: '' },
  { label: 'Depth', value: '8.0', unit: ' ft', context: 'Under keel 3.4 ft · 4 min ago', tone: 'safe' },
  { label: 'Next bridge', value: '17.4', unit: ' ft', context: 'Air draft 21 ft · opens on request', tone: 'warn' },
]
const conditions = [
  { label: 'Dock size', value: '52', unit: 'ft' },
  { label: 'Wind SE', value: '9', unit: 'kn' },
  { label: 'Current', value: '0.4', unit: 'kn' },
]
const passage = [
  { label: 'ETA', value: '2:41', unit: 'PM' },
  { label: 'Distance', value: '6.2', unit: 'NM' },
  { label: 'Safe depth', value: '11.2', unit: 'ft' },
]
</script>

<style scoped>
.ov-mini > div { display: grid; gap: 2px; }
</style>
