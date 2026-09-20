<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Monitoring</h1>
        <p class="scr-sub">Live sensor readings and model predictions for this vessel.</p>
      </div>
    </div>
    <div class="scr-chips" style="margin-bottom: 14px">
      <span v-for="u in units" :key="u.serial" class="scr-chip scr-num">{{ u.serial }} <span class="scr-pill" :data-tone="u.tone">{{ u.status }}</span></span>
    </div>

    <div v-for="s in systems" :key="s.label" class="scr-section scr-card" style="margin-top: 12px">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">{{ s.label }}</h2><p class="scr-sub scr-small">{{ s.channels.length }} channel{{ s.channels.length === 1 ? '' : 's' }} · {{ s.age }}</p></div>
        <span class="scr-item-icon" :data-tone="s.tone"><ScrIcon :name="s.icon" /></span>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-grid-2">
        <button v-for="c in s.channels" :key="c.label" class="mon-tile" :class="{ 'is-on': c.label === selected }" :data-tone="c.tone" @click="selected = c.label">
          <span class="scr-stat-label">{{ c.label }}</span>
          <span class="scr-tele-value scr-num">{{ c.value }}<small v-if="c.unit">{{ c.unit }}</small></span>
          <span class="scr-micro scr-muted">{{ c.age }}</span>
        </button>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">{{ selected }}</h2><p class="scr-sub scr-small">Last reading 4 min ago</p></div>
        <div class="scr-tabs"><button v-for="r in ranges" :key="r" class="scr-tab" :class="{ 'is-on': r === range }" @click="range = r">{{ r }}</button></div>
      </div>
      <div class="scr-divider"></div>
      <div class="scr-sparkline" style="height: 72px"><i v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }"></i></div>
      <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>{{ range === '7 d' ? '13 Oct' : '00:00' }}</span><span>now</span></div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Predictions</h2>
      <p class="scr-sub scr-small" style="margin-bottom: 6px">What the models claim about this vessel — every claim carries who said it and when.</p>
      <div v-for="p in predictions" :key="p.kind" class="scr-kv">
        <span><strong>{{ p.kind }}</strong> <span class="scr-muted">{{ p.out }}</span></span>
        <span class="scr-row"><span class="scr-pill scr-pill--bare scr-num">{{ p.model }}</span><span class="scr-micro scr-muted">{{ p.when }}</span></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const units = [
  { serial: 'PWTS-01', status: 'active', tone: 'safe' },
  { serial: 'PWTS-02', status: 'active', tone: 'safe' },
]
const systems = [
  { label: 'Fire, smoke & CO', icon: 'alert', tone: 'danger', age: '4 min ago', channels: [
    { label: 'Smoke', value: 'Clear', unit: '', age: '4 min ago', tone: '' },
    { label: 'CO', value: '0', unit: 'ppm', age: '4 min ago', tone: '' },
  ] },
  { label: 'Bilge', icon: 'wave', tone: 'accent', age: '4 min ago', channels: [
    { label: 'Bilge water level', value: '3', unit: 'cm', age: '4 min ago', tone: '' },
    { label: 'Bilge pump running', value: 'No', unit: '', age: '4 min ago', tone: '' },
  ] },
  { label: 'Battery & DC', icon: 'battery', tone: 'safe', age: '4 min ago', channels: [
    { label: 'House bank', value: '12.7', unit: 'V', age: '4 min ago', tone: '' },
    { label: 'Charge current', value: '−4.2', unit: 'A', age: '4 min ago', tone: '' },
    { label: 'State of charge', value: '86', unit: '%', age: '4 min ago', tone: '' },
    { label: 'Start battery', value: '12.9', unit: 'V', age: '1 h 12 min ago', tone: 'warn' },
  ] },
  { label: 'Climate', icon: 'temp', tone: '', age: '9 min ago', channels: [
    { label: 'Cabin temperature', value: '79', unit: '°F', age: '9 min ago', tone: '' },
    { label: 'Humidity', value: '71', unit: '%', age: '9 min ago', tone: '' },
  ] },
]
const selected = ref('House bank')
const ranges = ['1 h', '6 h', '24 h', '7 d']
const range = ref('24 h')
const bars = computed(() => range.value === '1 h' ? [70, 71, 71, 70, 72, 72, 73, 72, 72, 71, 72, 72] : [88, 84, 80, 76, 74, 72, 70, 66, 62, 64, 70, 78, 84, 88, 86, 82, 78, 74, 72, 70, 68, 70, 72, 72])
const predictions = [
  { kind: 'Battery health', out: 'score 92%', model: 'bank-life@3', when: '14 Oct, 08:10' },
  { kind: 'Bilge trend', out: 'steady', model: 'ingress@2', when: '14 Oct, 08:10' },
  { kind: 'Mould risk', out: 'score 34%', model: 'climate@1', when: '13 Oct, 20:00' },
]
</script>

<style scoped>
.mon-tile { display: grid; gap: 2px; padding: 10px 12px; text-align: left; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-0); cursor: pointer; }
.mon-tile.is-on { border-color: var(--scr-accent); background: var(--wave-50); }
.mon-tile[data-tone='warn'] .scr-tele-value { color: var(--warn); }
</style>
