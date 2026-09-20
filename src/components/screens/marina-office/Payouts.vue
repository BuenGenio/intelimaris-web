<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Payouts</h1>
        <p class="scr-sub">DockPass revenue for the marina, by stay, and when it settles.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost">Bookings</button></div>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">Balance</p><span class="scr-pill" data-tone="safe">Provider connected</span></div>
      <p class="scr-sub scr-small" style="margin-bottom: 10px">Settled and pending, as the provider reports them — never computed on this screen.</p>
      <div class="scr-grid-3">
        <div><span class="scr-ov">Pending</span><p class="scr-stat-value">$3,842.60</p><p class="scr-micro scr-muted">7 stays not yet settled</p></div>
        <div><span class="scr-ov">Next payout</span><p class="scr-stat-value">Fri 16 Oct</p><p class="scr-micro scr-muted">$2,911.40 · weekly schedule</p></div>
        <div><span class="scr-ov">Paid out this month</span><p class="scr-stat-value">$8,760.20</p><p class="scr-micro scr-muted">2 transfers</p></div>
      </div>
      <p class="scr-micro scr-muted" style="margin-top: 8px">Unknown is a dash, never a zero — a zero balance would be a claim about money.</p>
    </div>

    <div class="scr-split scr-section">
      <div>
        <p class="scr-h3">Payouts</p>
        <p class="scr-sub scr-small" style="margin-bottom: 8px">One row per transfer, with the stays it covered.</p>
        <table class="scr-table">
          <thead><tr><th>Transfer</th><th>Arrives</th><th>Stays</th><th class="scr-num">Gross</th><th class="scr-num">Fees</th><th class="scr-num">Net</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="p in payouts" :key="p.id">
              <td class="scr-num scr-strong">{{ p.id }}</td>
              <td class="scr-num scr-muted">{{ p.arrives }}</td>
              <td class="scr-num">{{ p.stays }}</td>
              <td class="scr-num">{{ p.gross }}</td>
              <td class="scr-num scr-muted">{{ p.fees }}</td>
              <td class="scr-num scr-strong">{{ p.net }}</td>
              <td><span class="scr-pill" :data-tone="p.tone">{{ p.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Payout account</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Where the money goes. Set up on the provider's hosted page.</p>
          <div class="scr-kv"><span>Bank</span><span>Truist · checking ···6620</span></div>
          <div class="scr-kv"><span>Payee</span><span>Bahia Mar Marina LLC</span></div>
          <div class="scr-kv"><span>Schedule</span><span>Weekly, Fridays</span></div>
          <div class="scr-kv"><span>Verified</span><span class="scr-pill" data-tone="safe">14 Aug 2026</span></div>
          <button type="button" class="scr-btn scr-btn--sm" style="margin-top: 10px">Change on the provider's page</button>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">In the next payout</p>
          <div v-for="s in upcoming" :key="s.who" class="scr-kv"><span>{{ s.who }}<span class="scr-item-sub">{{ s.stay }}</span></span><span class="scr-num">{{ s.net }}</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const payouts = [
  { id: 'po_2026_1016', arrives: '16 Oct', stays: '9', gross: '$3,004.00', fees: '$92.60', net: '$2,911.40', status: 'Scheduled', tone: 'info' },
  { id: 'po_2026_1009', arrives: '9 Oct', stays: '14', gross: '$5,118.00', fees: '$157.80', net: '$4,960.20', status: 'Paid', tone: 'safe' },
  { id: 'po_2026_1002', arrives: '2 Oct', stays: '11', gross: '$3,920.00', fees: '$120.00', net: '$3,800.00', status: 'Paid', tone: 'safe' },
  { id: 'po_2026_0925', arrives: '25 Sep', stays: '13', gross: '$4,466.00', fees: '$137.20', net: '$4,328.80', status: 'Paid', tone: 'safe' },
  { id: 'po_2026_0918', arrives: '18 Sep', stays: '8', gross: '$2,612.00', fees: '$80.40', net: '$2,531.60', status: 'Paid', tone: 'safe' },
]
const upcoming = [
  { who: 'Sam Miller', stay: 'Wanderer · C-14 · 9–12 Oct', net: '$471.80' },
  { who: 'Priya Natarajan', stay: 'Tidewater · D-02 · 10–14 Oct', net: '$1,014.60' },
  { who: 'Tom Okafor', stay: 'Osprey · B-07 · 1–4 Oct', net: '$316.40' },
  { who: '6 more stays', stay: 'settled 8–13 Oct', net: '$1,108.60' },
]
</script>
