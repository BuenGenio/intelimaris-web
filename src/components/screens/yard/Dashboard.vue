<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Lauderdale Marine Service</h1>
        <p class="scr-sub">For maintenance companies working across vessels.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="accent">Maintenance</span><span class="scr-pill scr-pill--bare">Owner</span></div>
    </div>
    <p class="scr-small scr-muted">Account: <a href="#">Lauderdale Marine Service · Business</a></p>

    <div class="scr-kpis scr-section">
      <div class="scr-stat"><span class="scr-stat-label">Vessels served</span><span class="scr-stat-value">4</span><span class="scr-stat-delta">active engagements</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Due now</span><span class="scr-stat-value">3</span><span class="scr-stat-delta" data-tone="warn">reminders across them</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Open work orders</span><span class="scr-stat-value">5</span><span class="scr-stat-delta">across them</span></div>
      <div class="scr-stat"><span class="scr-stat-label">Waiting on you</span><span class="scr-stat-value">1</span><span class="scr-stat-delta" data-tone="warn">engagement requests</span></div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Requests</h2>
      <p class="scr-small scr-muted">Engagements waiting on one side or the other.</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 10px">
        <li class="scr-row"><span class="scr-pill" data-tone="warn">Requested</span><span><span class="scr-strong">Halcyon</span><br /><span class="scr-small scr-muted">Requested by them · waiting on you · since 3 Oct</span></span><span class="scr-spacer"></span><button class="scr-btn scr-btn--primary scr-btn--sm">Accept</button><button class="scr-btn scr-btn--ghost scr-btn--sm">Decline</button></li>
        <li class="scr-row"><span class="scr-pill" data-tone="info">Requested</span><span><span class="scr-strong">Kestrel</span><br /><span class="scr-small scr-muted">Requested by you · waiting on them · since 5 Oct</span></span><span class="scr-spacer"></span><button class="scr-btn scr-btn--ghost scr-btn--sm">Withdraw</button></li>
      </ul>
    </div>

    <div class="scr-card scr-section">
      <div class="scr-row scr-row--between"><div><h2 class="scr-card-title">Vessels you serve</h2><p class="scr-small scr-muted">Each with her hours clock, the newest model claim, what is due and what is open.</p></div><button class="scr-btn scr-btn--ghost scr-btn--sm">The worklist</button></div>
      <div class="scr-grid-2" style="margin-top: 12px">
        <div v-for="v in vessels" :key="v.name" class="scr-card">
          <div class="scr-row scr-row--between"><div><a href="#" class="scr-strong">{{ v.name }}</a><br /><span class="scr-small scr-muted">{{ v.hours }} · {{ v.techs }}</span></div><span class="scr-pill" :data-tone="v.claimTone">{{ v.claim }}</span></div>
          <ul class="scr-stack scr-stack--tight" style="margin-top: 8px">
            <li v-for="r in v.rows" :key="r.title" class="scr-row"><span class="scr-pill" :data-tone="r.tone">{{ r.pill }}</span><span class="scr-small"><span class="scr-strong">{{ r.title }}</span> <span class="scr-muted">{{ r.system }}</span><br /><span class="scr-muted">{{ r.line }}</span></span></li>
          </ul>
          <p v-if="v.rows.length === 0" class="scr-small scr-muted" style="margin-top: 8px">Nothing due, nothing open.</p>
          <p v-if="v.techs === 'no technician assigned'" class="scr-small" style="margin-top: 8px"><a href="#">Assign a technician</a> so someone can work her.</p>
        </div>
      </div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Serve another vessel</h2>
      <p class="scr-small scr-muted">Ask a vessel owner for their join code and request an engagement; they accept it on their Maintenance door.</p>
      <div class="scr-row" style="margin-top: 10px; align-items: flex-end">
        <label class="scr-field" style="flex: 1; max-width: 260px"><span class="scr-label">The vessel's join code</span><input class="scr-input" value="WAYZ-3K7M" readonly /><span class="scr-hint">Eight characters; no I, O, 0 or 1.</span></label>
        <button class="scr-btn">Request</button>
      </div>
      <p class="scr-small scr-muted" style="margin-top: 10px">Your own code is <span class="scr-strong scr-num">LMS-7Q2X</span> — a vessel owner who has it can engage you without the directory. Switch the directory listing on under <a href="#">Settings · Company</a> to be found by search.</p>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">Past engagements</h2>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 8px">
        <li class="scr-row"><span class="scr-pill" data-tone="offline">Ended</span><span><span class="scr-strong">Osprey</span><br /><span class="scr-small scr-muted">Vessel sold · since 12 Feb</span></span></li>
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const vessels = [
  { name: 'Wanderer', hours: '1,448 h', techs: '1 technician', claim: 'Overheat risk · engine-thermal', claimTone: 'warn', rows: [
    { pill: 'In progress', tone: 'danger', title: 'Port engine coolant temperature climbing at cruise', system: 'Engine', line: 'Engine · Urgent · on Luis Ortega' },
    { pill: 'Coming up', tone: 'warn', title: 'Engine oil and filter', system: 'Engine', line: 'due at 1,500 h · 52 h to go · and 22 Oct' },
  ] },
  { name: 'Sea Change', hours: '2,930 h', techs: '2 technicians', claim: 'Bilge cycling · bilge-pattern', claimTone: 'offline', rows: [
    { pill: 'Overdue', tone: 'danger', title: 'Raw-water impeller', system: 'Engine', line: 'due 30 Sep · 4 days ago' },
    { pill: 'Scheduled', tone: 'info', title: 'Replace raw-water impeller', system: 'Engine', line: 'Engine · Normal · scheduled 14 Oct · on Dana Whitfield' },
  ] },
  { name: 'Tern', hours: 'hours unknown', techs: 'no technician assigned', claim: 'No model claim', claimTone: 'offline', rows: [
    { pill: 'Open', tone: 'warn', title: 'Bilge pump float switch intermittent', system: 'Electrical', line: "Electrical · High · a technician's finding" },
    { pill: 'Due', tone: 'warn', title: 'Zincs', system: 'Hull', line: 'due 18 Oct · in 12 days' },
  ] },
  { name: 'Blue Hour', hours: '2,014 h', techs: '1 technician', claim: 'Battery ageing · battery-health', claimTone: 'offline', rows: [
    { pill: 'Open', tone: 'offline', title: 'Shore power inlet corroded', system: 'Electrical', line: 'Electrical · Normal · on Marcus Bell' },
  ] },
]
</script>
