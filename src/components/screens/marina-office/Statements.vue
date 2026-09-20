<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Statements</h1>
        <p class="scr-sub">A customer's account position over a period.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="download" /> PDF</button><button type="button" class="scr-btn scr-btn--primary">Send statement</button></div>
    </div>

    <div class="scr-split">
      <div class="scr-card">
        <div class="scr-row scr-row--between" style="margin-bottom: 10px">
          <div>
            <p class="scr-card-title" style="margin: 0">Sam Miller</p>
            <p class="scr-micro scr-muted">Wanderer · sam@example.com · 1 Sep → 14 Oct 2026</p>
          </div>
          <span class="scr-chip"><ScrIcon name="calendar" /> Last 45 days</span>
        </div>
        <table class="scr-table">
          <thead><tr><th>Date</th><th>Document</th><th>Detail</th><th class="scr-num">Debit</th><th class="scr-num">Credit</th><th class="scr-num">Balance</th></tr></thead>
          <tbody>
            <tr v-for="l in lines" :key="l.date + l.doc">
              <td class="scr-num scr-muted">{{ l.date }}</td>
              <td class="scr-num scr-strong">{{ l.doc }}</td>
              <td>{{ l.detail }}</td>
              <td class="scr-num">{{ l.debit }}</td>
              <td class="scr-num">{{ l.credit }}</td>
              <td class="scr-num">{{ l.balance }}</td>
            </tr>
          </tbody>
        </table>
        <div class="scr-row scr-row--between" style="margin-top: 10px">
          <span class="scr-micro scr-muted">Opening balance $0.00 · 4 invoices · 3 receipts · 2 credit notes</span>
          <span class="scr-strong">Closing balance <span class="scr-num">$418.40</span> owed by the customer</span>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Position</p>
          <div class="scr-kv"><span>Not yet due</span><span class="scr-num">$418.40</span></div>
          <div class="scr-kv"><span>1–30 days</span><span class="scr-num scr-muted">$0.00</span></div>
          <div class="scr-kv"><span>31–60 days</span><span class="scr-num scr-muted">$0.00</span></div>
          <div class="scr-kv"><span>Over 60 days</span><span class="scr-num scr-muted">$0.00</span></div>
          <div class="scr-kv"><span>Deposits held</span><span class="scr-num">$200.00</span></div>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">Statement runs</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Monthly, to every customer with a balance or a movement.</p>
          <div class="scr-kv"><span>1 Oct 2026</span><span class="scr-pill" data-tone="safe">41 sent · 39 delivered</span></div>
          <div class="scr-kv"><span>1 Sep 2026</span><span class="scr-pill" data-tone="safe">38 sent · 38 delivered</span></div>
          <div class="scr-kv"><span>1 Nov 2026</span><span class="scr-pill" data-tone="info">Scheduled</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const lines = [
  { date: '24 Sep', doc: 'INV-2026-0404', detail: 'Stay 20–23 Sep · C-12', debit: '$512.00', credit: '', balance: '$512.00' },
  { date: '24 Sep', doc: 'RCP-3371', detail: 'Card · terminal', debit: '', credit: '$512.00', balance: '$0.00' },
  { date: '3 Oct', doc: 'DEP-0918', detail: 'Deposit for 16–19 Oct', debit: '', credit: '$200.00', balance: '−$200.00' },
  { date: '6 Oct', doc: 'CN-2026-0028', detail: 'Pump-out charged twice', debit: '', credit: '$25.00', balance: '−$225.00' },
  { date: '12 Oct', doc: 'INV-2026-0418', detail: 'Stay 9–12 Oct · C-14', debit: '$486.20', credit: '', balance: '$261.20' },
  { date: '12 Oct', doc: 'RCP-3391', detail: 'Card · terminal', debit: '', credit: '$486.20', balance: '−$225.00' },
  { date: '14 Oct', doc: 'F-1042', detail: 'Open folio · 16–19 Oct (not yet invoiced)', debit: '$643.40', credit: '', balance: '$418.40' },
]
</script>
