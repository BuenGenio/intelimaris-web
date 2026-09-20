<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Claim your marina</h1>
        <p class="scr-sub">Step 1 — find it. Pick a basin on the map, or drop a pin where the directory has nothing.</p>
      </div>
      <button class="scr-btn scr-btn--ghost">Claim status</button>
    </div>

    <div class="scr-card">
      <div class="scr-tabs" style="max-width: 520px">
        <button v-for="m in modes" :key="m" class="scr-tab" :class="{ 'is-on': m === mode }" @click="mode = m">{{ m }}</button>
      </div>
      <div class="scr-row scr-row--between" style="margin: 10px 0 8px">
        <p class="scr-small scr-muted">{{ mode === 'Not listed — drop a pin' ? 'Click where your marina is. We check the directory around the pin before anything is filed.' : '5 of 5 in view. Click a basin to pick it.' }}</p>
        <button class="scr-btn scr-btn--ghost scr-btn--sm">{{ mode === 'Not listed — drop a pin' ? 'Back to picking basins' : 'Not here? Drop a pin' }}</button>
      </div>
      <ScrMap variant="chart" :height="300" :pins="pins">
        <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip">Fort Lauderdale · Intracoastal</span>
        <div class="scr-map-overlay scr-map-overlay--br scr-card" style="padding: 8px 10px; width: 210px">
          <span class="scr-strong">Bahia Mar Yachting Center</span>
          <span class="scr-item-sub">bahia-mar · Marina · 171 berths</span>
          <span class="scr-pill" data-tone="accent" style="margin-top: 4px">Picked</span>
        </div>
      </ScrMap>
      <div class="scr-list" style="margin-top: 10px">
        <div v-for="r in rows" :key="r.slug" class="scr-item scr-item--plain" :style="r.picked ? 'background: var(--wave-50)' : ''">
          <div class="scr-row scr-row--wrap"><span class="scr-strong">{{ r.name }}</span><span class="scr-micro scr-muted scr-num">{{ r.slug }}</span><span class="scr-small scr-muted">{{ r.kind }}</span><span v-if="r.note" class="scr-small scr-muted">{{ r.note }}</span></div>
          <span v-if="r.picked" class="scr-pill" data-tone="accent">Picked</span>
        </div>
      </div>
      <div class="scr-card scr-card--accent" style="margin-top: 10px; padding: 9px 12px"><span class="scr-strong">Bahia Mar Yachting Center</span> <span class="scr-muted">— a claim will be filed</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const modes = ['Search', 'Near me', 'On the map', 'Not listed — drop a pin']
const mode = ref('On the map')
const pins = [
  { x: 205, y: 118, tone: 'info' as const },
  { x: 176, y: 70, tone: 'safe' as const },
  { x: 232, y: 168, tone: 'safe' as const },
  { x: 160, y: 200, tone: 'warn' as const },
  { x: 250, y: 60, tone: 'safe' as const },
]
const rows = [
  { name: 'Bahia Mar Yachting Center', slug: 'bahia-mar', kind: 'Marina', note: '', picked: true },
  { name: 'Las Olas Marina', slug: 'las-olas', kind: 'Marina', note: 'Claimed — you can still ask to contest', picked: false },
  { name: 'Hall of Fame Marina', slug: 'hall-of-fame', kind: 'Marina', note: '', picked: false },
  { name: 'Pier Sixty-Six Marina', slug: 'pier-66', kind: 'Marina', note: 'Claimed — you can still ask to contest', picked: false },
  { name: 'Bahia Mar Fuel Dock', slug: 'bahia-mar-fuel', kind: 'Fuel dock', note: 'A facility — nobody claims it', picked: false },
]
</script>
