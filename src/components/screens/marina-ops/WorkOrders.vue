<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Work orders</h1>
        <p class="scr-sub">Estimate, labour, parts, and the invoice at the end.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-pill">5 open · $4,310 estimated</span>
        <button type="button" class="scr-btn scr-btn--primary">Raise a work order</button>
      </div>
    </div>

    <div class="scr-split">
      <div>
        <div class="scr-tabs scr-tabs--line" style="margin-bottom: 10px">
          <button v-for="t in tabs" :key="t" type="button" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button>
        </div>
        <table class="scr-table">
          <thead><tr><th>Order</th><th>Asset</th><th>State</th><th class="scr-num">Estimate</th><th class="scr-num">Booked</th></tr></thead>
          <tbody>
            <tr v-for="w in shown" :key="w.id" :class="{ 'is-selected': w.id === 'WO-1042' }">
              <td><span class="scr-strong scr-num">{{ w.id }}</span><span class="scr-item-sub">{{ w.title }}</span></td>
              <td class="scr-muted">{{ w.asset }}</td>
              <td><span class="scr-pill" :data-tone="w.tone">{{ w.state }}</span></td>
              <td class="scr-num">${{ w.estimate }}</td>
              <td class="scr-num" :class="{ 'scr-accent': w.over }">${{ w.booked }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title scr-num">WO-1042 · Shore power at C-14</p><span class="scr-pill" data-tone="info">In progress</span></div>
        <p class="scr-sub scr-small">Raised 3 Oct by Rosa Delgado · assigned to Luis Ortega · blocks Wanderer's arrival at 14:30</p>
        <div class="scr-divider"></div>
        <p class="scr-ov">Labour</p>
        <dl class="scr-dl" style="margin: 6px 0 10px">
          <dt>Luis Ortega · diagnose</dt><dd class="scr-num">1.5 h · $112.50</dd>
          <dt>Luis Ortega · replace breaker</dt><dd class="scr-num">1.0 h · $75.00</dd>
        </dl>
        <p class="scr-ov">Parts</p>
        <dl class="scr-dl" style="margin: 6px 0 10px">
          <dt>50 A breaker, marine</dt><dd class="scr-num">1 × $148.00</dd>
          <dt>Receptacle gasket</dt><dd class="scr-num">1 × $14.20</dd>
        </dl>
        <div class="scr-kv"><span>Estimate</span><span class="scr-num">$320.00</span></div>
        <div class="scr-kv"><span>Booked so far</span><span class="scr-num scr-strong">$349.70</span></div>
        <div class="scr-kv"><span>Invoice</span><span class="scr-muted">Not yet — raised on close, to the marina's own account</span></div>
        <div class="scr-row" style="margin-top: 10px"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Add labour</button><button type="button" class="scr-btn scr-btn--sm">Add a part</button><button type="button" class="scr-btn scr-btn--ghost scr-btn--sm">Close and invoice</button></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

const tabs = ['Open', 'Closed', 'All']
const tab = ref('Open')
const rows = [
  { id: 'WO-1044', title: 'Anti-slip strip, B dock finger 3', asset: 'PON-B03', state: 'Estimating', tone: undefined, estimate: '180', booked: '0', over: false, open: true },
  { id: 'WO-1042', title: 'Shore power at C-14', asset: 'PED-C14', state: 'In progress', tone: 'info', estimate: '320', booked: '349.70', over: true, open: true },
  { id: 'WO-1039', title: 'Pump-out cart coupling', asset: 'PMP-D1', state: 'Waiting on parts', tone: 'warn', estimate: '260', booked: '75', over: false, open: true },
  { id: 'WO-1037', title: 'Piling repair, C-16', asset: 'PON-C16', state: 'Done, not invoiced', tone: 'safe', estimate: '3,200', booked: '3,180', over: false, open: true },
  { id: 'WO-1035', title: 'Replace life ring, C head', asset: 'SAF-C1', state: 'Done, not invoiced', tone: 'safe', estimate: '350', booked: '338', over: false, open: true },
  { id: 'WO-1031', title: 'Fuel dock hose swap', asset: 'FUEL-1', state: 'Invoiced', tone: 'offline', estimate: '410', booked: '410', over: false, open: false },
  { id: 'WO-1028', title: 'Gate keypad reset', asset: 'GATE-C', state: 'Invoiced', tone: 'offline', estimate: '90', booked: '90', over: false, open: false },
]
const shown = computed(() => (tab.value === 'All' ? rows : rows.filter((r) => r.open === (tab.value === 'Open'))))
</script>
