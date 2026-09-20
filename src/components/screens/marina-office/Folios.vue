<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Folios</h1>
        <p class="scr-sub">A customer's open charges before they are invoiced.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">Post a charge</button></div>
    </div>

    <div class="scr-kpis">
      <div class="scr-stat"><span class="scr-stat-label">Open folios</span><span class="scr-stat-value">23</span><span class="scr-stat-delta">14 in the basin now</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Uninvoiced</span><span class="scr-stat-value">$18,940</span><span class="scr-stat-delta">across all open folios</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Departing today</span><span class="scr-stat-value">4</span><span class="scr-stat-delta" data-tone="warn">2 not yet settled</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Deposits applied</span><span class="scr-stat-value">$3,200</span><span class="scr-stat-delta">this week</span></div>
    </div>

    <div class="scr-split scr-section">
      <div>
        <div class="scr-toolbar">
          <input class="scr-input scr-input--search" style="max-width: 260px" placeholder="Customer, vessel or berth" aria-label="Search folios" />
          <span class="scr-chip is-on">Open</span><span class="scr-chip">Departing</span><span class="scr-chip">Closed</span>
        </div>
        <table class="scr-table">
          <thead><tr><th>Folio</th><th>Customer</th><th>Berth</th><th>Stay</th><th class="scr-num">Balance</th></tr></thead>
          <tbody>
            <tr v-for="f in folios" :key="f.no" :class="{ 'is-selected': f.no === 'F-1042' }">
              <td class="scr-num scr-strong">{{ f.no }}</td>
              <td>{{ f.customer }}<span class="scr-item-sub">{{ f.vessel }}</span></td>
              <td class="scr-num">{{ f.berth }}</td>
              <td class="scr-num scr-muted">{{ f.stay }}</td>
              <td class="scr-num scr-strong">{{ f.balance }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-card">
        <div class="scr-row scr-row--between"><p class="scr-card-title" style="margin: 0">F-1042 · Sam Miller</p><span class="scr-pill" data-tone="info">Open</span></div>
        <p class="scr-micro scr-muted">Wanderer · C-14 · 16 → 19 Oct 2026 · 3 nights</p>
        <div class="scr-divider"></div>
        <div v-for="l in lines" :key="l.item" class="scr-kv"><span>{{ l.item }}<span class="scr-item-sub">{{ l.when }}</span></span><span class="scr-num" :class="{ 'scr-muted': l.amount.startsWith('−') }">{{ l.amount }}</span></div>
        <div class="scr-divider"></div>
        <div class="scr-kv"><span>Charges</span><span class="scr-num">$618.40</span></div>
        <div class="scr-kv"><span>Deposit applied</span><span class="scr-num">−$200.00</span></div>
        <div class="scr-kv"><span class="scr-strong">Balance to invoice</span><span class="scr-num scr-strong">$418.40</span></div>
        <div class="scr-row" style="margin-top: 12px">
          <button type="button" class="scr-btn scr-btn--primary scr-btn--sm">Invoice this folio</button>
          <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Post a charge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const folios = [
  { no: 'F-1042', customer: 'Sam Miller', vessel: 'Wanderer', berth: 'C-14', stay: '16–19 Oct', balance: '$418.40' },
  { no: 'F-1041', customer: 'Blue Water Yacht Management', vessel: 'Halcyon', berth: 'A-03', stay: '12–26 Oct', balance: '$4,312.00' },
  { no: 'F-1039', customer: 'Ana Ruiz Charters LLC', vessel: 'Salt & Light', berth: 'C-11', stay: 'Resident', balance: '$1,180.00' },
  { no: 'F-1037', customer: 'Tom Okafor', vessel: 'Osprey', berth: 'B-07', stay: '14–17 Oct', balance: '$372.60' },
  { no: 'F-1035', customer: 'Priya Natarajan', vessel: 'Tidewater', berth: 'D-02', stay: '10–18 Oct', balance: '$1,904.00' },
  { no: 'F-1033', customer: 'Coconuts', vessel: 'Dock and dine', berth: 'T-01', stay: 'Monthly', balance: '$640.00' },
]
const lines = [
  { item: 'Transient · 40–50 ft · 3 nights', when: 'Posted 16 Oct · $3.80/ft', amount: '$478.80' },
  { item: 'Shore power 50 A · 3 nights', when: 'Posted 16 Oct', amount: '$45.00' },
  { item: 'Pump-out', when: 'Posted 17 Oct · fuel dock', amount: '$25.00' },
  { item: 'Resort fee · 3 nights', when: 'Posted 16 Oct', amount: '$69.60' },
]
</script>
