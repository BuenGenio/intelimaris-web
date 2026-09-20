<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Utilities recovery</h1>
        <p class="scr-sub">Used, recharged, and the readings nobody took.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-chip">Sep 2026</span>
        <button type="button" class="scr-btn scr-btn--ghost">Meters</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Bought from the grid</span><span class="scr-stat-value">48,600<small>kWh</small></span><span class="scr-stat-delta">FPL invoice · $6,318</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Metered to berths</span><span class="scr-stat-value">41,280<small>kWh</small></span><span class="scr-stat-delta" data-tone="safe">85% of bought</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Recharged</span><span class="scr-stat-value">$9,912</span><span class="scr-stat-delta" data-tone="safe">margin $3,594 before site load</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Not read</span><span class="scr-stat-value">6<small>meters</small></span><span class="scr-stat-delta" data-tone="danger">about 1,900 kWh unrecovered</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">Bought against recharged, by month</p>
        <p class="scr-sub scr-small" style="margin-bottom: 8px">Tall bars are kWh bought; the coloured share is what reached a folio.</p>
        <div class="ur-chart">
          <div v-for="m in months" :key="m.name" class="ur-col"><div class="ur-bar" :style="{ height: `${m.bought}%` }"><i :style="{ height: `${(m.recharged / m.bought) * 100}%` }"></i></div><span class="scr-micro scr-muted">{{ m.name }}</span></div>
        </div>
      </div>
      <div class="scr-card">
        <p class="scr-card-title">Recovery by dock</p>
        <div class="scr-bars">
          <div v-for="d in docks" :key="d.name"><span>{{ d.name }}</span><div class="scr-progress"><i :style="{ width: `${d.pct}%` }"></i></div><span class="scr-num">{{ d.pct }}%</span></div>
        </div>
        <p class="scr-micro scr-muted" style="margin-top: 10px">C dock is low because six meters were not read; the site load (lights, pumps, office) is about 9%.</p>
      </div>
    </div>

    <div class="scr-card" style="margin-top: 14px">
      <p class="scr-card-title">Readings nobody took</p>
      <table class="scr-table">
        <thead><tr><th>Meter</th><th>Berth · vessel</th><th>Last read</th><th class="scr-num">Typical month</th><th class="scr-num">Likely unrecovered</th><th>Assign</th></tr></thead>
        <tbody>
          <tr v-for="m in unread" :key="m.meter">
            <td class="scr-strong scr-num">{{ m.meter }}</td><td>{{ m.berth }}</td><td class="scr-muted">{{ m.last }}</td><td class="scr-num">{{ m.typical }}</td><td class="scr-num scr-accent">{{ m.lost }}</td><td><button type="button" class="scr-btn scr-btn--sm">Add to a walk</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
const months = [
  { name: 'Apr', bought: 62, recharged: 50 }, { name: 'May', bought: 70, recharged: 58 }, { name: 'Jun', bought: 88, recharged: 74 },
  { name: 'Jul', bought: 100, recharged: 86 }, { name: 'Aug', bought: 96, recharged: 84 }, { name: 'Sep', bought: 81, recharged: 69 },
]
const docks = [
  { name: 'A dock', pct: 93 }, { name: 'B dock', pct: 90 }, { name: 'C dock', pct: 71 }, { name: 'D dock', pct: 88 }, { name: 'Fuel dock', pct: 100 },
]
const unread = [
  { meter: 'C-12-P', berth: 'C-12 · unassigned', last: 'sounded 34 d ago', typical: '210 kWh', lost: '$50', },
  { meter: 'C-08-W', berth: 'C-08 · Tern', last: 'sounded 41 d ago', typical: '3.1 kgal', lost: '$28' },
  { meter: 'C-03-P', berth: 'C-03 · Sandpiper', last: 'sounded 34 d ago', typical: '640 kWh', lost: '$154' },
  { meter: 'C-19-P', berth: 'C-19 · Pelican', last: 'sounded 63 d ago', typical: '520 kWh', lost: '$250' },
]
</script>

<style scoped>
.ur-chart { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 8px; align-items: end; height: 120px; }
.ur-col { display: grid; grid-template-rows: minmax(0, 1fr) auto; height: 100%; text-align: center; gap: 4px; }
.ur-bar { align-self: end; display: flex; align-items: flex-end; border-radius: 3px 3px 0 0; background: var(--ink-200); overflow: hidden; }
.ur-bar i { display: block; width: 100%; background: var(--scr-accent); }
</style>
