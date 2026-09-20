<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Portfolio comparison</h1>
        <p class="scr-sub">Across the sites this person is actually authorised to see.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">3 of 4 sites visible to you</span>
        <span class="scr-chip">Sep 2026</span>
      </div>
    </div>

    <div class="scr-alert" style="margin-bottom: 14px"><ScrIcon name="lock" /><div><strong>One site is not shown</strong>Your account holds a fourth marina you have no role on. Its figures are left out of every total here rather than shown blank.</div></div>

    <div class="scr-tabs scr-tabs--line" style="margin-bottom: 12px">
      <button v-for="m in metrics" :key="m" type="button" class="scr-tab" :class="{ 'is-on': metric === m }" @click="metric = m">{{ m }}</button>
    </div>

    <div class="scr-split">
      <table class="scr-table">
        <thead><tr><th>Site</th><th class="scr-num">Berths</th><th class="scr-num">Occupancy</th><th class="scr-num">Realised</th><th class="scr-num">RevPAB</th><th class="scr-num">Debt &gt; 30 d</th><th class="scr-num">Open incidents</th></tr></thead>
        <tbody>
          <tr v-for="s in sites" :key="s.name" :class="{ 'is-selected': s.name === 'Bahia Mar' }">
            <td><span class="scr-strong">{{ s.name }}</span><span class="scr-item-sub">{{ s.where }}</span></td>
            <td class="scr-num">{{ s.berths }}</td><td class="scr-num">{{ s.occ }}%</td><td class="scr-num">{{ s.realised }}</td><td class="scr-num">{{ s.revpab }}</td><td class="scr-num" :class="{ 'scr-accent': s.debtHigh }">{{ s.debt }}</td><td class="scr-num">{{ s.incidents }}</td>
          </tr>
          <tr><td class="scr-strong">3 sites</td><td class="scr-num scr-strong">508</td><td class="scr-num scr-strong">81%</td><td class="scr-num scr-strong">$439,110</td><td class="scr-num scr-strong">$864</td><td class="scr-num scr-strong">$14,905</td><td class="scr-num scr-strong">6</td></tr>
        </tbody>
      </table>
      <div class="scr-card">
        <p class="scr-card-title">{{ metric }} by site</p>
        <div class="scr-bars">
          <div v-for="s in sites" :key="s.name"><span>{{ s.name }}</span><div class="scr-progress"><i :style="{ width: `${bar(s)}%` }"></i></div><span class="scr-num">{{ value(s) }}</span></div>
        </div>
        <p class="scr-micro scr-muted" style="margin-top: 10px">RevPAB is realised revenue per available berth for the month. Occupancy is physical, not reserved.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

type Site = { name: string; where: string; berths: number; occ: number; realised: string; revpab: string; debt: string; debtHigh: boolean; incidents: number; n: Record<string, number> }
const metrics = ['Occupancy', 'RevPAB', 'Debt over 30 days']
const metric = ref('Occupancy')
const sites: Site[] = [
  { name: 'Bahia Mar', where: 'Fort Lauderdale', berths: 246, occ: 84, realised: '$212,480', revpab: '$864', debt: '$6,855', debtHigh: false, incidents: 3, n: { Occupancy: 84, RevPAB: 864, 'Debt over 30 days': 6855 } },
  { name: 'Pier 66 South', where: 'Fort Lauderdale', berths: 162, occ: 79, realised: '$151,900', revpab: '$938', debt: '$2,410', debtHigh: false, incidents: 1, n: { Occupancy: 79, RevPAB: 938, 'Debt over 30 days': 2410 } },
  { name: 'Dania Cut', where: 'Dania Beach', berths: 100, occ: 77, realised: '$74,730', revpab: '$747', debt: '$5,640', debtHigh: true, incidents: 2, n: { Occupancy: 77, RevPAB: 747, 'Debt over 30 days': 5640 } },
]
const max = (m: string) => Math.max(...sites.map((s) => s.n[m] ?? 0))
const bar = (s: Site) => ((s.n[metric.value] ?? 0) / max(metric.value)) * 100
const value = (s: Site) => (metric.value === 'Occupancy' ? `${s.occ}%` : metric.value === 'RevPAB' ? s.revpab : s.debt)
</script>
