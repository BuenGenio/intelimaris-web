<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Invoices</h1>
        <p class="scr-sub">Issued documents, numbered per billing entity.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="download" /> Export</button><button type="button" class="scr-btn scr-btn--primary">New invoice</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Issued in October</span><span class="scr-stat-value">142</span><span class="scr-stat-delta">$96,310 in total</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Outstanding</span><span class="scr-stat-value">$21,480</span><span class="scr-stat-delta">31 invoices</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Overdue</span><span class="scr-stat-value">$6,120</span><span class="scr-stat-delta" data-tone="danger">9 invoices past 30 days</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Next number</span><span class="scr-stat-value scr-num" style="font-size: 16px">INV-2026-0419</span><span class="scr-stat-delta">Bahia Mar Marina LLC</span></div>
    </div>

    <div class="scr-section">
      <div class="scr-toolbar">
        <input class="scr-input scr-input--search" style="max-width: 280px" placeholder="Number, customer or vessel" aria-label="Search invoices" />
        <span class="scr-chip is-on">All</span><span class="scr-chip">Unpaid</span><span class="scr-chip">Overdue</span><span class="scr-chip">Paid</span><span class="scr-chip">Void</span>
        <span class="scr-spacer"></span>
        <span class="scr-chip"><ScrIcon name="calendar" /> October 2026</span>
      </div>
      <table class="scr-table">
        <thead><tr><th>Number</th><th>Customer</th><th>Issued</th><th>Due</th><th>Status</th><th class="scr-num">Total</th><th class="scr-num">Open</th></tr></thead>
        <tbody>
          <tr v-for="i in invoices" :key="i.no">
            <td class="scr-num scr-strong">{{ i.no }}</td>
            <td>{{ i.customer }}<span class="scr-item-sub">{{ i.detail }}</span></td>
            <td class="scr-num scr-muted">{{ i.issued }}</td>
            <td class="scr-num scr-muted">{{ i.due }}</td>
            <td><span class="scr-pill" :data-tone="i.tone">{{ i.status }}</span></td>
            <td class="scr-num">{{ i.total }}</td>
            <td class="scr-num" :class="i.open === '$0.00' ? 'scr-muted' : 'scr-strong'">{{ i.open }}</td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">An issued invoice is never edited; a correction is a credit note against it. Numbers run per billing entity and never skip.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const invoices = [
  { no: 'INV-2026-0418', customer: 'Sam Miller', detail: 'Wanderer · C-14 · 9–12 Oct', issued: '12 Oct', due: '12 Oct', status: 'Paid', tone: 'safe', total: '$486.20', open: '$0.00' },
  { no: 'INV-2026-0417', customer: 'Blue Water Yacht Management', detail: 'Halcyon · A-03 · September', issued: '10 Oct', due: '9 Nov', status: 'Issued', tone: 'info', total: '$8,640.00', open: '$8,640.00' },
  { no: 'INV-2026-0416', customer: 'Ana Ruiz Charters LLC', detail: 'Salt & Light · C-11 · Q4 slip', issued: '8 Oct', due: '22 Oct', status: 'Part paid', tone: 'warn', total: '$3,540.00', open: '$1,770.00' },
  { no: 'INV-2026-0412', customer: 'Tom Okafor', detail: 'Osprey · B-07 · 1–4 Oct', issued: '4 Oct', due: '4 Oct', status: 'Overdue', tone: 'danger', total: '$486.00', open: '$486.00' },
  { no: 'INV-2026-0411', customer: 'Coconuts', detail: 'Dock and dine · T-01 · September', issued: '1 Oct', due: '31 Oct', status: 'Issued', tone: 'info', total: '$640.00', open: '$640.00' },
  { no: 'INV-2026-0409', customer: 'Priya Natarajan', detail: 'Tidewater · D-02 · 24–30 Sep', issued: '30 Sep', due: '30 Sep', status: 'Paid', tone: 'safe', total: '$1,428.00', open: '$0.00' },
  { no: 'INV-2026-0403', customer: 'Sam Miller', detail: 'Wanderer · duplicate of 0404', issued: '24 Sep', due: '—', status: 'Void', tone: 'offline', total: '$0.00', open: '$0.00' },
]
</script>
