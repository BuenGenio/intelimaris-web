<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Fuel prices</h1><p class="scr-sub scr-small">Report what you paid at the pump. It sits beside the dock's price; it never changes it.</p></div>
      <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Map</button>
    </div>

    <section class="scr-section fu-first">
      <p class="scr-ov">Which dock</p>
      <p class="scr-small scr-muted fu-desc">Search by name or list the fuel docks around you. The report attaches to the dock's listing.</p>
      <label class="scr-field"><span class="scr-label">Fuel dock</span><span class="scr-input scr-input--search">Lauderdale Fuel</span><span class="scr-hint">Two characters and the directory is asked.</span></label>
      <div class="scr-row fu-near"><button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="pin" />Fuel docks near me</button></div>
      <div class="scr-list">
        <button v-for="d in DOCKS" :key="d[0]" type="button" class="scr-item" :class="{ 'fu-picked': d[3] }">
          <span class="scr-item-icon" :data-tone="d[3] ? 'accent' : ''"><ScrIcon name="fuel" /></span>
          <span><span class="scr-item-title">{{ d[0] }}</span><span class="scr-item-sub">{{ d[1] }}</span></span>
          <span class="scr-item-end"><span v-if="d[2]" class="scr-pill" data-tone="safe">Claimed</span></span>
        </button>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Published by Lauderdale Fuel Dock</p>
      <div class="scr-grid-2">
        <div v-for="p in PUBLISHED" :key="p[0]" class="scr-stat"><span class="scr-stat-label">{{ p[0] }}</span><span class="scr-stat-value">{{ p[1] }}<small>{{ p[2] }}</small></span><span class="scr-stat-delta" :data-tone="p[4]">{{ p[3] }}</span></div>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Report a price at Lauderdale Fuel Dock</p>
      <p class="scr-small scr-muted fu-desc">It goes up straight away as Reported, marked unverified, beside the dock's published price. It does not replace theirs. It expires unless someone else confirms it.</p>
      <div class="scr-card scr-stack scr-stack--tight">
        <label class="scr-field"><span class="scr-label">Grade</span><div class="scr-tabs"><button v-for="g in GRADES" :key="g" type="button" class="scr-tab" :class="{ 'is-on': g === grade }" @click="grade = g">{{ g }}</button></div></label>
        <label class="scr-field"><span class="scr-label">What you paid, per unit</span><span class="scr-input scr-num">4.29 <small class="scr-muted">USD per gallon</small></span><span class="scr-hint">In the unit the dock lists — the report carries the served unit and normalises nothing.</span></label>
        <label class="scr-field"><span class="scr-label">Note</span><span class="scr-input scr-muted">93 octane, cash price</span></label>
        <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Submit the report</button>
      </div>
    </section>

    <section class="scr-section">
      <p class="scr-ov">Already reported here</p>
      <p class="scr-small scr-muted fu-desc">Somebody else paid that too? Confirm it — that re-arms its clock. Your own you can clear.</p>
      <p class="scr-micro scr-muted fu-sum">Diesel: 3 reports · newest 2 h ago · Gasoline: 1 report · newest 26 h ago · unverified</p>
      <div class="scr-list">
        <div v-for="r in REPORTS" :key="r.at" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title scr-num">{{ r.price }} <span class="scr-muted scr-small">per gallon</span> <span class="scr-muted scr-small">· {{ r.grade }}</span> <span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></span>
            <span class="scr-item-sub">{{ r.at }}<span v-if="r.conf"> · confirmed {{ r.conf }}×</span><span v-if="r.note"> · {{ r.note }}</span></span>
          </span>
          <button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">{{ r.mine ? 'Clear my report' : 'I paid that too' }}</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const DOCKS: [string, string, boolean, boolean][] = [['Lauderdale Fuel Dock', 'Fuel dock · 0.6 NM · Fort Lauderdale', true, true], ['Bahia Mar fuel', 'Marina fuel · 0.4 NM', true, false], ['Hall of Fame Marina', 'Marina fuel · 0.9 NM', false, false]]
const PUBLISHED = [['Diesel', '4.19', '/gal', 'published 3 h ago', 'safe'], ['Gasoline 93', '4.89', '/gal', 'stale · 31 h ago', 'warn']]
const GRADES = ['Diesel', 'Gasoline', 'Gasoline 93']
const grade = ref('Gasoline 93')
const REPORTS = [
  { price: '4.29', grade: 'Diesel', status: 'confirmed', tone: 'info', at: '11 Oct 2026, 15:20', conf: 2, note: '', mine: false },
  { price: '4.35', grade: 'Diesel', status: 'reported', tone: '', at: '12 Oct 2026, 09:04', conf: 0, note: 'cash price', mine: true },
  { price: '4.19', grade: 'Diesel', status: 'expiring', tone: 'warn', at: '9 Oct 2026, 12:40', conf: 1, note: '', mine: false },
  { price: '4.79', grade: 'Gasoline', status: 'reported', tone: '', at: '11 Oct 2026, 08:15', conf: 0, note: '', mine: false },
]
</script>

<style scoped>
.fu-first { margin-top: 0; }
.fu-desc { margin-bottom: 8px; }
.fu-near { margin: 8px 0; }
.fu-picked { background: var(--wave-50); }
.fu-sum { margin-bottom: 8px; }
</style>
