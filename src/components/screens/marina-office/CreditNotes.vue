<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Credit notes</h1>
        <p class="scr-sub">Corrections that leave the original document intact.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Raise a credit note</button></div>
    </div>

    <div class="scr-split">
      <div>
        <div class="scr-toolbar">
          <input class="scr-input scr-input--search" style="max-width: 260px" placeholder="Number, invoice or customer" aria-label="Search credit notes" />
          <span class="scr-chip is-on">All</span><span class="scr-chip">Awaiting approval</span><span class="scr-chip">Issued</span>
        </div>
        <table class="scr-table">
          <thead><tr><th>Number</th><th>Against</th><th>Customer</th><th>Reason</th><th>Status</th><th class="scr-num">Amount</th></tr></thead>
          <tbody>
            <tr v-for="c in notes" :key="c.no" :class="{ 'is-selected': c.no === 'CN-2026-0031' }">
              <td class="scr-num scr-strong">{{ c.no }}<span class="scr-item-sub">{{ c.when }}</span></td>
              <td class="scr-num">{{ c.against }}</td>
              <td>{{ c.customer }}</td>
              <td>{{ c.reason }}</td>
              <td><span class="scr-pill" :data-tone="c.tone">{{ c.status }}</span></td>
              <td class="scr-num">{{ c.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">CN-2026-0031</p><span class="scr-pill" data-tone="warn">Awaiting approval</span></div>
        <p class="scr-micro scr-muted">Against INV-2026-0418 · Sam Miller · raised 13 Oct by Front desk</p>
        <div class="scr-divider"></div>
        <dl>
          <div class="scr-kv"><dt>Reason</dt><dd>Shore power billed at 50 A; vessel was on 30 A</dd></div>
          <div class="scr-kv"><dt>Line credited</dt><dd>Shore power 50 A · 3 nights</dd></div>
          <div class="scr-kv"><dt>Original</dt><dd class="scr-num">$45.00</dd></div>
          <div class="scr-kv"><dt>Should have been</dt><dd class="scr-num">$27.00</dd></div>
          <div class="scr-kv"><dt>Credit</dt><dd class="scr-num scr-strong">$18.00</dd></div>
          <div class="scr-kv"><dt>Settlement</dt><dd>Refund to card ···4242</dd></div>
        </dl>
        <div class="scr-alert" style="margin-top: 10px">
          <ScrIcon name="lock" />
          <span><strong>Needs an Accounts approval</strong>Front desk may raise a credit note up to $50; this one settles by refund, which always needs a second pair of eyes.</span>
        </div>
        <div class="scr-row" style="margin-top: 12px">
          <button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Approve and issue</button>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Decline</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const notes = [
  { no: 'CN-2026-0031', when: '13 Oct', against: 'INV-2026-0418', customer: 'Sam Miller', reason: 'Shore power overbilled', status: 'Awaiting approval', tone: 'warn', amount: '$18.00' },
  { no: 'CN-2026-0030', when: '11 Oct', against: 'INV-2026-0416', customer: 'Ana Ruiz Charters LLC', reason: 'Resident discount missed', status: 'Issued', tone: 'safe', amount: '$354.00' },
  { no: 'CN-2026-0029', when: '9 Oct', against: 'INV-2026-0409', customer: 'Priya Natarajan', reason: 'Departed a night early', status: 'Issued', tone: 'safe', amount: '$238.00' },
  { no: 'CN-2026-0028', when: '6 Oct', against: 'INV-2026-0404', customer: 'Sam Miller', reason: 'Pump-out charged twice', status: 'Issued', tone: 'safe', amount: '$25.00' },
  { no: 'CN-2026-0027', when: '2 Oct', against: 'INV-2026-0398', customer: 'Coconuts', reason: 'Goodwill · dock closure', status: 'Issued', tone: 'safe', amount: '$120.00' },
  { no: 'CN-2026-0026', when: '30 Sep', against: 'INV-2026-0391', customer: 'Tom Okafor', reason: 'Wrong rate band', status: 'Declined', tone: 'offline', amount: '$96.00' },
]
</script>
