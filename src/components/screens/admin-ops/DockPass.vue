<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">DockPass hosts</h1>
        <p class="scr-sub">Listings and bookings across every workspace. Read-only — hosts own their listings, and the decisions on this queue are theirs to make.</p>
      </div>
      <div class="scr-tabs dp-tabs">
        <button type="button" class="scr-tab" :class="{ 'is-on': tab === 'bookings' }" @click="tab = 'bookings'">Bookings queue</button>
        <button type="button" class="scr-tab" :class="{ 'is-on': tab === 'listings' }" @click="tab = 'listings'">Listings</button>
      </div>
    </div>

    <template v-if="tab === 'bookings'">
      <div class="scr-toolbar">
        <span class="scr-chip">Status · Every booking <span aria-hidden="true">⌄</span></span>
        <span class="scr-spacer"></span>
        <span class="scr-pill" data-tone="warn">2 of 6 on this page await a decision.</span>
      </div>
      <div class="scr-table-wrap">
        <table class="scr-table">
          <thead><tr><th>Booked against</th><th>Vessel</th><th>Status</th><th>Stay</th><th class="scr-num">Quote</th><th>Payment</th><th>Requested</th><th>Arrived</th><th>History</th></tr></thead>
          <tbody>
            <tr v-for="b in bookings" :key="b.id">
              <td :class="b.rateCard ? 'scr-muted' : 'scr-strong'">{{ b.against }}</td>
              <td><span class="scr-row"><span>{{ b.vessel }}</span><span v-if="b.walkIn" class="scr-pill scr-pill--bare">Walk-in</span></span></td>
              <td><span class="scr-pill" :data-tone="b.tone">{{ b.status }}</span></td>
              <td class="scr-small scr-muted scr-num">{{ b.stay }}</td>
              <td class="scr-num scr-muted">{{ b.quote }}</td>
              <td class="scr-small scr-muted">{{ b.payment }}</td>
              <td class="scr-small scr-muted scr-num">{{ b.requested }}</td>
              <td class="scr-small scr-muted scr-num">{{ b.arrived }}</td>
              <td><span v-if="b.decided" class="scr-small scr-strong scr-accent">Open</span><span v-else class="scr-small scr-muted">Awaiting a first decision</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-row scr-row--between scr-section">
        <span class="scr-small scr-muted">Showing 1–6 of 143</span>
        <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></div>
      </div>
    </template>

    <template v-else>
      <div class="scr-toolbar">
        <span class="scr-input scr-input--search dp-search scr-muted">Listing name, berth or marina…</span>
        <span class="scr-chip">Marina · Any marina <span aria-hidden="true">⌄</span></span>
        <span class="scr-chip">Host switch · Either <span aria-hidden="true">⌄</span></span>
        <span class="scr-chip">Booking · Either <span aria-hidden="true">⌄</span></span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Listing</th><th>Marina</th><th>Availability</th><th class="scr-num">Rate</th><th>State</th></tr></thead>
        <tbody>
          <tr v-for="l in listings" :key="l.id">
            <td><strong>{{ l.name }}</strong> <span class="scr-small scr-muted">Berth {{ l.berth }}</span></td>
            <td><span v-if="l.marina" class="scr-small scr-muted scr-num">{{ l.marina }}</span><span v-else class="scr-small scr-muted">Private dock</span></td>
            <td class="scr-small scr-muted">{{ l.availability }}</td>
            <td class="scr-num scr-muted">{{ l.rate }}</td>
            <td><span class="scr-row"><span v-if="l.instant" class="scr-pill" data-tone="accent">Instant book</span><span v-if="!l.active" class="scr-pill">Paused</span></span></td>
          </tr>
        </tbody>
      </table>
      <div class="scr-row scr-row--between scr-section">
        <span class="scr-small scr-muted">Showing 1–5 of 37</span>
        <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Previous</button><button type="button" class="scr-btn scr-btn--sm">Next</button></div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tab = ref<'bookings' | 'listings'>('bookings')
const bookings = [
  { id: 'b1', against: 'Isle of Venice dock · east face', rateCard: false, vessel: 'Wanderer', walkIn: false, status: 'requested', tone: 'warn', stay: '2026-10-16 → 2026-10-19 · 3 nights', quote: '$285.00', payment: 'unpaid', requested: '2026-10-14', arrived: '—', decided: false },
  { id: 'b2', against: 'Rate card · bahia-mar', rateCard: true, vessel: 'Sea Change', walkIn: true, status: 'confirmed', tone: 'safe', stay: '2026-10-14 → 2026-10-15 · 1 night', quote: '$168.00', payment: 'paid', requested: '2026-10-14', arrived: 'Oct 14 13:05', decided: true },
  { id: 'b3', against: 'Bahia Mar C-14', rateCard: false, vessel: 'Blue Heron', walkIn: false, status: 'pending', tone: 'warn', stay: '2026-10-20 → 2026-10-24 · 4 nights', quote: '$672.00', payment: 'unpaid', requested: '2026-10-13', arrived: '—', decided: false },
  { id: 'b4', against: 'Coconuts dock and dine', rateCard: false, vessel: 'Osprey', walkIn: false, status: 'completed', tone: 'offline', stay: '2026-10-09 → 2026-10-09 · 1 night', quote: '—', payment: 'n/a', requested: '2026-10-08', arrived: 'Oct 9 18:40', decided: true },
  { id: 'b5', against: 'Bahia Mar C-14', rateCard: false, vessel: 'Wanderer', walkIn: false, status: 'declined', tone: 'danger', stay: '2026-10-02 → 2026-10-05 · 3 nights', quote: '$504.00', payment: 'unpaid', requested: '2026-09-30', arrived: '—', decided: true },
  { id: 'b6', against: 'Isle of Venice dock · east face', rateCard: false, vessel: 'Kestrel', walkIn: false, status: 'expired', tone: 'offline', stay: '2026-10-01 → 2026-10-03 · 2 nights', quote: '$190.00', payment: 'unpaid', requested: '2026-09-27', arrived: '—', decided: true },
]
const listings = [
  { id: 'l1', name: 'Isle of Venice dock · east face', berth: 'E-1', marina: null, availability: 'Active · 3 windows · next 2026-10-16', rate: '$95.00 / night', instant: false, active: true },
  { id: 'l2', name: 'Bahia Mar C dock', berth: 'C-14', marina: 'bahia-mar', availability: 'Active · 1 window · next 2026-10-20', rate: '$168.00 / night', instant: true, active: true },
  { id: 'l3', name: 'Coconuts dock and dine', berth: '—', marina: null, availability: 'Active · no open windows', rate: '$0.00 / hour', instant: true, active: true },
  { id: 'l4', name: 'Lauderdale Marine Service work dock', berth: 'W-3', marina: 'lauderdale-marine-service', availability: 'Inactive', rate: '$140.00 / night', instant: false, active: false },
  { id: 'l5', name: 'Bahia Mar T-head', berth: 'T-2', marina: 'bahia-mar', availability: 'Active · 2 windows · next 2026-10-15', rate: '$310.00 / night', instant: true, active: true },
]
</script>

<style scoped>
.dp-tabs { flex: 0 0 auto; }
.dp-search { flex: 1; display: flex; align-items: center; min-width: 0; }
</style>
