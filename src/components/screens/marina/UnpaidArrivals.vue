<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Unpaid arrivals</h1>
        <p class="scr-sub">Arriving today with money outstanding. Today · phase 3 of the PMS plan.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--ghost scr-btn--sm">PMS map</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Arriving unpaid</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="warn">of 6 arriving today</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Outstanding</span><span class="scr-stat-value">$1,214<small>USD</small></span><span class="scr-stat-delta">deposits and prior balances</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Deposit due on arrival</span><span class="scr-stat-value">2</span><span class="scr-stat-delta">take it at the desk</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Prior balance</span><span class="scr-stat-value">1</span><span class="scr-stat-delta" data-tone="danger">from a stay in August</span></div>
    </div>

    <div class="scr-section scr-table-wrap">
      <table class="scr-table">
        <thead><tr><th>Vessel</th><th>Stay</th><th>What is owed</th><th class="scr-num">Amount</th><th>Since</th><th></th></tr></thead>
        <tbody>
          <tr v-for="r in rows" :key="r.vessel">
            <td><span class="scr-strong">{{ r.vessel }}</span><br /><span class="scr-small scr-muted">{{ r.who }}</span></td>
            <td class="scr-small">{{ r.stay }}</td>
            <td><span class="scr-pill" :data-tone="r.tone">{{ r.kind }}</span></td>
            <td class="scr-num scr-strong">{{ r.amount }}</td>
            <td class="scr-small scr-muted">{{ r.since }}</td>
            <td><div class="scr-row"><button class="scr-btn scr-btn--primary scr-btn--sm">Take payment</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Folio</button></div></td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="scr-section scr-small scr-muted">A payment taken here settles the folio line it names; the receipt lands under Finance → Receipts. Nothing is charged automatically.</p>
  </div>
</template>

<script setup lang="ts">
const rows = [
  { vessel: 'Sea Change · 55 ft', who: 'R. Alvarez', stay: '14–20 Oct · 6 nights', kind: 'Deposit due', tone: 'warn', amount: '$390.00', since: 'booked 2 Oct' },
  { vessel: 'Osprey · 36 ft', who: 'M. Chen', stay: '14–15 Oct · 1 night', kind: 'Deposit due', tone: 'warn', amount: '$46.00', since: 'booked 13 Oct' },
  { vessel: 'Tidewater · 60 ft', who: 'D. Whitfield', stay: '9–12 Oct · overstaying', kind: 'Prior balance', tone: 'danger', amount: '$778.00', since: 'invoice 14 Aug · 61 days' },
]
</script>
