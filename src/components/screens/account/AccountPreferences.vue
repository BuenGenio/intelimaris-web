<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acr-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Preferences' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack">
      <div><h2 class="scr-h3">Units</h2><p class="scr-small scr-muted">A display choice. The data never changes.</p></div>
      <div class="scr-field">
        <span class="scr-label">Measurement units</span>
        <div class="scr-tabs">
          <button type="button" class="scr-tab" :class="{ 'is-on': units === 'us' }" @click="units = 'us'">US — ft, °F</button>
          <button type="button" class="scr-tab" :class="{ 'is-on': units === 'metric' }" @click="units = 'metric'">Metric — m, °C</button>
        </div>
      </div>
      <div class="scr-card" style="background: var(--ink-50)">
        <p class="scr-ov">How that reads</p>
        <div class="scr-row scr-row--wrap scr-small" style="margin-top: 6px; gap: 4px 14px">
          <span v-for="q in preview" :key="q.label" class="scr-muted">{{ q.label }}: <span class="scr-strong scr-num">{{ q.value }}</span></span>
        </div>
      </div>
      <a class="scr-small scr-strong">Set units per measurement</a>
    </div>

    <div class="scr-section scr-card scr-stack">
      <h2 class="scr-h3">Locale and time</h2>
      <label class="scr-field"><span class="scr-label">Language</span><select class="scr-select"><option selected>English (United States)</option><option>English (United Kingdom)</option></select></label>
      <label class="scr-field"><span class="scr-label">Time zone</span><select class="scr-select"><option selected>America/New_York</option><option>America/Chicago</option><option>America/Los_Angeles</option></select></label>
      <label class="scr-field"><span class="scr-label">Time format</span><select class="scr-select"><option selected>Follow language</option><option>12-hour</option><option>24-hour</option></select></label>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Colour table</h2><p class="scr-small scr-muted">Day, dusk or night, as a plotter offers them — or follow your device between day and dusk.</p></div>
      <div class="scr-tabs">
        <button v-for="t in ['Day', 'Dusk', 'Night', 'Device']" :key="t" type="button" class="scr-tab" :class="{ 'is-on': theme === t }" @click="theme = t">{{ t }}</button>
      </div>
      <p class="scr-micro scr-muted">Night is a helm choice: nothing on screen is white, the depth ramp barely leaves black and the danger ring is the one bright thing. Your device never picks it for you.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Map</h2><p class="scr-small scr-muted">How the 3D view draws. Stored on this browser.</p></div>
      <label class="scr-row acr-toggle"><button type="button" class="scr-switch" :class="{ 'is-on': facades }" @click="facades = !facades"></button><span><span class="scr-strong scr-small">Building colours</span><span class="scr-item-sub">Varied facades on the 3D buildings — mapped colours where OSM has them, height tones for the rest. Off keeps every building in one tone.</span></span></label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const units = ref<'us' | 'metric'>('us')
const theme = ref('Day')
const facades = ref(true)
const preview = computed(() => units.value === 'us'
  ? [{ label: 'Length and beam', value: '40 ft' }, { label: 'Depth', value: '7.9 ft' }, { label: 'Distance', value: '10.0 nm' }, { label: 'Speed', value: '8.4 kn' }, { label: 'Temperature', value: '75 °F' }, { label: 'Fuel and water', value: '106 gal' }, { label: 'Pressure', value: '29.92 inHg' }, { label: 'Displacement', value: '16,000 lb' }]
  : [{ label: 'Length and beam', value: '12.2 m' }, { label: 'Depth', value: '2.4 m' }, { label: 'Distance', value: '10.0 nm' }, { label: 'Speed', value: '8.4 kn' }, { label: 'Temperature', value: '24 °C' }, { label: 'Fuel and water', value: '400 L' }, { label: 'Pressure', value: '1013 hPa' }, { label: 'Displacement', value: '7,258 kg' }])
</script>

<style scoped>
.acr-tabs { margin: 12px 0; }
.acr-toggle { align-items: flex-start; padding: 6px 0; }
</style>
