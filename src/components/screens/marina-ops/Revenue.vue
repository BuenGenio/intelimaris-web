<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Revenue</h1>
        <p class="scr-sub">Realised, booked, invoiced and collected, named separately.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-chip">Sep 2026</span>
        <button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="download" /> Export</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Realised</span><span class="scr-stat-value">$212,480</span><span class="scr-stat-delta" data-tone="safe">+6.1% on Aug · nights actually slept</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Booked</span><span class="scr-stat-value">$248,900</span><span class="scr-stat-delta">confirmed, some still to come</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Invoiced</span><span class="scr-stat-value">$204,115</span><span class="scr-stat-delta" data-tone="warn">$8,365 realised, not yet invoiced</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Collected</span><span class="scr-stat-value">$181,730</span><span class="scr-stat-delta" data-tone="danger">$22,385 outstanding</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Realised by day</p>
        <p class="scr-sub scr-small" style="margin-bottom: 8px">Each bar is one night's revenue from berths, power and services; the FLIBS run-up starts in the last week.</p>
        <div class="scr-sparkline" style="height: 90px"><i v-for="(v, i) in days" :key="i" :style="{ height: `${v}%` }"></i></div>
        <div class="scr-row scr-row--between scr-micro scr-muted scr-num" style="margin-top: 4px"><span>1 Sep</span><span>15 Sep</span><span>30 Sep</span></div>
      </div>
      <div class="scr-card">
        <p class="scr-card-title">By line</p>
        <div class="scr-bars">
          <div v-for="l in lines" :key="l.name"><span>{{ l.name }}</span><div class="scr-progress"><i :style="{ width: `${l.pct}%` }"></i></div><span class="scr-num">{{ l.pct }}%</span></div>
        </div>
      </div>
    </div>

    <table class="scr-table" style="margin-top: 14px">
      <thead><tr><th>Line</th><th class="scr-num">Realised</th><th class="scr-num">Booked</th><th class="scr-num">Invoiced</th><th class="scr-num">Collected</th><th class="scr-num">vs Aug</th></tr></thead>
      <tbody>
        <tr v-for="l in lines" :key="l.name">
          <td class="scr-strong">{{ l.name }}</td><td class="scr-num">{{ l.realised }}</td><td class="scr-num">{{ l.booked }}</td><td class="scr-num">{{ l.invoiced }}</td><td class="scr-num">{{ l.collected }}</td><td class="scr-num" :class="l.up ? 'scr-accent' : 'scr-muted'">{{ l.delta }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const days = [52, 55, 50, 58, 61, 57, 54, 60, 63, 59, 62, 66, 64, 61, 68, 70, 67, 72, 69, 74, 71, 78, 80, 84, 88, 91, 95, 97, 100, 96]
const lines = [
  { name: 'Resident berths', pct: 58, realised: '$123,240', booked: '$123,240', invoiced: '$123,240', collected: '$112,900', delta: '+0.4%', up: true },
  { name: 'Transient nights', pct: 27, realised: '$57,370', booked: '$88,600', invoiced: '$52,110', collected: '$48,220', delta: '+19.2%', up: true },
  { name: 'Power recharge', pct: 9, realised: '$19,120', booked: '$19,120', invoiced: '$16,015', collected: '$14,360', delta: '+3.0%', up: true },
  { name: 'Services and lifts', pct: 4, realised: '$8,500', booked: '$13,700', invoiced: '$8,500', collected: '$4,000', delta: '-8.5%', up: false },
  { name: 'Fuel margin', pct: 2, realised: '$4,250', booked: '$4,250', invoiced: '$4,250', collected: '$2,250', delta: '+1.1%', up: true },
]
</script>
