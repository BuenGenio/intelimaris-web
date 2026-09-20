<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Maintenance</h1>
        <p class="scr-sub">What is due, what needs doing, what was done, and who serves her.</p>
      </div>
      <span class="scr-pill scr-pill--bare scr-num"><ScrIcon name="clock" />1,284 h</span>
    </div>

    <div class="scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Due</h2><p class="scr-sub scr-small">Reminders count down in engine hours, dates, or both — and say which fires first.</p></div>
        <button class="scr-btn scr-btn--sm"><ScrIcon name="plus" /></button>
      </div>
      <template v-for="b in buckets" :key="b.label">
        <p class="scr-ov" style="margin: 12px 0 4px">{{ b.label }}</p>
        <div v-for="r in b.rows" :key="r.title" class="scr-kv" style="align-items: center">
          <span><span class="scr-item-title">{{ r.title }}</span><span class="scr-item-sub">{{ r.line }}</span></span>
          <span class="scr-row"><span class="scr-pill" :data-tone="r.tone">{{ r.state }}</span><button v-if="b.label !== 'Done'" class="scr-btn scr-btn--primary scr-btn--sm">Mark done</button></span>
        </div>
      </template>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Work orders</h2><p class="scr-sub scr-small">What needs doing — raised by the crew, or found by a technician.</p></div>
        <button class="scr-btn scr-btn--sm">Raise one</button>
      </div>
      <div class="scr-divider"></div>
      <div v-for="o in orders" :key="o.title" class="scr-kv" style="align-items: center">
        <span><span class="scr-item-title">{{ o.title }}</span><span class="scr-item-sub">{{ o.line }}</span></span>
        <span class="scr-row"><span class="scr-pill" :data-tone="o.tone">{{ o.status }}</span><button class="scr-btn scr-btn--ghost scr-btn--sm">{{ o.move }}</button></span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-card-title">Service history</h2><p class="scr-sub scr-small">What was done, by whom, at what hours — and under which yard when a technician did it.</p></div>
        <button class="scr-btn scr-btn--sm">Log service</button>
      </div>
      <div class="scr-divider"></div>
      <div v-for="r in records" :key="r.title" class="scr-kv">
        <span><span class="scr-item-title">{{ r.title }}</span><span class="scr-item-sub">{{ r.line }}</span></span>
        <span class="scr-num scr-muted scr-small">{{ r.hours }}</span>
      </div>
    </div>

    <div class="scr-section scr-card">
      <h2 class="scr-card-title">Who serves her</h2>
      <p class="scr-small scr-muted" style="margin-bottom: 6px">A maintenance company you engage assigns its technicians; they see monitoring, this door and a service channel — not the crew.</p>
      <div class="scr-kv" style="align-items: center">
        <span><span class="scr-item-title">Lauderdale Marine Service</span><span class="scr-item-sub">Active since 6 Oct · 2 technicians assigned</span></span>
        <span class="scr-row"><span class="scr-pill" data-tone="safe">Active</span><button class="scr-btn scr-btn--ghost scr-btn--sm">End</button></span>
      </div>
      <div class="scr-divider"></div>
      <p class="scr-h3" style="margin-bottom: 8px">Find a company</p>
      <div class="scr-stack scr-stack--tight">
        <input class="scr-input scr-input--search" placeholder="diesel, rigging, a yard's name" />
        <div class="scr-row"><input class="scr-input scr-num" placeholder="ATMS-4KJ8" style="flex: 1" /><button class="scr-btn">Request</button></div>
        <p class="scr-hint">Or by their code. A yard reads it out; eight characters, no I, O, 0 or 1.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const buckets = [
  { label: 'Due now', rows: [
    { title: 'Engine oil and filter', line: 'Every 100 h · due at 1,280 h · hours fire first', state: 'Overdue 4 h', tone: 'danger' },
  ] },
  { label: 'Coming up', rows: [
    { title: 'Raw water impeller', line: 'Every 12 months · due 2 Nov 2026', state: '19 days', tone: 'warn' },
    { title: 'Fuel filters (primary)', line: 'Every 200 h · due at 1,340 h', state: '56 h', tone: 'warn' },
  ] },
  { label: 'Later', rows: [
    { title: 'Standing rigging inspection', line: 'Every 24 months · due 14 Mar 2027', state: '5 months', tone: '' },
    { title: 'Antifoul and anodes', line: 'Every 12 months · due 20 Apr 2027', state: '6 months', tone: '' },
  ] },
  { label: 'Done', rows: [
    { title: 'Coolant check', line: 'Done 9 Oct at 1,281 h · logged', state: 'Done', tone: 'safe' },
  ] },
]
const orders = [
  { title: 'Bilge pump float switch sticks', line: 'Found by Lauderdale Marine Service · 11 Oct', status: 'Scheduled', tone: 'info', move: 'Start' },
  { title: 'Replace nav light lens, port', line: 'Raised by Ana Miller · 8 Oct', status: 'Open', tone: 'warn', move: 'Schedule' },
  { title: 'Autopilot drive noise', line: 'Raised by Sam Miller · 5 Oct', status: 'In progress', tone: 'accent', move: 'Done' },
]
const records = [
  { title: 'Coolant check', line: 'Sam Miller · 9 Oct 2026', hours: '1,281 h' },
  { title: 'Raw water impeller replaced', line: 'Luis Ferreira · 11 Oct 2026', hours: '1,283 h' },
  { title: 'Alternator belt tensioned', line: 'Lauderdale Marine Service · 6 Oct 2026', hours: '1,279 h' },
  { title: 'Engine oil and filter', line: 'Sam Miller · 12 Aug 2026', hours: '1,180 h' },
]
</script>
