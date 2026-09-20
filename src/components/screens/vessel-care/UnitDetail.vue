<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1 scr-num">PWTS-01</h1>
        <p class="scr-sub">This unit watches bilge level, bilge pump and house bank.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Reporting</span><span class="scr-pill scr-pill--bare">Scaffold</span></div>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Channels</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">This unit's own — the grid never borrows another unit's readings.</p>
      <div class="scr-grid-2">
        <div v-for="c in channels" :key="c.label" class="scr-tele" style="grid-template-columns: minmax(0, 1fr)">
          <span class="scr-stat-label">{{ c.label }}</span>
          <span class="scr-tele-value">{{ c.value }}<small v-if="c.unit">{{ c.unit }}</small></span>
          <span class="scr-tele-age" style="text-align: left">{{ c.age }}</span>
        </div>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">History</h2><p class="scr-sub scr-small">Age on every value, no invented points.</p></div>
        <div class="scr-tabs"><button v-for="r in ranges" :key="r" class="scr-tab" :class="{ 'is-on': r === range }" @click="range = r">{{ r }}</button></div>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-sparkline" style="height: 60px"><i v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }"></i></div>
      <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>Bilge water level, cm</span><span>now</span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Frames</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">Every frame the bridge heard from this box, whatever it did with it. Signal figures are per gateway; null means the network did not say.</p>
      <div v-for="f in frames" :key="f.at" class="scr-kv">
        <span class="scr-num scr-muted">{{ f.at }}</span>
        <span class="scr-row"><span class="scr-pill" :data-tone="f.tone">{{ f.outcome }}</span><span class="scr-num scr-micro scr-muted">{{ f.rssi }}</span></span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Lifecycle</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">provisioned · active · disabled · retired. Only active may ingest; active is a fact about the database, not about radio.</p>
      <dl>
        <div class="scr-kv"><dt>Status</dt><dd>active</dd></div>
        <div class="scr-kv"><dt>Hardware rev</dt><dd>B2</dd></div>
        <div class="scr-kv"><dt>Bound since</dt><dd>2 Oct 2026, 14:20</dd></div>
        <div class="scr-kv"><dt>First reading</dt><dd>2 Oct 2026, 14:31</dd></div>
      </dl>
      <button class="scr-btn scr-btn--sm" style="margin-top: 10px">Release PWTS-01</button>
      <p class="scr-micro scr-muted" style="margin-top: 8px">The box moves with the vessel's next owner; history stays — released is not deleted.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const channels = [
  { label: 'Bilge water level', value: '3', unit: 'cm', age: '4 min ago' },
  { label: 'Bilge pump running', value: 'No', unit: '', age: '4 min ago' },
  { label: 'House bank', value: '12.7', unit: 'V', age: '4 min ago' },
  { label: 'Charge current', value: '−4.2', unit: 'A', age: '4 min ago' },
]
const ranges = ['1 h', '6 h', '24 h', '7 d']
const range = ref('24 h')
const bars = computed(() => range.value === '7 d' ? [30, 32, 35, 60, 40, 30, 28, 30, 31, 30, 29, 30, 33, 30] : [30, 30, 31, 30, 30, 32, 30, 30, 29, 30, 30, 30, 31, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30])
const frames = [
  { at: '14 Oct, 09:37', outcome: 'Reading stored', tone: 'safe', rssi: '−78 dBm' },
  { at: '14 Oct, 09:22', outcome: 'Reading stored', tone: 'safe', rssi: '−81 dBm' },
  { at: '14 Oct, 09:07', outcome: 'Reading stored', tone: 'safe', rssi: '−79 dBm' },
  { at: '14 Oct, 08:52', outcome: 'Duplicate', tone: 'offline', rssi: '−80 dBm' },
  { at: '14 Oct, 08:52', outcome: 'Reading stored', tone: 'safe', rssi: '−76 dBm' },
  { at: '14 Oct, 08:37', outcome: 'Unknown payload', tone: 'warn', rssi: 'signal not reported' },
]
</script>
