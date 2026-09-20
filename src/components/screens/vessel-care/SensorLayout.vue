<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Unit locations</h1>
        <p class="scr-sub">Which physical thing each unit is actually measuring, by zone on board.</p>
      </div>
      <span class="scr-pill scr-pill--bare">Scaffold</span>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Zones</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">A proposed vocabulary — the served one is still to be defined.</p>
      <div class="scr-chips"><span v-for="z in zones" :key="z" class="scr-chip" :class="{ 'is-on': z === zone }" @click="zone = z">{{ z }}</span></div>
    </div>

    <div class="scr-section scr-card scr-card--flush">
      <div style="padding: 14px 14px 0"><h2 class="scr-card-title">Units</h2><p class="scr-small scr-muted">Unassigned is honest; a guessed zone written down as fact is not.</p></div>
      <div class="scr-divider" style="margin: 10px 0 0"></div>
      <div class="scr-list" style="border: 0; border-radius: 0">
        <div v-for="u in units" :key="u.serial" class="scr-item">
          <span class="scr-item-icon" :data-tone="u.tone"><ScrIcon name="radio" /></span>
          <div><span class="scr-item-title scr-num">{{ u.serial }}</span><span class="scr-item-sub">{{ u.watches }}</span></div>
          <div class="scr-item-end"><span class="scr-pill" :data-tone="u.zone === 'Unassigned' ? 'offline' : 'info'">{{ u.zone }}</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Set zone</button></div>
        </div>
      </div>
    </div>

    <div class="scr-section">
      <p class="scr-ov" style="margin-bottom: 8px">Deck plan</p>
      <div class="scr-card lay-plan">
        <svg viewBox="0 0 340 120" aria-hidden="true">
          <path d="M10 60 Q40 8 170 8 T330 60 Q300 112 170 112 T10 60Z" fill="#eef3fa" stroke="#b7bfcf" />
          <g v-for="(p, i) in pins" :key="i" :transform="`translate(${p.x} ${p.y})`"><circle r="9" :fill="p.fill" fill-opacity=".2" /><circle r="3.5" :fill="p.fill" /><text :x="0" y="22" text-anchor="middle" font-size="9" fill="#66708a">{{ p.label }}</text></g>
        </svg>
        <p class="scr-micro scr-muted">Bow to the right. Three placed, one unassigned.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const zones = ['Engine room', 'Forward bilge', 'Aft bilge', 'Forward cabin', 'Saloon', 'Helm', 'Lazarette', 'Mast']
const zone = ref('Engine room')
const units = [
  { serial: 'PWTS-01', watches: 'bilge level, bilge pump, house bank', zone: 'Aft bilge', tone: 'accent' },
  { serial: 'PWTS-02', watches: 'smoke, CO, cabin temperature', zone: 'Saloon', tone: 'accent' },
  { serial: 'PWTS-03', watches: 'never reported', zone: 'Unassigned', tone: '' },
  { serial: 'PWTS-04', watches: 'engine hours, coolant temperature', zone: 'Engine room', tone: 'accent' },
]
const pins = [
  { x: 60, y: 60, fill: '#4274bb', label: 'Aft bilge' },
  { x: 150, y: 48, fill: '#4274bb', label: 'Saloon' },
  { x: 110, y: 78, fill: '#4274bb', label: 'Engine room' },
]
</script>

<style scoped>
.lay-plan svg { display: block; width: 100%; height: auto; margin-bottom: 6px; }
</style>
