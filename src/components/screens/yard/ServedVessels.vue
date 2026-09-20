<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Served vessels</h1>
        <p class="scr-sub">Every engagement the yard has: active, waiting, and settled. A maintenance workspace never contains a vessel.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">4 active</span><span class="scr-pill" data-tone="warn">2 requested</span></div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" placeholder="Search by vessel" style="max-width: 260px" />
      <div class="scr-chips"><span class="scr-chip is-on">Every status</span><span class="scr-chip">Active</span><span class="scr-chip">Requested</span><span class="scr-chip">Ended</span></div>
      <span class="scr-spacer"></span>
      <button class="scr-btn scr-btn--primary scr-btn--sm"><ScrIcon name="plus" />Serve another vessel</button>
    </div>

    <table class="scr-table">
      <thead><tr><th>Vessel</th><th>Status</th><th>Hours clock</th><th>Technicians</th><th class="scr-num">Due</th><th class="scr-num">Open</th><th>Since</th><th></th></tr></thead>
      <tbody>
        <tr v-for="v in vessels" :key="v.name">
          <td><span class="scr-strong">{{ v.name }}</span><br /><span class="scr-small scr-muted">{{ v.type }}</span></td>
          <td><span class="scr-pill" :data-tone="v.tone">{{ v.status }}</span></td>
          <td class="scr-num">{{ v.hours }}</td>
          <td>{{ v.techs }}</td>
          <td class="scr-num">{{ v.due }}</td>
          <td class="scr-num">{{ v.open }}</td>
          <td class="scr-muted">{{ v.since }}</td>
          <td style="text-align: right"><button class="scr-btn scr-btn--ghost scr-btn--sm">{{ v.action }}</button></td>
        </tr>
      </tbody>
    </table>

    <div class="scr-grid-2 scr-section">
      <div class="scr-card">
        <h2 class="scr-card-title">How a vessel reaches you</h2>
        <p class="scr-small scr-muted">A vessel owner engages you from their Maintenance door — from the directory, or by your join code <span class="scr-strong scr-num">LMS-7Q2X</span>. You assign your technicians; they reach that vessel through the engagement.</p>
      </div>
      <div class="scr-card">
        <h2 class="scr-card-title">Past engagements</h2>
        <ul class="scr-stack scr-stack--tight" style="margin-top: 6px">
          <li class="scr-row"><span class="scr-pill" data-tone="offline">Ended</span><span><span class="scr-strong">Osprey</span><br /><span class="scr-small scr-muted">Vessel sold · since 12 Feb</span></span></li>
          <li class="scr-row"><span class="scr-pill" data-tone="offline">Declined</span><span><span class="scr-strong">Marlin Too</span><br /><span class="scr-small scr-muted">Outside our service area · since 28 Aug</span></span></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const vessels = [
  { name: 'Wanderer', type: '42 ft Sabre · Fort Lauderdale', status: 'Active', tone: 'safe', hours: '1,448 h · read 4 min ago', techs: 'Luis Ortega', due: '1', open: '2', since: '14 Mar', action: 'Open' },
  { name: 'Sea Change', type: '48 ft Hatteras · Fort Lauderdale', status: 'Active', tone: 'safe', hours: '2,930 h · read 1 h ago', techs: 'Dana Whitfield, Luis Ortega', due: '1', open: '1', since: '2 Jun', action: 'Open' },
  { name: 'Tern', type: '36 ft Catalina · Pompano Beach', status: 'Active', tone: 'safe', hours: 'no unit reports hours', techs: 'nobody assigned', due: '1', open: '1', since: '19 Sep', action: 'Assign' },
  { name: 'Blue Hour', type: '54 ft Viking · Fort Lauderdale', status: 'Active', tone: 'safe', hours: '2,014 h · read 22 min ago', techs: 'Marcus Bell', due: '1', open: '1', since: '30 Sep', action: 'Open' },
  { name: 'Halcyon', type: '40 ft Beneteau · Dania Beach', status: 'Requested', tone: 'warn', hours: '—', techs: '—', due: '—', open: '—', since: '3 Oct', action: 'Accept' },
  { name: 'Kestrel', type: '31 ft Boston Whaler · Fort Lauderdale', status: 'Requested', tone: 'info', hours: '—', techs: '—', due: '—', open: '—', since: '5 Oct', action: 'Withdraw' },
]
</script>
