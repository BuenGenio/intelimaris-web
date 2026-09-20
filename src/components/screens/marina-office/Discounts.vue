<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Discounts</h1>
        <p class="scr-sub">Who may give what away, and above which figure it needs approval.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">New discount</button></div>
    </div>

    <div class="scr-split">
      <div>
        <p class="scr-h3">Standing discounts</p>
        <table class="scr-table">
          <thead><tr><th>Name</th><th>Applies to</th><th class="scr-num">Amount</th><th>Who may apply it</th><th>Status</th></tr></thead>
          <tbody>
            <tr v-for="d in discounts" :key="d.name">
              <td class="scr-strong">{{ d.name }}<span class="scr-item-sub">{{ d.code }}</span></td>
              <td>{{ d.applies }}</td>
              <td class="scr-num">{{ d.amount }}</td>
              <td>{{ d.who }}</td>
              <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
            </tr>
          </tbody>
        </table>

        <p class="scr-h3 scr-section">Given this month</p>
        <table class="scr-table">
          <thead><tr><th>Customer</th><th>Discount</th><th>By</th><th class="scr-num">Given away</th><th>Approval</th></tr></thead>
          <tbody>
            <tr v-for="g in given" :key="g.customer + g.discount">
              <td class="scr-strong">{{ g.customer }}</td>
              <td>{{ g.discount }}</td>
              <td>{{ g.by }}</td>
              <td class="scr-num">{{ g.amount }}</td>
              <td><span class="scr-pill" :data-tone="g.tone">{{ g.approval }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Approval thresholds</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Per stay, before tax. Above the line, the next role signs.</p>
          <div class="scr-kv"><span>Front desk</span><span class="scr-num">up to 10% or $100</span></div>
          <div class="scr-kv"><span>Dockmaster</span><span class="scr-num">up to 20% or $500</span></div>
          <div class="scr-kv"><span>Manager</span><span class="scr-num">up to 35%</span></div>
          <div class="scr-kv"><span>Owner</span><span class="scr-num">any</span></div>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">October so far</p>
          <div class="scr-kpis" style="grid-template-columns: 1fr 1fr">
            <div><span class="scr-ov">Given away</span><p class="scr-stat-value">$3,412</p></div>
            <div><span class="scr-ov">Of billed</span><p class="scr-stat-value">3.5%</p></div>
          </div>
          <div class="scr-bars" style="margin-top: 10px">
            <div><span>Resident</span><div class="scr-progress"><i style="width: 62%"></i></div><span class="scr-num">$2,115</span></div>
            <div><span>Goodwill</span><div class="scr-progress"><i style="width: 24%"></i></div><span class="scr-num">$820</span></div>
            <div><span>Weekly</span><div class="scr-progress"><i style="width: 14%"></i></div><span class="scr-num">$477</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const discounts = [
  { name: 'Resident rate', code: 'Automatic · agreement on file', applies: 'Transient nights for residents', amount: '15%', who: 'Automatic', status: 'Active', tone: 'safe' },
  { name: 'Weekly stay', code: 'Automatic · 7+ nights', applies: 'Transient bands', amount: '10%', who: 'Automatic', status: 'Active', tone: 'safe' },
  { name: 'Goodwill', code: 'GOODWILL', applies: 'Any line', amount: 'up to $100', who: 'Front desk and up', status: 'Active', tone: 'safe' },
  { name: 'Yacht club reciprocal', code: 'LYC-2026', applies: 'Transient bands · 1st night', amount: '25%', who: 'Dockmaster and up', status: 'Active', tone: 'safe' },
  { name: 'Boat show early bird', code: 'FLIBS-EARLY', applies: 'Boat show week', amount: '$150', who: 'Automatic before 1 Oct', status: 'Ended', tone: 'offline' },
]
const given = [
  { customer: 'Ana Ruiz Charters LLC', discount: 'Resident rate', by: 'Automatic', amount: '$531.00', approval: 'Not needed', tone: 'safe' },
  { customer: 'Sam Miller', discount: 'Goodwill · dock closure', by: 'Front desk', amount: '$48.00', approval: 'Not needed', tone: 'safe' },
  { customer: 'Blue Water Yacht Management', discount: 'Goodwill · power outage', by: 'Dockmaster', amount: '$620.00', approval: 'Manager · awaiting', tone: 'warn' },
  { customer: 'Priya Natarajan', discount: 'Weekly stay', by: 'Automatic', amount: '$190.40', approval: 'Not needed', tone: 'safe' },
  { customer: 'Tom Okafor', discount: 'Yacht club reciprocal', by: 'Front desk', amount: '$28.90', approval: 'Dockmaster · approved', tone: 'safe' },
]
</script>
