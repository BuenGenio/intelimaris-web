<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acl-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'About & legal' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack">
      <div><h2 class="scr-h3">About & legal</h2><p class="scr-small scr-muted">Where the map's data comes from, and the licences it carries.</p></div>
      <div>
        <p class="scr-strong scr-small">Offline basemap</p>
        <p class="scr-small">Map data © OpenStreetMap contributors (ODbL 1.0) — openstreetmap.org/copyright</p>
      </div>
      <div>
        <p class="scr-strong scr-small">Map data sources</p>
        <ul class="scr-small acl-sources">
          <li v-for="a in SOURCES" :key="a">{{ a }}</li>
        </ul>
      </div>
      <p class="scr-micro scr-muted">Charted depths and nautical layers are aids to planning, not a substitute for official charts or the judgment of the operator.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">Documents</h2>
      <ul class="scr-list">
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Terms of service</span><span class="scr-item-sub">version 2026-09 · accepted 14 Sep 2026</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Privacy policy</span><span class="scr-item-sub">version 2026-09 · accepted 14 Sep 2026</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
        <li class="scr-item scr-item--plain"><span><span class="scr-item-title">Open-source licences</span><span class="scr-item-sub">MapLibre GL, OpenSeaMap and the rest</span></span><span class="scr-item-end"><ScrIcon name="chevron" /></span></li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">This build</h2>
      <div class="scr-dl">
        <dt>App</dt><dd class="scr-num">WaterWayz 2.14.0 (build 3120)</dd>
        <dt>Basemap</dt><dd class="scr-num">fll-basemap 2026-09-02</dd>
        <dt>Charts</dt><dd class="scr-num">NOAA ENC, updated 11 Sep 2026</dd>
      </div>
      <p class="scr-micro scr-muted">WaterWayz is not a certified navigation system. Always navigate with official charts.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const SOURCES = [
  'Chart © NOAA Office of Coast Survey',
  'Esri, GEBCO, NOAA, Garmin, and other contributors',
  'Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  'Seamarks © OpenSeaMap contributors',
  '© Mapbox © OpenStreetMap',
]
</script>

<style scoped>
.acl-tabs { margin: 12px 0; }
.acl-sources { display: grid; gap: 3px; margin-top: 2px; }
</style>
