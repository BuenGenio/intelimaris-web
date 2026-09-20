<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Receipts</h1>
        <p class="scr-sub">Payments taken, and which invoice each one settles.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Take a payment</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Taken today</span><span class="scr-stat-value">$2,914</span><span class="scr-stat-delta">6 receipts</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Card</span><span class="scr-stat-value">$2,204</span><span class="scr-stat-delta">terminal and online</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Cash</span><span class="scr-stat-value">$310</span><span class="scr-stat-delta" data-tone="warn">drawer not yet counted</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Unallocated</span><span class="scr-stat-value">$400</span><span class="scr-stat-delta" data-tone="warn">1 receipt with no invoice</span></div>
    </div>

    <div class="scr-split scr-section">
      <div>
        <div class="scr-toolbar">
          <input class="scr-input scr-input--search" style="max-width: 260px" placeholder="Receipt, customer or invoice" aria-label="Search receipts" />
          <span class="scr-chip is-on">Today</span><span class="scr-chip">This week</span><span class="scr-chip">Unallocated</span>
        </div>
        <table class="scr-table">
          <thead><tr><th>Receipt</th><th>Customer</th><th>Method</th><th>Settles</th><th class="scr-num">Amount</th></tr></thead>
          <tbody>
            <tr v-for="r in receipts" :key="r.no" :class="{ 'is-selected': r.no === 'RCP-3391' }">
              <td class="scr-num scr-strong">{{ r.no }}<span class="scr-item-sub">{{ r.when }}</span></td>
              <td>{{ r.customer }}</td>
              <td>{{ r.method }}</td>
              <td><span v-if="r.settles" class="scr-num">{{ r.settles }}</span><span v-else class="scr-pill" data-tone="warn">Unallocated</span></td>
              <td class="scr-num scr-strong">{{ r.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">RCP-3391</p><span class="scr-pill" data-tone="safe">Settled</span></div>
        <p class="scr-micro scr-muted">Sam Miller · 12 Oct 2026 10:04 · taken by Dockmaster at the office terminal</p>
        <div class="scr-divider"></div>
        <dl>
          <div class="scr-kv"><dt>Method</dt><dd>Visa ···4242 · contactless</dd></div>
          <div class="scr-kv"><dt>Provider reference</dt><dd class="scr-num">pi_3S7kQ2…9f</dd></div>
          <div class="scr-kv"><dt>Amount</dt><dd class="scr-num">$486.20</dd></div>
          <div class="scr-kv"><dt>Provider fee</dt><dd class="scr-num scr-muted">$14.40</dd></div>
          <div class="scr-kv"><dt>Settles</dt><dd class="scr-num">INV-2026-0418 · in full</dd></div>
          <div class="scr-kv"><dt>Receipt sent</dt><dd>sam@example.com · opened</dd></div>
        </dl>
        <div class="scr-row" style="margin-top: 12px">
          <button type="button" class="scr-btn scr-btn--sm">Resend receipt</button>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Open the invoice</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const receipts = [
  { no: 'RCP-3394', when: '14 Oct 15:22', customer: 'Priya Natarajan', method: 'Card · online', settles: 'INV-2026-0415', amount: '$1,904.00' },
  { no: 'RCP-3393', when: '14 Oct 12:40', customer: 'Ana Ruiz Charters LLC', method: 'Bank transfer', settles: 'INV-2026-0416 · part', amount: '$1,770.00' },
  { no: 'RCP-3392', when: '14 Oct 09:15', customer: 'Walk-in · fuel dock', method: 'Cash', settles: '', amount: '$400.00' },
  { no: 'RCP-3391', when: '12 Oct 10:04', customer: 'Sam Miller', method: 'Card · terminal', settles: 'INV-2026-0418', amount: '$486.20' },
  { no: 'RCP-3390', when: '11 Oct 17:50', customer: 'Coconuts', method: 'Cash', settles: 'INV-2026-0411 · part', amount: '$310.00' },
  { no: 'RCP-3389', when: '10 Oct 08:30', customer: 'Blue Water Yacht Management', method: 'Card · online', settles: 'INV-2026-0410', amount: '$2,150.00' },
]
</script>
