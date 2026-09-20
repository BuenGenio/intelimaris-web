<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Work profitability</h1>
        <p class="scr-sub">Labour, parts and service revenue against each other.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="warn">Scaffold</span>
        <span class="scr-chip">Q3 2026</span>
        <button type="button" class="scr-btn scr-btn--ghost">Work orders</button>
      </div>
    </div>

    <div class="scr-kpis" style="margin-bottom: 14px">
      <div class="scr-stat"><span class="scr-stat-label">Service revenue</span><span class="scr-stat-value">$38,420</span><span class="scr-stat-delta">61 orders invoiced</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Labour cost</span><span class="scr-stat-value">$17,910</span><span class="scr-stat-delta">239 h at $75</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Parts cost</span><span class="scr-stat-value">$9,640</span><span class="scr-stat-delta" data-tone="warn">$1,120 unbilled</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Margin</span><span class="scr-stat-value">28<small>%</small></span><span class="scr-stat-delta" data-tone="safe">$10,870 · up from 24%</span></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <p class="scr-card-title">By kind of work</p>
        <table class="scr-table">
          <thead><tr><th>Kind</th><th class="scr-num">Orders</th><th class="scr-num">Revenue</th><th class="scr-num">Labour</th><th class="scr-num">Parts</th><th class="scr-num">Margin</th></tr></thead>
          <tbody>
            <tr v-for="k in kinds" :key="k.name">
              <td class="scr-strong">{{ k.name }}</td><td class="scr-num">{{ k.orders }}</td><td class="scr-num">{{ k.revenue }}</td><td class="scr-num scr-muted">{{ k.labour }}</td><td class="scr-num scr-muted">{{ k.parts }}</td><td class="scr-num"><span class="scr-pill scr-pill--bare" :data-tone="k.tone">{{ k.margin }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Margin by month</p>
          <div class="scr-sparkline" style="height: 64px"><i v-for="(v, i) in trend" :key="i" :style="{ height: `${v}%` }"></i></div>
          <div class="scr-row scr-row--between scr-micro scr-muted" style="margin-top: 4px"><span>Jan</span><span>May</span><span>Sep</span></div>
        </div>
        <div class="scr-card scr-card--accent">
          <p class="scr-card-title">Where money leaks</p>
          <div class="scr-bars">
            <div><span>Estimate overrun</span><div class="scr-progress"><i style="width: 64%"></i></div><span class="scr-num">$2,140</span></div>
            <div><span>Parts unbilled</span><div class="scr-progress"><i style="width: 34%"></i></div><span class="scr-num">$1,120</span></div>
            <div><span>Done, not invoiced</span><div class="scr-progress"><i style="width: 100%"></i></div><span class="scr-num">$3,518</span></div>
          </div>
          <p class="scr-micro scr-muted" style="margin-top: 8px">WO-1037 (piling repair, $3,180) has been done for nine days and is still not invoiced.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const kinds = [
  { name: 'Electrical', orders: 18, revenue: '$9,860', labour: '$4,650', parts: '$2,210', margin: '30%', tone: 'safe' },
  { name: 'Pontoon and piling', orders: 6, revenue: '$11,400', labour: '$5,100', parts: '$3,900', margin: '21%', tone: 'warn' },
  { name: 'Plumbing and pump-out', orders: 11, revenue: '$4,720', labour: '$2,850', parts: '$1,180', margin: '15%', tone: 'warn' },
  { name: 'Lifts and moves', orders: 14, revenue: '$8,900', labour: '$3,300', parts: '$410', margin: '58%', tone: 'safe' },
  { name: 'Safety equipment', orders: 12, revenue: '$3,540', labour: '$2,010', parts: '$1,940', margin: '-12%', tone: 'danger' },
]
const trend = [55, 50, 58, 62, 60, 66, 70, 74, 78]
</script>
