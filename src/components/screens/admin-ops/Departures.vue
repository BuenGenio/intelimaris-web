<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <div class="scr-row"><h1 class="scr-h1">Departures</h1><span class="scr-pill" data-tone="warn">Scaffold</span></div>
        <p class="scr-sub">Today's demo runs from the booth: when, which vessel, who is booked, who has checked in, and how many seats are still free.</p>
      </div>
      <div class="scr-row">
        <span class="scr-row dep-disabled"><button type="button" class="scr-btn scr-btn--primary scr-btn--sm" disabled>Publish schedule</button><span class="scr-small scr-muted">Needs DEV-248.</span></span>
        <button type="button" class="scr-btn scr-btn--sm" @click="showSample = !showSample">{{ showSample ? 'Hide sample rows' : 'Show sample rows' }}</button>
      </div>
    </div>

    <div class="scr-alert" data-tone="warn" role="note">
      <ScrIcon name="wrench" />
      <span><strong>Scaffold — no lane behind this yet. DEV-251</strong>The departures and bookings tables are DEV-248 and DEV-249 and do not exist yet. Nothing here is live; publish, check-in and walk-up wait on the schema.</span>
    </div>

    <div class="scr-toolbar">
      <span class="scr-chip">Status · Every run <span aria-hidden="true">⌄</span></span>
    </div>

    <table class="scr-table">
      <thead><tr><th>Departs</th><th>Vessel</th><th>Seats</th><th>Status</th><th>At the dock</th></tr></thead>
      <tbody v-if="showSample">
        <tr v-for="d in runs" :key="d.id">
          <td><span class="scr-row"><strong class="scr-num">{{ d.departs }}</strong><span class="scr-pill scr-pill--bare">Sample</span></span></td>
          <td>{{ d.vessel }}</td>
          <td :class="d.full ? 'scr-strong' : 'scr-muted'">{{ d.seats }}<template v-if="d.full"> · full</template></td>
          <td><span class="scr-pill" :data-tone="d.tone">{{ d.status }}</span></td>
          <td>
            <span class="scr-row scr-row--wrap">
              <span class="scr-row dep-disabled"><button type="button" class="scr-btn scr-btn--sm" disabled>Check in</button><span class="scr-micro scr-muted">DEV-249</span></span>
              <span class="scr-row dep-disabled"><button type="button" class="scr-btn scr-btn--sm" disabled>Walk-up</button><span class="scr-micro scr-muted">DEV-249</span></span>
            </span>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr><td colspan="5" class="scr-muted dep-empty">No schedule lane answers here yet — this is not saying there are no runs today.</td></tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const showSample = ref(true)
const runs = [
  { id: 'd1', departs: '14:00', vessel: 'Wanderer', seats: '8 of 12 · 5 checked in · 2 walk-ups', full: false, status: 'Boarding', tone: 'warn' },
  { id: 'd2', departs: '15:00', vessel: 'Wanderer', seats: '12 of 12', full: true, status: 'Scheduled', tone: 'info' },
  { id: 'd3', departs: '16:00', vessel: 'Sea Change', seats: '3 of 8', full: false, status: 'Scheduled', tone: 'info' },
  { id: 'd4', departs: '11:00', vessel: 'Sea Change', seats: '8 of 8 · 8 checked in', full: true, status: 'Departed', tone: 'offline' },
]
</script>

<style scoped>
.dep-disabled { gap: 6px; }
.dep-disabled .scr-btn[disabled] { opacity: 0.5; }
.dep-empty { padding: 22px 14px; }
</style>
