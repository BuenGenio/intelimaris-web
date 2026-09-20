<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Deposits</h1>
        <p class="scr-sub">Held, applied and refunded — a liability, not revenue.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Take a deposit</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Held now</span><span class="scr-stat-value">$41,600</span><span class="scr-stat-delta">38 deposits · shown as a liability</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Applied in October</span><span class="scr-stat-value">$6,850</span><span class="scr-stat-delta">against 19 folios</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Refunded in October</span><span class="scr-stat-value">$1,200</span><span class="scr-stat-delta">3 refunds</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Due back</span><span class="scr-stat-value">$800</span><span class="scr-stat-delta" data-tone="warn">2 departed without release</span></div>
    </div>

    <div class="scr-section">
      <div class="scr-toolbar">
        <div class="scr-tabs" style="max-width: 360px">
          <button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button>
        </div>
        <span class="scr-spacer"></span>
        <input class="scr-input scr-input--search" style="max-width: 240px" placeholder="Customer or vessel" aria-label="Search deposits" />
      </div>
      <table class="scr-table">
        <thead><tr><th>Customer</th><th>For</th><th>Taken</th><th>Status</th><th class="scr-num">Held</th><th class="scr-num">Applied</th><th></th></tr></thead>
        <tbody>
          <tr v-for="d in shown" :key="d.customer + d.taken">
            <td class="scr-strong">{{ d.customer }}<span class="scr-item-sub">{{ d.vessel }}</span></td>
            <td>{{ d.for }}</td>
            <td class="scr-num scr-muted">{{ d.taken }}</td>
            <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
            <td class="scr-num">{{ d.held }}</td>
            <td class="scr-num scr-muted">{{ d.applied }}</td>
            <td><button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">{{ d.action }}</button></td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">A deposit sits on the balance sheet until it is applied to a folio or refunded; it never becomes revenue by waiting.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const tabs = ['Held', 'Applied', 'Refunded']
const tab = ref('Held')
const deposits = [
  { customer: 'Sam Miller', vessel: 'Wanderer', for: 'Stay 16–19 Oct · C-14', taken: '3 Oct', status: 'Held', tone: 'info', held: '$200.00', applied: '—', action: 'Apply' },
  { customer: 'Blue Water Yacht Management', vessel: 'Halcyon', for: 'Annual slip · A-03', taken: '1 Sep', status: 'Held', tone: 'info', held: '$5,000.00', applied: '—', action: 'Apply' },
  { customer: 'Ana Ruiz Charters LLC', vessel: 'Salt & Light', for: 'Annual slip · C-11', taken: '12 Jan', status: 'Held', tone: 'info', held: '$3,500.00', applied: '—', action: 'Apply' },
  { customer: 'Tom Okafor', vessel: 'Osprey', for: 'Stay 1–4 Oct · B-07', taken: '28 Sep', status: 'Due back', tone: 'warn', held: '$300.00', applied: '—', action: 'Refund' },
  { customer: 'Priya Natarajan', vessel: 'Tidewater', for: 'Stay 24–30 Sep · D-02', taken: '15 Sep', status: 'Applied', tone: 'safe', held: '—', applied: '$500.00', action: 'View' },
  { customer: 'Coconuts', vessel: 'Dock and dine', for: 'Key deposit · T-01', taken: '2 Aug', status: 'Refunded', tone: 'offline', held: '—', applied: '—', action: 'View' },
]
const shown = computed(() => deposits.filter((d) => (tab.value === 'Held' ? d.status === 'Held' || d.status === 'Due back' : d.status === tab.value)))
</script>
