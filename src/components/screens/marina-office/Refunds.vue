<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Refunds</h1>
        <p class="scr-sub">Approval thresholds, provider fees, and what the customer gets back.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Start a refund</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Awaiting approval</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="warn">$1,418 in total</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Refunded in October</span><span class="scr-stat-value">$2,640</span><span class="scr-stat-delta">11 refunds</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Fees not returned</span><span class="scr-stat-value">$78</span><span class="scr-stat-delta">provider keeps the card fee</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Reaching the customer</span><span class="scr-stat-value">5–10 <small>days</small></span><span class="scr-stat-delta">as the provider states</span></div>
    </div>

    <div class="scr-split scr-section">
      <table class="scr-table">
        <thead><tr><th>Customer</th><th>From</th><th>Reason</th><th>Status</th><th class="scr-num">Amount</th></tr></thead>
        <tbody>
          <tr v-for="r in refunds" :key="r.customer + r.from" :class="{ 'is-selected': r.selected }">
            <td class="scr-strong">{{ r.customer }}<span class="scr-item-sub">{{ r.when }}</span></td>
            <td class="scr-num">{{ r.from }}</td>
            <td>{{ r.reason }}</td>
            <td><span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span></td>
            <td class="scr-num">{{ r.amount }}</td>
          </tr>
        </tbody>
      </table>

      <div class="scr-stack">
        <div class="scr-card">
          <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">Refund · Tom Okafor</p><span class="scr-pill" data-tone="warn">Awaiting approval</span></div>
          <p class="scr-micro scr-muted">Deposit for 1–4 Oct · Osprey · B-07 · requested 13 Oct by Front desk</p>
          <div class="scr-divider"></div>
          <dl>
            <div class="scr-kv"><dt>Deposit held</dt><dd class="scr-num">$300.00</dd></div>
            <div class="scr-kv"><dt>Damage or cleaning</dt><dd class="scr-num">$0.00</dd></div>
            <div class="scr-kv"><dt>Provider fee kept</dt><dd class="scr-num scr-muted">$8.70</dd></div>
            <div class="scr-kv"><dt class="scr-strong">Customer gets back</dt><dd class="scr-num scr-strong">$291.30</dd></div>
            <div class="scr-kv"><dt>To</dt><dd>Original card ···0917</dd></div>
          </dl>
          <div class="scr-row" style="margin-top: 12px">
            <button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Approve</button>
            <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Send back with a note</button>
          </div>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Thresholds</p>
          <div class="scr-kv"><span>Front desk</span><span class="scr-num">up to $100 · no approval</span></div>
          <div class="scr-kv"><span>Dockmaster</span><span class="scr-num">up to $500</span></div>
          <div class="scr-kv"><span>Accounts</span><span class="scr-num">up to $5,000</span></div>
          <div class="scr-kv"><span>Owner</span><span class="scr-num">any amount</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const refunds = [
  { customer: 'Tom Okafor', when: '13 Oct', from: 'Deposit', reason: 'Departed · nothing to hold', status: 'Awaiting approval', tone: 'warn', amount: '$291.30', selected: true },
  { customer: 'Sam Miller', when: '13 Oct', from: 'CN-2026-0031', reason: 'Shore power overbilled', status: 'Awaiting approval', tone: 'warn', amount: '$18.00', selected: false },
  { customer: 'Priya Natarajan', when: '12 Oct', from: 'CN-2026-0029', reason: 'Departed a night early', status: 'Sent to provider', tone: 'info', amount: '$238.00', selected: false },
  { customer: 'Blue Water Yacht Management', when: '10 Oct', from: 'RCP-3384', reason: 'Booking cancelled in time', status: 'Awaiting approval', tone: 'warn', amount: '$1,108.70', selected: false },
  { customer: 'Ana Ruiz Charters LLC', when: '8 Oct', from: 'CN-2026-0030', reason: 'Resident discount missed', status: 'Refunded', tone: 'safe', amount: '$354.00', selected: false },
  { customer: 'Coconuts', when: '2 Oct', from: 'CN-2026-0027', reason: 'Goodwill · dock closure', status: 'Refunded', tone: 'safe', amount: '$120.00', selected: false },
]
</script>
