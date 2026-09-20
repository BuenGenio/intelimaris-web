<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Enquiries</h1>
        <p class="scr-sub">Requests captured from any channel, before they are priced. Bookings & contracts · phase 3.</p>
      </div>
      <div class="scr-row"><span class="scr-pill">Scaffold</span><button class="scr-btn scr-btn--primary scr-btn--sm">New enquiry</button></div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="Name, vessel, phone or email" readonly />
      <div class="scr-chips"><span class="scr-chip is-on">Open · 5</span><span class="scr-chip">Quoted · 3</span><span class="scr-chip">Closed · 12</span></div>
    </div>

    <div class="scr-list">
      <div v-for="e in rows" :key="e.who" class="scr-item">
        <span class="scr-item-icon" :data-tone="e.tone"><ScrIcon :name="e.icon" /></span>
        <div style="min-width: 0">
          <span class="scr-item-title">{{ e.who }} <span class="scr-pill" data-tone="info">{{ e.channel }}</span></span>
          <span class="scr-item-sub">{{ e.ask }}</span>
        </div>
        <div class="scr-item-end"><span class="scr-num">{{ e.age }}</span><button class="scr-btn scr-btn--sm">Price it</button></div>
      </div>
    </div>

    <p class="scr-section scr-small scr-muted">An enquiry becomes a quotation once it is priced, and a stay once the quotation is accepted. Nothing here holds a berth.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const rows = [
  { who: 'Sam Miller · Wanderer, 42 ft', channel: 'WaterWayz', icon: 'message', tone: 'accent', ask: 'Three nights from 14 Oct, 50 A power, near the fuel dock if possible', age: '2 h ago' },
  { who: 'Priya Natarajan · Meridian, 62 ft', channel: 'Email', icon: 'message', tone: undefined, ask: 'Monthly rate for November through March; two crew aboard', age: '5 h ago' },
  { who: 'Unnamed caller · about 45 ft', channel: 'Phone', icon: 'phone', tone: 'warn', ask: 'Room tonight? Will call back on 71', age: '40 min ago' },
  { who: 'Charter Yachts of FLL', channel: 'Walk-up', icon: 'users', tone: undefined, ask: 'Block of 6 berths for the show week, 21–25 Oct', age: 'yesterday' },
  { who: 'Luis Ferreira · Andiamo, 48 ft', channel: 'VHF', icon: 'radio', tone: undefined, ask: 'Extend 21–28 Oct stay by four nights', age: 'yesterday' },
]
</script>
