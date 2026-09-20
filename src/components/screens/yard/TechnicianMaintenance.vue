<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Maintenance</h1>
        <p class="scr-sub">What is due, what needs doing, what was done, and who serves her.</p>
      </div>
      <span class="scr-pill scr-pill--bare"><ScrIcon name="clock" />1,448 h · read 4 min ago</span>
    </div>
    <p class="scr-small scr-muted" style="margin-bottom: 12px">Wanderer · you are here as a technician for Lauderdale Marine Service</p>

    <div class="scr-tabs" style="margin-bottom: 12px"><button v-for="t in tabs" :key="t" class="scr-tab" :class="{ 'is-on': tab === t }" @click="tab = t">{{ t }}</button></div>

    <div v-if="tab === 'Due'" class="scr-card">
      <h2 class="scr-card-title">Due</h2>
      <p class="scr-small scr-muted">Reminders count down in engine hours, dates, or both — and say which fires first.</p>
      <div v-for="b in board" :key="b.bucket" class="scr-section" style="margin-top: 12px">
        <p class="scr-ov" style="margin-bottom: 6px">{{ b.bucket }}</p>
        <ul class="scr-stack scr-stack--tight">
          <li v-for="r in b.rows" :key="r.title" class="tm-row"><span class="scr-pill" :data-tone="r.tone">{{ r.pill }}</span><span style="flex: 1; min-width: 0"><span class="scr-strong">{{ r.title }}</span> <span class="scr-muted">{{ r.system }}</span><br /><span class="scr-small scr-muted">{{ r.line }}</span></span><button v-if="r.pill !== 'Done'" class="scr-btn scr-btn--sm">Done</button></li>
        </ul>
      </div>
    </div>

    <div v-else-if="tab === 'Work'" class="scr-card">
      <h2 class="scr-card-title">Work orders</h2>
      <p class="scr-small scr-muted">What needs doing — raised by the crew, or found by a technician.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="o in orders" :key="o.title" class="tm-row"><span class="scr-pill" :data-tone="o.tone">{{ o.status }}</span><span style="flex: 1; min-width: 0"><span class="scr-strong">{{ o.title }}</span><br /><span class="scr-small scr-muted">{{ o.line }}</span><br v-if="o.detail" /><span v-if="o.detail" class="scr-small scr-muted">{{ o.detail }}</span></span></li>
      </ul>
      <div class="scr-row" style="margin-top: 12px"><button class="scr-btn scr-btn--primary scr-btn--sm">Mark done</button><button class="scr-btn scr-btn--sm">Reopen</button></div>
    </div>

    <div v-else-if="tab === 'History'" class="scr-card">
      <h2 class="scr-card-title">Service history</h2>
      <p class="scr-small scr-muted">What was done, by whom, at what hours — and under which yard when a technician did it.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li v-for="h in history" :key="h.title" class="tm-row"><span class="scr-pill" data-tone="safe">Done</span><span style="flex: 1; min-width: 0"><span class="scr-strong">{{ h.title }}</span><br /><span class="scr-small scr-muted">{{ h.line }}</span></span></li>
      </ul>
    </div>

    <div v-else class="scr-card">
      <h2 class="scr-card-title">Who serves her</h2>
      <p class="scr-small scr-muted">A maintenance company you engage assigns its technicians; they see monitoring, this door and a service channel — not the crew.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li class="tm-row"><span class="scr-pill" data-tone="safe">Active</span><span style="flex: 1"><span class="scr-strong">Lauderdale Marine Service</span><br /><span class="scr-small scr-muted">1 technician assigned · since 14 Mar</span></span></li>
      </ul>
      <p class="scr-small scr-muted" style="margin-top: 10px">Engaging or ending a yard is the owner's move, not a technician's.</p>
    </div>

    <div class="scr-bar"><button class="scr-btn scr-btn--primary scr-btn--block"><ScrIcon name="plus" />Log a service record</button></div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const tabs = ['Due', 'Work', 'History', 'Yard']
const tab = ref('Due')
const board = [
  { bucket: 'Due now', rows: [{ pill: 'Overdue', tone: 'danger', title: 'Raw-water strainer', system: 'Engine', line: 'due 2 Oct · 4 days ago · and at 1,450 h' }] },
  { bucket: 'Coming up', rows: [{ pill: 'Coming up', tone: 'warn', title: 'Engine oil and filter', system: 'Engine', line: 'due at 1,500 h · 52 h to go · and 22 Oct — port engine, spare filters aboard' }] },
  { bucket: 'Later', rows: [{ pill: 'Later', tone: 'offline', title: 'Zincs', system: 'Hull', line: 'due 15 Dec · in 70 days' }, { pill: 'Later', tone: 'offline', title: 'Standing rigging survey', system: 'Rigging', line: 'due 1 Mar · in 146 days' }] },
  { bucket: 'Done', rows: [{ pill: 'Done', tone: 'safe', title: 'Fuel filters', system: 'Engine', line: 'Marked done at 1,401 h on 28 Aug.' }] },
]
const orders = [
  { status: 'In progress', tone: 'danger', title: 'Port engine coolant temperature climbing at cruise', line: 'Engine · Urgent · on Luis Ortega · for Lauderdale Marine Service', detail: 'Past 195 F above 2,400 rpm. Strainer half blocked with weed; running her up.' },
  { status: 'Scheduled', tone: 'info', title: 'Autopilot drive belt', line: 'Steering · Low · scheduled 21 Oct · for Lauderdale Marine Service', detail: '' },
]
const history = [
  { title: 'Raw-water strainer cleaned', line: 'Engine · 1,448 h · 6 Oct · by Luis Ortega under Lauderdale Marine Service' },
  { title: 'Fuel filters', line: 'Engine · 1,401 h · 28 Aug · by Lauderdale Marine Service · 2 × Racor 2010, 1 × Volvo 3840525' },
  { title: 'Bottom paint and zincs', line: 'Hull · 1,290 h · 14 Mar · by Lauderdale Marine Service' },
  { title: 'Engine oil and filter', line: 'Engine · 1,300 h · 16 Mar · by Sam Miller · 18 L 15W-40' },
]
</script>
<style scoped>
.tm-row { display: flex; gap: 10px; align-items: flex-start; padding: 8px 0; border-top: 1px solid var(--ink-100); }
.tm-row:first-child { border-top: 0; padding-top: 0; }
.tm-row .scr-pill { margin-top: 2px; }
</style>
