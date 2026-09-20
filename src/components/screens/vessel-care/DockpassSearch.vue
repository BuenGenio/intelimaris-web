<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Find a berth</h1>
        <p class="scr-sub">Near you, for the nights you choose.</p>
      </div>
      <button class="scr-btn scr-btn--ghost scr-btn--sm">Your stays</button>
    </div>

    <div class="scr-card">
      <div class="scr-grid-2">
        <label class="scr-field"><span class="scr-label">Check in</span><input class="scr-input" value="16 Oct 2026" readonly /></label>
        <label class="scr-field"><span class="scr-label">Check out</span><input class="scr-input" value="18 Oct 2026" readonly /><span class="scr-hint">Exclusive.</span></label>
      </div>
      <div class="scr-row" style="margin-top: 10px; align-items: flex-end">
        <label class="scr-field" style="flex: 1"><span class="scr-label">Length overall</span><input class="scr-input scr-num" value="42.0 ft" readonly /></label>
        <button class="scr-btn scr-btn--primary"><ScrIcon name="search" /> Search within 10 km</button>
      </div>
      <p class="scr-hint" style="margin-top: 6px">A per-metre price needs your length overall to be quoted; without it the row says so rather than guessing.</p>
    </div>

    <ScrMap :height="150" style="margin-top: 12px" :pins="[{ x: 200, y: 120, tone: 'safe' }, { x: 240, y: 70, tone: 'info' }, { x: 160, y: 170, tone: 'info' }, { x: 300, y: 150 }]" :self="{ x: 200, y: 140, heading: 74 }">
      <span class="scr-map-overlay scr-map-overlay--bl scr-map-chip">4 within 10 km</span>
    </ScrMap>

    <div class="scr-section">
      <p class="scr-ov">Marinas and private docks</p>
      <p class="scr-small scr-muted" style="margin: -4px 0 8px">By distance. The button is the service's own verdict on each.</p>
      <div class="scr-list">
        <div v-for="r in rows" :key="r.name" class="scr-item scr-item--plain">
          <div>
            <span class="scr-item-title">{{ r.name }} <span class="scr-micro scr-muted" style="font-weight: 400">{{ r.kind }}</span></span>
            <span class="scr-item-sub">{{ r.dist }} · {{ r.max }} · {{ r.price }}</span>
          </div>
          <button class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': r.cta === 'Instant book' }" :disabled="r.cta === 'Unavailable'">{{ r.cta }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const rows = [
  { name: 'Bahia Mar', kind: 'marina · 186 berths drawn', dist: '0.4 NM', max: 'up to 120 ft', price: 'from $127.00/night', cta: 'Instant book' },
  { name: 'Isle of Venice dock', kind: 'private dock', dist: '1.1 NM', max: 'up to 48 ft', price: '$95.00/night', cta: 'Request' },
  { name: 'Las Olas Marina', kind: 'marina · 60 berths drawn', dist: '1.6 NM', max: 'length not stated', price: 'per-metre bands — state your length to be quoted', cta: 'Call the marina' },
  { name: 'Coconuts', kind: 'private dock · dock and dine', dist: '2.3 NM', max: 'up to 45 ft', price: 'free with dinner', cta: 'Request' },
  { name: 'Hall of Fame Marina', kind: 'marina', dist: '2.9 NM', max: 'up to 140 ft', price: 'from $141.00/night', cta: 'Unavailable' },
]
</script>
