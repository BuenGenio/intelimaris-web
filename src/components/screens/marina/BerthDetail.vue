<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Berth C-14</h1>
        <p class="scr-sub">How a vessel gets in: which way, and which end first.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Open</span><button class="scr-btn scr-btn--ghost">Berth map</button></div>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">Dimensions and services</h2>
          <p class="scr-sub scr-small">Stated by the marina. A berth may state nothing beyond its label and its ring; that is a complete, valid berth.</p>
          <div class="scr-divider"></div>
          <dl>
            <div v-for="f in facts" :key="f.label" class="scr-kv">
              <dt>{{ f.label }}</dt>
              <dd style="text-align: right"><span class="scr-num scr-strong">{{ f.value }}</span><span v-if="f.note" class="scr-micro scr-muted" style="display: block">{{ f.note }}</span></dd>
            </div>
          </dl>
        </div>
        <div class="scr-card">
          <h2 class="scr-card-title">Notes</h2>
          <p>Finger on the west side is 30 ft; a 42-footer overhangs the outer piling. Pedestal C-14 shares a breaker with C-13.</p>
        </div>
        <p class="scr-micro scr-muted">Marina record · updated 9 Oct 2026</p>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <h2 class="scr-card-title">Entry</h2>
          <p class="scr-sub scr-small">The row this page exists for. Heading true, mode from the served vocabulary.</p>
          <p class="scr-num" style="font-size: 22px; font-weight: 700; margin-top: 8px">240° stern-in · starboard-to</p>
          <p class="scr-micro scr-muted">Drawn on the map; dashed when the mode is "either" or unstated.</p>
        </div>
        <div class="scr-card scr-card--flush">
          <ScrMap variant="basin" :height="200" :self="{ x: 232, y: 150, heading: 240 }">
            <span class="scr-map-overlay scr-map-overlay--tl scr-map-chip">Dock C · C-14</span>
          </ScrMap>
        </div>
        <div class="scr-card">
          <h2 class="scr-card-title">Today</h2>
          <div class="scr-row scr-row--wrap"><span class="scr-pill" data-tone="warn">Assigned</span><span class="scr-strong">Wanderer</span><span class="scr-small scr-muted">14–17 Oct · 3 nights · Sam Miller</span></div>
          <div class="scr-row" style="margin-top: 10px"><button class="scr-btn scr-btn--sm">Move berth</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Release</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const facts = [
  { label: 'Type', value: 'Finger berth', note: '' },
  { label: 'Length', value: '45 ft', note: '' },
  { label: 'Beam', value: '15 ft', note: '' },
  { label: 'Max draft', value: '6.5 ft', note: 'A rule the marina wrote, not a water level; it needs no datum and implies none.' },
  { label: 'Max air draft', value: '—', note: '' },
  { label: 'Shore power', value: '50 A', note: 'A berth with no shore power never says 0.' },
  { label: 'Water', value: 'Water', note: '' },
  { label: 'Mooring', value: 'Cleats', note: '' },
  { label: 'Depth alongside', value: '7.5 ft MLLW', note: 'sounded 3 d ago' },
]
</script>
