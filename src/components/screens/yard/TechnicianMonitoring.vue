<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Monitoring</h1>
        <p class="scr-sub">Live sensor readings and model predictions for this vessel.</p>
      </div>
      <span class="scr-pill" data-tone="accent">Technician</span>
    </div>
    <p class="scr-small scr-muted" style="margin-bottom: 10px">Wanderer · 42 ft Sabre · through Lauderdale Marine Service</p>

    <div class="scr-chips" style="margin-bottom: 12px"><span class="scr-chip"><span class="scr-num">WZ-0417-A</span><span class="scr-pill" data-tone="safe">active</span></span></div>

    <div v-for="s in systems" :key="s.name" class="scr-card" style="margin-bottom: 12px">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">{{ s.name }}</h2><p class="scr-small scr-muted">{{ s.channels.length }} channels · {{ s.age }}</p></div><span class="scr-item-icon" :data-tone="s.tone"><ScrIcon :name="s.icon" /></span></div>
      <div class="scr-grid-2" style="margin-top: 10px">
        <button v-for="c in s.channels" :key="c.label" class="scr-tele" :data-tone="c.tone" :class="{ 'mon-on': c.label === selected }" @click="selected = c.label">
          <span class="scr-tele-icon"><ScrIcon :name="c.icon" /></span>
          <span><span class="scr-small scr-muted" style="display: block">{{ c.label }}</span><span class="scr-tele-value">{{ c.value }}<small>{{ c.unit }}</small></span></span>
          <span class="scr-tele-age">{{ c.age }}</span>
        </button>
      </div>
    </div>

    <div class="scr-card" style="margin-bottom: 12px">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">{{ selected }}</h2><p class="scr-small scr-muted">Last reading 4 min ago</p></div><div class="scr-tabs"><span v-for="r in ['1 h', '6 h', '24 h', '7 d']" :key="r" class="scr-tab" :class="{ 'is-on': r === '24 h' }">{{ r }}</span></div></div>
      <div class="scr-sparkline" style="margin-top: 12px; height: 72px"><i v-for="(h, i) in bars" :key="i" :style="{ height: h + '%' }"></i></div>
      <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>Oct 5, 9:41 AM</span><span>now</span></div>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Predictions</h2>
      <p class="scr-small scr-muted">What the models claim about this vessel — every claim carries who said it and when.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="p in predictions" :key="p.kind" class="scr-row scr-row--wrap" style="padding-top: 6px; border-top: 1px solid var(--ink-100)"><span class="scr-strong">{{ p.kind }}</span><span class="scr-muted">{{ p.out }}</span><span class="scr-spacer"></span><span class="scr-pill scr-pill--bare scr-num">{{ p.model }}</span><span class="scr-micro scr-muted">{{ p.when }}</span></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const selected = ref('Coolant temperature')
const bars = [42, 44, 43, 46, 50, 55, 58, 62, 66, 71, 78, 84, 80, 76, 72, 70]
const systems = [
  { name: 'Engine', icon: 'gauge', tone: 'warn', age: '4 min ago', channels: [
    { label: 'Coolant temperature', value: '196', unit: '°F', age: '4 min ago', tone: 'warn', icon: 'temp' },
    { label: 'Engine hours', value: '1,448', unit: 'h', age: '4 min ago', tone: '', icon: 'clock' },
    { label: 'Oil pressure', value: '48', unit: 'psi', age: '4 min ago', tone: '', icon: 'gauge' },
    { label: 'Fuel level', value: '62', unit: '%', age: '4 min ago', tone: '', icon: 'fuel' },
  ] },
  { name: 'Electrical', icon: 'battery', tone: 'safe', age: '2 min ago', channels: [
    { label: 'House bank', value: '12.6', unit: 'V', age: '2 min ago', tone: 'safe', icon: 'battery' },
    { label: 'Shore power', value: 'On', unit: '', age: '2 min ago', tone: 'safe', icon: 'activity' },
  ] },
  { name: 'Bilge', icon: 'drop', tone: '', age: '38 min ago', channels: [
    { label: 'Bilge level', value: '2', unit: 'in', age: '38 min ago', tone: 'warn', icon: 'drop' },
    { label: 'Bilge pump', value: 'Off', unit: '', age: '38 min ago', tone: 'offline', icon: 'wave' },
  ] },
]
const predictions = [
  { kind: 'Overheat risk', out: 'score 71%', model: 'engine-thermal@2.3', when: 'Oct 6, 8:02 AM' },
  { kind: 'Impeller wear', out: 'likely', model: 'raw-water@1.1', when: 'Oct 6, 8:02 AM' },
  { kind: 'Battery health', out: 'score 12%', model: 'battery-health@1.4', when: 'Oct 6, 7:30 AM' },
]
</script>
<style scoped>
.scr-tele { text-align: left; cursor: pointer; }
.mon-on { border-color: var(--scr-accent); background: color-mix(in srgb, var(--scr-accent) 6%, var(--ink-0)); }
</style>
