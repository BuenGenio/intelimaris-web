<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Utilities and meters</h1>
        <p class="scr-sub">The meter register, its readings, and the charge they justify.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill" data-tone="high">6 unread this cycle</span>
        <button type="button" class="scr-btn scr-btn--primary">Enter readings</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Meters on register</span><span class="scr-stat-value">168</span><span class="scr-stat-delta">164 power · 4 water</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Read this cycle</span><span class="scr-stat-value">162<small>/ 168</small></span><span class="scr-stat-delta" data-tone="warn">6 nobody took</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Power used · Sep</span><span class="scr-stat-value">41,280<small>kWh</small></span><span class="scr-stat-delta">from readings, not estimates</span></div>
      <div class="scr-stat"><span class="scr-stat-label">To recharge</span><span class="scr-stat-value">$9,912</span><span class="scr-stat-delta" data-tone="safe">at $0.24 / kWh</span></div>
    </div>

    <div class="scr-toolbar">
      <div class="scr-tabs" style="max-width: 300px"><button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button></div>
      <span class="scr-spacer"></span>
      <span class="scr-chip">Cycle: Sep 2026</span>
      <span class="scr-chip">Dock: C</span>
    </div>

    <table class="scr-table">
      <thead><tr><th>Meter</th><th>Berth · vessel</th><th class="scr-num">Previous</th><th class="scr-num">Current</th><th class="scr-num">Used</th><th class="scr-num">Charge</th><th>Read</th></tr></thead>
      <tbody>
        <tr v-for="m in shown" :key="m.meter">
          <td><span class="scr-strong scr-num">{{ m.meter }}</span><span class="scr-item-sub">{{ m.kind }}</span></td>
          <td>{{ m.berth }} <span class="scr-muted">· {{ m.vessel }}</span></td>
          <td class="scr-num scr-muted">{{ m.prev }}</td>
          <td class="scr-num">{{ m.cur || '—' }}</td>
          <td class="scr-num">{{ m.used || '—' }}</td>
          <td class="scr-num">{{ m.charge || '—' }}</td>
          <td><span class="scr-pill" :data-tone="m.cur ? 'safe' : 'high'">{{ m.cur ? m.read : 'Not read' }}</span></td>
        </tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted" style="margin-top: 8px">A meter with no current reading raises no charge. It is listed, not estimated.</p>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const tabs = ['All', 'Unread', 'Read']
const tab = ref('All')
const rows = [
  { meter: 'C-14-P', kind: 'Power · 50 A', berth: 'C-14', vessel: 'Wanderer', prev: '12,480', cur: '12,791', used: '311 kWh', charge: '$74.64', read: 'sounded 3 d ago' },
  { meter: 'C-13-P', kind: 'Power · 50 A', berth: 'C-13', vessel: 'Marlin II', prev: '8,902', cur: '9,410', used: '508 kWh', charge: '$121.92', read: 'today' },
  { meter: 'C-12-P', kind: 'Power · 30 A', berth: 'C-12', vessel: 'Unassigned', prev: '4,115', cur: '', used: '', charge: '', read: '' },
  { meter: 'C-11-P', kind: 'Power · 50 A', berth: 'C-11', vessel: 'Osprey', prev: '22,004', cur: '22,388', used: '384 kWh', charge: '$92.16', read: 'today' },
  { meter: 'C-08-W', kind: 'Water', berth: 'C-08', vessel: 'Tern', prev: '1,204', cur: '', used: '', charge: '', read: '' },
  { meter: 'C-05-P', kind: 'Power · 100 A', berth: 'C-05', vessel: 'Halcyon', prev: '31,770', cur: '33,102', used: '1,332 kWh', charge: '$319.68', read: 'yesterday' },
  { meter: 'C-02-P', kind: 'Power · 30 A', berth: 'C-02', vessel: 'Blue Heron', prev: '6,450', cur: '6,512', used: '62 kWh', charge: '$14.88', read: 'yesterday' },
]
const shown = computed(() => (tab.value === 'All' ? rows : rows.filter((r) => Boolean(r.cur) === (tab.value === 'Read'))))
</script>
