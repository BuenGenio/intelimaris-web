<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">IDS</h1>
        <p class="scr-sub">Line the vessel up on this berth, and say plainly when it is not.</p>
      </div>
      <div class="scr-row"><span class="scr-pill scr-pill--bare">Preview</span><span class="scr-pill scr-pill--bare">Sample</span></div>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Berth C-14</h2><p class="scr-sub scr-small">Port-side tie, bow in · Bahia Mar</p></div>
        <span class="scr-pill" data-tone="danger">Off centre</span>
      </div>
      <div class="scr-divider"></div>
      <div class="ids-berth">
        <svg viewBox="0 0 320 150" aria-hidden="true">
          <rect x="0" y="0" width="320" height="150" fill="#b7d1ea" />
          <rect x="20" y="10" width="14" height="130" fill="#cdb98b" />
          <rect x="34" y="10" width="110" height="130" fill="none" stroke="#2e9b4e" stroke-dasharray="4 3" />
          <line x1="89" y1="10" x2="89" y2="140" stroke="#2e9b4e" stroke-opacity=".5" />
          <g transform="translate(118 78) rotate(-14)"><path d="M0-46 14-10 12 42-12 42-14-10Z" fill="#fff" stroke="#2c3d68" stroke-width="1.5" /></g>
          <path d="M89 118 H118" stroke="#c8322b" stroke-width="2" /><text x="103" y="132" text-anchor="middle" font-size="10" fill="#c8322b">1.8 m</text>
        </svg>
      </div>
      <div class="scr-grid-3" style="margin-top: 12px">
        <div v-for="m in metrics" :key="m.label" class="ids-metric">
          <span class="scr-stat-label">{{ m.label }}</span>
          <span class="scr-tele-value scr-num" :class="{ 'ids-fail': !m.pass }">{{ m.value }}<small>{{ m.unit }}</small></span>
          <span class="scr-pill" :data-tone="m.pass ? 'safe' : 'danger'"><ScrIcon :name="m.pass ? 'check' : 'x'" />{{ m.pass ? 'Pass' : 'Fail' }}</span>
        </div>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 10px">An unknown metric reads — with a named reason; not a pass and not a fail. The summary above follows the rows: a red row never sits under a green summary.</p>
    </div>

    <div class="scr-alert" data-tone="danger" style="margin-top: 12px">
      <ScrIcon name="alert" />
      <div>
        <strong>Hold off and re-approach</strong>
        <span class="scr-small">Berth C-14 · lateral offset. You are 1.8 m to starboard of the berth centreline.</span>
        <span class="scr-micro" style="display: block; margin-top: 4px">IDS preview · sample pose · no live feed</span>
      </div>
    </div>

    <div class="scr-bar">
      <button class="scr-btn scr-btn--primary scr-btn--block" disabled>Start guidance</button>
      <button class="scr-btn">Pick a berth on the map</button>
    </div>
    <p class="scr-micro scr-muted" style="margin-top: 10px; text-align: center">Not for navigation. WaterWayz is an aid, not a certified chart.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const metrics = [
  { label: 'Approach angle', value: '14', unit: '°', pass: true },
  { label: 'Lateral offset', value: '1.8', unit: 'm', pass: false },
  { label: 'Wind on the beam', value: '11', unit: 'kn', pass: true },
]
</script>

<style scoped>
.ids-berth svg { display: block; width: 100%; height: auto; border-radius: var(--scr-r-sm); }
.ids-metric { display: grid; gap: 4px; justify-items: start; }
.ids-fail { color: var(--danger); }
</style>
