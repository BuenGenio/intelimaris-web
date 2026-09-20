<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Rates</h1>
        <p class="scr-sub">What a visiting vessel pays per night, by length. The band that fits her prices the stay.</p>
      </div>
      <div class="scr-row">
        <button type="button" class="scr-btn scr-btn--primary" @click="adding = !adding">Add a band</button>
        <button type="button" class="scr-btn scr-btn--ghost">Short stay</button>
      </div>
    </div>

    <div v-if="adding" class="scr-card" style="margin-bottom: 14px">
      <p class="scr-card-title">New band</p>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">What the guest reads, which lengths it takes, and what a night costs.</p>
      <div class="scr-grid-2">
        <div class="scr-field"><span class="scr-label">Name</span><input class="scr-input" placeholder="Transient · up to 50 ft" /></div>
        <div class="scr-field"><span class="scr-label">Basis</span><select class="scr-select"><option>Per foot</option><option>Flat</option></select><span class="scr-hint">Per foot is a price per foot of vessel per night.</span></div>
        <div class="scr-field"><span class="scr-label">Rate</span><input class="scr-input" placeholder="USD/ft/night" /></div>
        <div class="scr-field"><span class="scr-label">Currency</span><input class="scr-input" value="usd" /><span class="scr-hint">ISO 4217.</span></div>
        <div class="scr-field"><span class="scr-label">Smallest LOA</span><input class="scr-input" placeholder="ft" /><span class="scr-hint">Inclusive. Blank = 0.</span></div>
        <div class="scr-field"><span class="scr-label">Largest LOA</span><input class="scr-input" placeholder="ft" /><span class="scr-hint">Exclusive. Blank = no upper bound.</span></div>
        <div class="scr-field"><span class="scr-label">Minimum nights</span><input class="scr-input" value="1" /></div>
        <div class="scr-field"><span class="scr-label">Instant book</span><select class="scr-select"><option>No — the dockmaster decides</option><option>Yes — confirmed at request time</option></select></div>
        <div class="scr-field"><span class="scr-label">Season from</span><input class="scr-input" placeholder="2026-11-01" /><span class="scr-hint">Both or neither; a season wrapping the year end is two bands.</span></div>
        <div class="scr-field"><span class="scr-label">Season to</span><input class="scr-input" placeholder="2027-04-30" /></div>
      </div>
      <div class="scr-row" style="margin-top: 12px">
        <button type="button" class="scr-btn scr-btn--primary">Add the band</button>
        <button type="button" class="scr-btn scr-btn--ghost" @click="adding = false">Cancel</button>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 8px">Money: integer cents on the wire; the screen never computes a stay total — the service quotes it.</p>
    </div>

    <div class="scr-card">
      <p class="scr-card-title">Active bands</p>
      <p class="scr-sub scr-small" style="margin-bottom: 4px">5 bands a guest is quoted from.</p>
      <div v-for="b in active" :key="b.name" class="scr-kv" style="align-items: center">
        <span>
          <span class="scr-strong">{{ b.name }}</span>
          <span v-if="b.instant" class="scr-pill" data-tone="safe" style="margin-left: 8px">Instant book</span>
          <span class="scr-item-sub"><span class="scr-num scr-strong">{{ b.rate }}</span> · {{ b.span }}{{ b.min ? ` · min ${b.min} nights` : '' }} · {{ b.season }}</span>
        </span>
        <span class="scr-row"><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Edit</button><button type="button" class="scr-btn scr-btn--sm">Retire</button></span>
      </div>
    </div>

    <div class="scr-card scr-section">
      <p class="scr-card-title">Retired</p>
      <p class="scr-sub scr-small" style="margin-bottom: 4px">Kept for the stays they priced; a guest never sees them.</p>
      <div v-for="b in retired" :key="b.name" class="scr-kv" style="opacity: 0.6">
        <span>
          <span class="scr-strong">{{ b.name }}</span><span class="scr-pill" style="margin-left: 8px">Retired</span>
          <span class="scr-item-sub"><span class="scr-num">{{ b.rate }}</span> · {{ b.span }} · {{ b.season }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const adding = ref(false)
const active = [
  { name: 'Transient · up to 40 ft', rate: '$3.40/ft/night', span: '0 ft – 40 ft', min: 0, instant: true, season: 'all year' },
  { name: 'Transient · 40–50 ft', rate: '$3.80/ft/night', span: '40 ft – 50 ft', min: 0, instant: true, season: 'all year' },
  { name: 'Transient · 50–80 ft', rate: '$4.60/ft/night', span: '50 ft – 80 ft', min: 2, instant: false, season: 'all year' },
  { name: 'Superyacht · 80 ft and up', rate: '$6.25/ft/night', span: '80 ft and up', min: 3, instant: false, season: 'all year' },
  { name: 'Boat show week', rate: '$9.00/ft/night', span: '0 ft and up', min: 5, instant: false, season: '2026-10-26 → 2026-11-02' },
]
const retired = [
  { name: 'Summer transient · 2025', rate: '$2.95/ft/night', span: '0 ft – 50 ft', season: '2025-05-01 → 2025-10-31' },
  { name: 'Dinghy dock · flat', rate: '$25.00/night', span: '0 ft – 16 ft', season: 'all year' },
]
</script>
