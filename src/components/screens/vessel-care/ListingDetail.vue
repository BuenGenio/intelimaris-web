<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Bahia Mar C-14</h1>
        <p class="scr-sub">What a visiting vessel sees, and every stay asked of it.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="safe">Instant book</span><button class="scr-btn scr-btn--ghost scr-btn--sm">All listings</button></div>
    </div>

    <span class="scr-thumb scr-thumb--wide" style="display: block; margin-bottom: 12px"></span>

    <div class="scr-card">
      <h2 class="scr-card-title">Details</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Price, the largest vessel it takes, and the booking mode.</p>
      <dl>
        <div v-for="d in details" :key="d.label" class="scr-kv"><dt>{{ d.label }}</dt><dd><strong>{{ d.value }}</strong><span v-if="d.note" class="scr-item-sub">{{ d.note }}</span></dd></div>
      </dl>
      <button class="scr-btn scr-btn--sm" style="margin-top: 10px">Edit listing</button>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Stays asked of this listing</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 4px">Requests, confirmations and what has cleared — the served state machine decides the buttons.</p>
      <div v-for="s in stays" :key="s.vessel" class="scr-kv" style="align-items: center">
        <span><span class="scr-item-title">{{ s.vessel }}</span><span class="scr-item-sub">{{ s.dates }} · {{ s.quote }}</span></span>
        <span class="scr-row"><span class="scr-pill" :data-tone="s.tone">{{ s.status }}</span><button v-if="s.status === 'Requested'" class="scr-btn scr-btn--primary scr-btn--sm">Confirm</button></span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Pause and retire</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 10px">Pause takes it off the map and keeps it; retire is history — stays already booked stay on record.</p>
      <div class="scr-row"><button class="scr-btn scr-btn--sm">Pause listing</button><button class="scr-btn scr-btn--danger scr-btn--sm">Retire listing</button></div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">Payouts</h2><p class="scr-sub scr-small">Where the money from this listing went.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">Payouts</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const details = [
  { label: 'Rate', value: '$127.00 / night', note: '' },
  { label: 'Max length', value: '50 ft', note: '' },
  { label: 'Booking', value: 'Instant book', note: '' },
  { label: 'Berth', value: 'C-14', note: 'The drawn berth this listing sells.' },
  { label: 'Open nights', value: '1 Oct → 30 Nov 2026', note: '' },
  { label: 'Description', value: 'Floating dock, 30/50 A shore power, water. Fuel dock 200 ft.', note: '' },
]
const stays = [
  { vessel: 'Wanderer · 42 ft', dates: '16 → 18 Oct · 2 nights', quote: '$254.00', status: 'Confirmed', tone: 'safe' },
  { vessel: 'Blue Heron · 38 ft', dates: '20 → 21 Oct · 1 night', quote: '$127.00', status: 'Requested', tone: 'warn' },
  { vessel: 'Sea Change · 45 ft', dates: '9 → 11 Oct · 2 nights', quote: '$254.00', status: 'Completed', tone: 'offline' },
  { vessel: 'Marlin · 34 ft', dates: '4 Oct · 1 night', quote: '$127.00', status: 'Declined', tone: 'offline' },
]
</script>
