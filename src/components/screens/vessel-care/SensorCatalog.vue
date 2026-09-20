<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Sensor catalogue</h1>
        <p class="scr-sub">Every system a unit can watch, what it reports, and where to buy it.</p>
      </div>
      <span class="scr-pill scr-pill--bare">Scaffold</span>
    </div>
    <div class="scr-row" style="margin-bottom: 14px"><button class="scr-btn">Claim a unit</button><button class="scr-btn scr-btn--ghost">Sensors</button></div>

    <div class="scr-card scr-card--accent">
      <h2 class="scr-card-title">See it on a vessel like yours</h2>
      <p class="scr-small scr-muted">A demo vessel with every system reporting, so you know what monitoring looks like before a box arrives.</p>
      <div class="scr-row" style="margin-top: 10px"><span class="scr-pill scr-pill--bare">Not wired</span><span class="scr-micro scr-muted">Until then, Monitoring on this workspace shows nothing invented.</span></div>
    </div>

    <div class="scr-section">
      <p class="scr-ov">Systems</p>
      <p class="scr-small scr-muted" style="margin: -4px 0 8px">From the sensors service. Life safety first — the order the service declares.</p>
      <div class="scr-stack scr-stack--tight">
        <div v-for="s in systems" :key="s.label" class="scr-card cat-sys">
          <span class="scr-item-icon" :data-tone="s.tone"><ScrIcon :name="s.icon" /></span>
          <div style="min-width: 0">
            <p class="scr-item-title">{{ s.label }}</p>
            <p class="scr-item-sub">{{ s.channels }}</p>
            <div class="scr-row" style="margin-top: 8px"><a class="scr-small scr-strong scr-accent" href="#">Buy at intelimaris.com</a><span class="scr-pill scr-pill--bare">{{ s.count }} channel{{ s.count === 1 ? '' : 's' }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const systems = [
  { label: 'Fire, smoke & CO', icon: 'alert', tone: 'danger', count: 3, channels: 'Smoke · CO · Heat' },
  { label: 'Water intrusion', icon: 'drop', tone: 'accent', count: 2, channels: 'Leak detected · Water level index' },
  { label: 'Bilge', icon: 'wave', tone: 'accent', count: 2, channels: 'Bilge water level · Bilge pump running' },
  { label: 'Battery & DC', icon: 'battery', tone: 'safe', count: 4, channels: 'House bank · Start battery · Charge current · State of charge' },
  { label: 'Shore power', icon: 'activity', tone: 'warn', count: 2, channels: 'AC voltage · AC current' },
  { label: 'Engine & fuel', icon: 'fuel', tone: 'accent', count: 5, channels: 'Engine hours · Coolant temperature · Oil pressure · Fuel level · RPM' },
  { label: 'Climate', icon: 'temp', tone: 'accent', count: 2, channels: 'Cabin temperature · Humidity' },
  { label: 'Switching', icon: 'settings', tone: 'accent', count: 4, channels: 'Relay 1 · Relay 2 · Relay 3 · Relay 4' },
]
</script>

<style scoped>
.cat-sys { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 12px; align-items: start; }
</style>
