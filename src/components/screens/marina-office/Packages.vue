<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Packages</h1>
        <p class="scr-sub">Bundles and inclusive terms sold as one thing.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--primary">New package</button></div>
    </div>

    <div class="scr-grid-3">
      <div v-for="p in packages" :key="p.name" class="scr-card" :class="{ 'scr-card--accent': p.featured }">
        <div class="scr-row scr-row--between">
          <p class="scr-card-title" style="margin: 0">{{ p.name }}</p>
          <span class="scr-pill" :data-tone="p.tone">{{ p.state }}</span>
        </div>
        <p class="scr-stat-value" style="margin: 6px 0 2px">{{ p.price }}</p>
        <p class="scr-micro scr-muted" style="margin-bottom: 8px">{{ p.basis }}</p>
        <ul class="scr-stack--tight" style="display: grid; font-size: 12px">
          <li v-for="i in p.includes" :key="i" class="scr-row" style="gap: 6px"><ScrIcon name="check" /> {{ i }}</li>
        </ul>
        <div class="scr-divider"></div>
        <div class="scr-row scr-row--between scr-micro scr-muted">
          <span>{{ p.sold }} sold in October</span>
          <span class="scr-num">{{ p.revenue }}</span>
        </div>
      </div>
    </div>

    <div class="scr-section">
      <p class="scr-h3">Sold this month</p>
      <table class="scr-table">
        <thead><tr><th>Customer</th><th>Package</th><th>Stay</th><th>Channel</th><th class="scr-num">Price</th><th>Folio</th></tr></thead>
        <tbody>
          <tr v-for="s in sales" :key="s.customer + s.stay">
            <td class="scr-strong">{{ s.customer }}<span class="scr-item-sub">{{ s.vessel }}</span></td>
            <td>{{ s.pkg }}</td>
            <td class="scr-num scr-muted">{{ s.stay }}</td>
            <td>{{ s.channel }}</td>
            <td class="scr-num">{{ s.price }}</td>
            <td class="scr-num">{{ s.folio }}</td>
          </tr>
        </tbody>
      </table>
      <p class="scr-micro scr-muted" style="margin-top: 8px">A package is one line on the folio; what it bundles is listed on the invoice so the tax on each part is right.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const packages = [
  { name: 'Weekend + power', price: '$1,190', basis: '2 nights · 40–50 ft · flat', state: 'On sale', tone: 'safe', featured: true, includes: ['2 nights in a C-dock slip', '50 A shore power', 'One pump-out', 'Resort fee waived'], sold: 14, revenue: '$16,660' },
  { name: 'Boat show week', price: '$9.00/ft', basis: '5 nights · 26 Oct – 2 Nov · all lengths', state: 'On sale', tone: 'safe', featured: false, includes: ['5 nights, non-refundable', 'Two show passes', 'Crew parking', 'Daily trash pickup'], sold: 22, revenue: '$61,380' },
  { name: 'Monthly transient', price: '$28.00/ft', basis: '30 nights · up to 80 ft', state: 'On sale', tone: 'safe', featured: false, includes: ['30 consecutive nights', 'Metered power', 'Weekly pump-out', 'Mail handling'], sold: 3, revenue: '$4,116' },
  { name: 'Summer long stay', price: '$22.00/ft', basis: '30 nights · May–September', state: 'Off season', tone: 'offline', featured: false, includes: ['30 consecutive nights', 'Metered power', 'Hurricane haul-out priority'], sold: 0, revenue: '—' },
]
const sales = [
  { customer: 'Sam Miller', vessel: 'Wanderer · 42 ft', pkg: 'Weekend + power', stay: '16–18 Oct', channel: 'DockPass', price: '$1,190.00', folio: 'F-1042' },
  { customer: 'Blue Water Yacht Management', vessel: 'Halcyon · 52 ft', pkg: 'Boat show week', stay: '26 Oct – 2 Nov', channel: 'Direct', price: '$2,340.00', folio: 'F-1048' },
  { customer: 'Priya Natarajan', vessel: 'Tidewater · 46 ft', pkg: 'Monthly transient', stay: '10 Oct – 9 Nov', channel: 'Direct', price: '$1,288.00', folio: 'F-1035' },
  { customer: 'Tom Okafor', vessel: 'Osprey · 34 ft', pkg: 'Weekend + power', stay: '2–4 Oct', channel: 'Walk-in', price: '$1,190.00', folio: 'F-1037' },
]
</script>
