<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Work</h1>
        <p class="scr-sub">Everything open across the vessels you serve, and what is due on them.</p>
      </div>
      <span class="scr-pill" data-tone="accent">5 open · 4 due</span>
    </div>

    <div class="scr-grid-3">
      <label class="scr-field"><span class="scr-label">Vessel</span><select class="scr-select" v-model="vessel"><option value="">Every vessel</option><option v-for="v in names" :key="v" :value="v">{{ v }}</option></select></label>
      <label class="scr-field"><span class="scr-label">System</span><select class="scr-select"><option>Every system</option><option>Engine</option><option>Electrical</option><option>Hull</option><option>Steering</option></select></label>
      <label class="scr-field"><span class="scr-label">Status</span><select class="scr-select"><option>Open, scheduled and in progress</option><option>Open</option><option>Scheduled</option><option>In progress</option></select></label>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Work orders</h2>
      <p class="scr-small scr-muted">Open first: urgent, then soonest scheduled.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="o in shownOrders" :key="o.title" class="scr-row wrk-row">
          <span class="scr-pill" :data-tone="o.tone">{{ o.status }}</span>
          <span class="wrk-main"><span class="scr-strong">{{ o.title }}</span> <span class="scr-muted">·</span> <a href="#">{{ o.vessel }}</a><br /><span class="scr-small scr-muted">{{ o.line }}</span></span>
          <span class="scr-row" v-if="o.writable"><button v-for="m in o.moves" :key="m" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': m === 'Mark done' }">{{ m }}</button></span>
          <span v-else class="scr-small scr-muted">assign yourself to work it</span>
        </li>
      </ul>
      <div v-if="shownOrders.length === 0" class="scr-empty" style="margin-top: 10px"><strong>Nothing open</strong>Every vessel you serve is caught up, or the filter hides the rest.</div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Due on the vessels you serve</h2>
      <p class="scr-small scr-muted">Overdue and coming up, from each vessel's own board.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="d in shownDue" :key="d.title" class="scr-row wrk-row">
          <span class="scr-pill" :data-tone="d.tone">{{ d.pill }}</span>
          <span class="wrk-main"><span class="scr-strong">{{ d.title }}</span> <span class="scr-muted">{{ d.system }}</span> <span class="scr-muted">·</span> <a href="#">{{ d.vessel }}</a><br /><span class="scr-small scr-muted">{{ d.line }}</span></span>
        </li>
      </ul>
      <p v-if="shownDue.length === 0" class="scr-small scr-muted" style="margin-top: 10px">Nothing due.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
const names = ['Wanderer', 'Sea Change', 'Tern', 'Blue Hour']
const vessel = ref('')
const orders = [
  { status: 'In progress', tone: 'danger', title: 'Port engine coolant temperature climbing at cruise', vessel: 'Wanderer', line: 'Engine · Urgent · on Luis Ortega · for Lauderdale Marine Service', writable: true, moves: ['Mark done', 'Open'] },
  { status: 'Open', tone: 'warn', title: 'Bilge pump float switch intermittent', vessel: 'Tern', line: "Electrical · High · a technician's finding", writable: false, moves: [] },
  { status: 'Scheduled', tone: 'info', title: 'Replace raw-water impeller', vessel: 'Sea Change', line: 'Engine · Normal · scheduled 14 Oct · on Dana Whitfield', writable: true, moves: ['In progress', 'Cancelled'] },
  { status: 'Open', tone: 'offline', title: 'Shore power inlet corroded', vessel: 'Blue Hour', line: 'Electrical · Normal · on Marcus Bell', writable: true, moves: ['Scheduled', 'In progress'] },
  { status: 'Scheduled', tone: 'info', title: 'Autopilot drive belt', vessel: 'Wanderer', line: 'Steering · Low · scheduled 21 Oct', writable: true, moves: ['In progress', 'Cancelled'] },
]
const due = [
  { pill: 'Overdue', tone: 'danger', title: 'Raw-water impeller', system: 'Engine', vessel: 'Sea Change', line: 'due 30 Sep · 4 days ago' },
  { pill: 'Due', tone: 'warn', title: 'Zincs', system: 'Hull', vessel: 'Tern', line: 'due 18 Oct · in 12 days' },
  { pill: 'Coming up', tone: 'warn', title: 'Engine oil and filter', system: 'Engine', vessel: 'Wanderer', line: 'due at 1,500 h · 52 h to go · and 22 Oct — port engine, spare filters aboard' },
  { pill: 'Later', tone: 'offline', title: 'Fuel filters', system: 'Engine', vessel: 'Blue Hour', line: 'due at 2,200 h · 186 h to go' },
]
const shownOrders = computed(() => orders.filter((o) => !vessel.value || o.vessel === vessel.value))
const shownDue = computed(() => due.filter((d) => !vessel.value || d.vessel === vessel.value))
</script>
<style scoped>
.wrk-row { align-items: flex-start; padding: 8px 0; border-top: 1px solid var(--ink-100); }
.wrk-row:first-child { border-top: 0; padding-top: 0; }
.wrk-row .scr-pill { margin-top: 2px; }
.wrk-main { flex: 1; min-width: 0; }
</style>
