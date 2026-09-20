<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Deposits held</h1>
        <p class="scr-sub">The liability position, separate from revenue.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-chip">As at 4 Oct 2026</span>
        <button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="download" /> Export</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Held now</span><span class="scr-stat-value">$61,900</span><span class="scr-stat-delta">42 deposits · a liability, not revenue</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Taken · Sep</span><span class="scr-stat-value">$14,200</span><span class="scr-stat-delta" data-tone="safe">11 new</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Applied · Sep</span><span class="scr-stat-value">$6,750</span><span class="scr-stat-delta">against final folios</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Refunded · Sep</span><span class="scr-stat-value">$4,100</span><span class="scr-stat-delta" data-tone="warn">1 pending approval</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Held balance, last 12 months</p>
        <div class="scr-sparkline" style="height: 80px"><i v-for="(v, i) in months" :key="i" :style="{ height: `${v}%` }"></i></div>
        <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>Oct 25</span><span>Apr 26</span><span>Sep 26</span></div>
      </div>
      <div class="scr-card">
        <p class="scr-card-title">By kind</p>
        <div class="scr-bars">
          <div><span>Resident security</span><div class="scr-progress"><i style="width: 71%"></i></div><span class="scr-num">$44,000</span></div>
          <div><span>Transient booking</span><div class="scr-progress"><i style="width: 19%"></i></div><span class="scr-num">$11,900</span></div>
          <div><span>Lift and yard</span><div class="scr-progress"><i style="width: 7%"></i></div><span class="scr-num">$4,500</span></div>
          <div><span>Key and fob</span><div class="scr-progress"><i style="width: 3%"></i></div><span class="scr-num">$1,500</span></div>
        </div>
      </div>
    </div>

    <table class="scr-table" style="margin-top: 14px">
      <thead><tr><th>Customer</th><th>Against</th><th class="scr-num">Held</th><th>Taken</th><th>Releases when</th><th>State</th></tr></thead>
      <tbody>
        <tr v-for="d in rows" :key="d.who + d.against">
          <td class="scr-strong">{{ d.who }}</td><td class="scr-muted">{{ d.against }}</td><td class="scr-num">${{ d.held }}</td><td class="scr-num scr-muted">{{ d.taken }}</td><td>{{ d.when }}</td><td><span class="scr-pill" :data-tone="d.tone">{{ d.state }}</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const months = [70, 72, 75, 74, 78, 80, 77, 73, 70, 68, 76, 82]
const rows = [
  { who: 'Dana Whitfield', against: 'Halcyon · resident A-01, 2025–26', held: '6,000', taken: '1 Nov 2025', when: 'Contract end, 31 Oct 2026', state: 'Held', tone: 'info' },
  { who: 'Sam Miller', against: 'Wanderer · stay C-14, 4–7 Oct', held: '400', taken: '20 Sep 2026', when: 'Check-out, 7 Oct', state: 'Held', tone: 'info' },
  { who: 'Chris Park', against: 'Kestrel · lift 5 Oct', held: '1,500', taken: '30 Sep 2026', when: 'Launch complete', state: 'Held', tone: 'info' },
  { who: 'Mike Chen', against: 'Osprey · resident A-06, 2025–26', held: '4,000', taken: '1 Nov 2025', when: 'Renewed, rolls over', state: 'Rolling', tone: 'safe' },
  { who: 'Tern LLC', against: 'Tern · stay C-15, 28 Sep–3 Oct', held: '300', taken: '15 Sep 2026', when: 'Checked out 3 Oct', state: 'Refund pending', tone: 'warn' },
  { who: 'Ana Ruiz Charters LLC', against: 'Blue Heron · stay D-02', held: '350', taken: '1 Oct 2026', when: 'Applied to folio 2 Oct', state: 'Applied', tone: 'offline' },
]
</script>
