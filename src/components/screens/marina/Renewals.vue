<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Renewals</h1>
        <p class="scr-sub">Due, proposed, accepted, declined, with the uplift. Each one lives on the resident it belongs to.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Partial</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Residents</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Due in 90 days</span><span class="scr-stat-value">14</span><span class="scr-stat-delta" data-tone="warn">terms ending by 12 Jan</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Proposed</span><span class="scr-stat-value">6</span><span class="scr-stat-delta">drafts sent, unsigned</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Accepted · Oct</span><span class="scr-stat-value">5</span><span class="scr-stat-delta" data-tone="safe">avg uplift 4.1%</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Declined · Oct</span><span class="scr-stat-value">1</span><span class="scr-stat-delta">berth D-5 frees 30 Nov</span></div>
    </div>

    <div class="scr-tabs scr-tabs--line scr-section" style="margin-bottom: 10px">
      <button v-for="t in tabs" :key="t" class="scr-tab" :class="{ 'is-on': t === tab }" @click="tab = t">{{ t }}</button>
    </div>

    <div class="scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Berth</th><th>Resident</th><th>Term ends</th><th class="scr-num">Now</th><th class="scr-num">Proposed</th><th>Uplift</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr v-for="r in shown" :key="r.berth">
            <td class="scr-num scr-strong">{{ r.berth }}</td>
            <td><span class="scr-strong" style="color: #4274bb">{{ r.vessel }}</span><br /><span class="scr-small scr-muted">{{ r.who }}</span></td>
            <td class="scr-num">{{ r.ends }}</td>
            <td class="scr-num">{{ r.now }}</td>
            <td class="scr-num">{{ r.proposed }}</td>
            <td class="scr-num scr-small">{{ r.uplift }}</td>
            <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
            <td><button class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': r.status === 'Due' }">{{ r.status === 'Due' ? 'Propose' : 'Open' }}</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const tabs = ['All', 'Due', 'Proposed', 'Accepted', 'Declined']
const tab = ref('All')
const rows = [
  { berth: 'C-14', vessel: 'Wanderer', who: 'Sam Miller', ends: '2027-04-30', now: '$1,260 / mo', proposed: '$1,310 / mo', uplift: '+4.0%', status: 'Proposed', tone: 'warn' },
  { berth: 'A-12', vessel: 'Serenity', who: 'K. Brandt', ends: '2026-12-31', now: '$1,560 / mo', proposed: '$1,625 / mo', uplift: '+4.2%', status: 'Accepted', tone: 'safe' },
  { berth: 'B-2', vessel: 'Galatea', who: 'M. Rossi', ends: '2027-03-31', now: '$1,320 / mo', proposed: '—', uplift: '—', status: 'Due', tone: 'info' },
  { berth: 'D-5', vessel: 'Osprey II', who: 'L. Ferreira', ends: '2026-11-30', now: '$1,800 / mo', proposed: '$1,890 / mo', uplift: '+5.0%', status: 'Declined', tone: 'danger' },
  { berth: 'E-1', vessel: 'Reef Runner', who: 'Coconuts charters', ends: '2026-12-31', now: '$1,020 / mo', proposed: '$1,060 / mo', uplift: '+3.9%', status: 'Proposed', tone: 'warn' },
  { berth: 'C-11', vessel: 'Windward', who: 'T. Nakamura', ends: 'open-ended', now: '$1,140 / mo', proposed: '—', uplift: '—', status: 'Due', tone: 'info' },
]
const shown = computed(() => (tab.value === 'All' ? rows : rows.filter((r) => r.status === tab.value)))
</script>
