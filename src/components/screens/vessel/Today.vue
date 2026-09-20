<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Today on the Water</h1><p class="scr-sub scr-small">The tide, the wind, the sea and the light — what today turns on, with where each number came from.</p></div>
      <span class="scr-pill" data-tone="warn">Scaffold</span>
    </div>
    <div class="scr-row td-actions"><span class="scr-pill scr-pill--bare">Coming</span><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Open the map</button></div>

    <section class="scr-section">
      <p class="scr-ov">Conditions</p>
      <p class="scr-small scr-muted td-desc">Unknown is a dash, never a zero. Each tile names its source and age when it has one.</p>
      <div class="scr-grid-2">
        <div v-for="t in TILES" :key="t.label" class="scr-stat">
          <span class="scr-stat-label">{{ t.label }}</span>
          <span class="scr-stat-value">{{ t.value }}<small v-if="t.unit">{{ t.unit }}</small></span>
          <span class="scr-stat-delta" :data-tone="t.tone">{{ t.trend }}</span>
          <span class="scr-micro scr-muted">{{ t.source }}</span>
        </div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Notices</p>
      <p class="scr-small scr-muted td-desc">Closures, events and hazards on your water today.</p>
      <div class="scr-list">
        <div v-for="n in NOTICES" :key="n[0]" class="scr-item">
          <span class="scr-item-icon" :data-tone="n[3]"><ScrIcon :name="n[2]" /></span>
          <span><span class="scr-item-title">{{ n[0] }}</span><span class="scr-item-sub">{{ n[1] }}</span></span>
          <span class="scr-item-end"><ScrIcon name="chevron" /></span>
        </div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Departure window</p>
      <p class="scr-small scr-muted td-desc">If a passage is planned, the engine's offered departures belong here too.</p>
      <div class="scr-card scr-card--accent">
        <p class="scr-strong">Wanderer → Miami Beach Marina</p>
        <p class="scr-small scr-muted scr-num">Leave 06:10 · 47 min · 82% clear at your 2.0 ft margin</p>
        <button type="button" class="scr-btn scr-btn--block td-btn">Departure window</button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const TILES = [
  { label: 'Tide', value: '2.1', unit: 'ft', trend: 'Rising · 0.3 ft/hr', tone: 'safe', source: 'NOAA Port Everglades · 4 min ago' },
  { label: 'Wind', value: 'SE 9', unit: 'kn', trend: 'Gusts 14 kn', tone: '', source: 'NWS · 12 min ago' },
  { label: 'Sea state', value: '0.7', unit: 'ft', trend: 'Bias −0.2 ft', tone: '', source: 'NDBC 41114 · 22 min ago' },
  { label: 'Daylight', value: '7:04', unit: 'PM', trend: 'Civil twilight 7:28 PM', tone: '', source: 'From position and clock' },
]
const NOTICES: [string, string, string, string][] = [
  ['No-wake zone · Las Olas', 'Manatee season from 15 Nov · 3 zones on your route', 'wave', 'accent'],
  ['Debris reported · New River mouth', 'Submerged log near the green marker · confirmed 2× · 1 h ago', 'alert', 'warn'],
  ['Regatta · Sunday 18 Oct', 'Race area closed 09:00–14:00 off Port Everglades', 'calendar', ''],
]
</script>

<style scoped>
.td-actions { margin: -6px 0 10px; }
.td-desc { margin-bottom: 8px; }
.td-btn { margin-top: 10px; }
</style>
