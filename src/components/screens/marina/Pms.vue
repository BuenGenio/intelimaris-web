<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Marina PMS map</h1>
        <p class="scr-sub">Everything a marina operator needs, and an honest answer for each one. Built screens open; the rest say what they will do and which issue delivers them.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="info">18 of 71 built</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Dashboard</button></div>
    </div>

    <div class="scr-split">
      <div class="scr-card scr-card--flush">
        <ScrMap variant="basin" :height="330" :pins="[{ x: 330, y: 22, tone: 'safe' }]">
          <div class="scr-map-overlay scr-map-overlay--tl scr-row scr-row--wrap" style="gap: 6px">
            <span class="scr-map-chip">Basin · 171 berths drawn</span>
            <span class="scr-map-chip">Approach 8 ft MLLW · VHF 16/71</span>
          </div>
          <div class="scr-map-overlay scr-map-overlay--b scr-row scr-row--wrap pms-legend">
            <span v-for="l in legend" :key="l.label" class="scr-map-chip"><i :style="{ background: l.color }"></i>{{ l.label }} · {{ l.n }}</span>
          </div>
        </ScrMap>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between">
          <h2 class="scr-h2">Berth C-14</h2>
          <span class="scr-pill" data-tone="warn">Assigned</span>
        </div>
        <p class="scr-sub scr-small">Dock C · finger, floating · sounded 3 d ago</p>
        <div class="scr-divider"></div>
        <dl class="scr-dl">
          <dt>Held for</dt><dd>Wanderer · 42 ft Sabre</dd>
          <dt>Stay</dt><dd>14–17 Oct · 3 nights</dd>
          <dt>Entry</dt><dd class="scr-num">240° stern-in · starboard-to</dd>
          <dt>Depth alongside</dt><dd class="scr-num">7.5 ft MLLW</dd>
          <dt>Max LOA / beam</dt><dd class="scr-num">45 ft / 15 ft</dd>
          <dt>Shore power</dt><dd class="scr-num">50 A · 240 V</dd>
          <dt>Water</dt><dd>Water</dd>
        </dl>
        <div class="scr-divider"></div>
        <div class="scr-row"><button class="scr-btn scr-btn--primary scr-btn--sm">Open berth</button><button class="scr-btn scr-btn--sm">Move berth</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Release</button></div>
      </div>
    </div>

    <div class="scr-section scr-grid-2">
      <div v-for="a in areas" :key="a.label" class="scr-card">
        <h3 class="scr-card-title">{{ a.label }}</h3>
        <p class="scr-sub scr-small" style="margin-bottom: 6px">{{ a.note }}</p>
        <div v-for="s in a.screens" :key="s.label" class="scr-row pms-row">
          <span class="scr-strong" :class="{ 'scr-muted': s.status === 'Not built' }">{{ s.label }}</span>
          <span class="scr-pill" :data-tone="s.status === 'Built' ? 'safe' : s.status === 'Partial' ? 'accent' : undefined">{{ s.status }}</span>
          <span class="scr-spacer"></span>
          <span class="scr-micro scr-muted">{{ s.issue }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrMap from '@/components/screens/kit/ScrMap.vue'
const legend = [
  { label: 'Free', n: 27, color: '#e6f5ea' },
  { label: 'Assigned', n: 41, color: '#dce6f4' },
  { label: 'Resident', n: 96, color: '#cdb98b' },
  { label: 'Courtesy', n: 4, color: '#3a9e8f' },
  { label: 'Closed', n: 3, color: '#8e99af' },
]
const areas = [
  { label: 'Today', note: 'Run the current shift from one place.', screens: [
    { label: 'Arrivals', status: 'Built', issue: 'DEV-434 · phase 1' },
    { label: 'Departures', status: 'Partial', issue: 'DEV-434 · phase 1' },
    { label: 'Expected late', status: 'Not built', issue: 'no issue · phase 2' },
    { label: 'Handover', status: 'Not built', issue: 'no issue · phase 4' },
  ] },
  { label: 'Planning & berths', note: 'Allocate capacity over time.', screens: [
    { label: 'Berth map', status: 'Built', issue: 'DEV-433 · phase 1' },
    { label: 'Occupancy calendar', status: 'Not built', issue: 'no issue · phase 2' },
    { label: 'Reservation board', status: 'Not built', issue: 'no issue · phase 2' },
    { label: 'Closures', status: 'Built', issue: 'DEV-433 · phase 1' },
  ] },
  { label: 'Bookings & contracts', note: 'Manage what the customer has committed to.', screens: [
    { label: 'Transient stays', status: 'Built', issue: 'DEV-434 · phase 1' },
    { label: 'Residents', status: 'Built', issue: 'DEV-435 · phase 1' },
    { label: 'Agreements', status: 'Partial', issue: 'DEV-468 · phase 2' },
    { label: 'Quotations', status: 'Not built', issue: 'no issue · phase 3' },
  ] },
  { label: 'Finance', note: "Collect and account for the marina's own money, not the platform subscription.", screens: [
    { label: 'Folios', status: 'Not built', issue: 'no issue · phase 3' },
    { label: 'Invoices', status: 'Not built', issue: 'no issue · phase 3' },
    { label: 'Deposits', status: 'Not built', issue: 'no issue · phase 3' },
    { label: 'Reconciliation', status: 'Not built', issue: 'no issue · phase 4' },
  ] },
]
</script>

<style scoped>
.pms-legend { gap: 6px; }
.pms-legend i { display: inline-block; width: 10px; height: 10px; border-radius: 3px; border: 1px solid rgba(24, 32, 54, 0.25); }
.pms-row { padding: 6px 0; font-size: 12.5px; }
.pms-row + .pms-row { border-top: 1px solid var(--ink-100); }
</style>
