<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Staff</h1>
        <p class="scr-sub">Everyone in Bahia Mar, who is on the dock right now, and what they can do.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill" data-tone="safe">3 on duty</span>
        <button type="button" class="scr-btn scr-btn--ghost">Chat</button>
      </div>
    </div>

    <div class="scr-split">
      <div class="scr-stack">
        <div class="scr-card">
          <div class="scr-row scr-row--between">
            <p class="scr-card-title">On duty now</p>
            <button type="button" class="scr-btn scr-btn--sm">Clock off</button>
          </div>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">The shifts lane's answer, longest-on first. A member who has not clocked on is not on duty however senior they are.</p>
          <ul>
            <li v-for="m in onDuty" :key="m.name" class="sd-row">
              <span class="scr-strong">{{ m.name }}</span>
              <span class="scr-pill">{{ m.role }}</span>
              <span class="scr-small scr-muted scr-num">on for {{ m.onFor }} · since {{ m.since }}</span>
              <span v-if="m.note" class="scr-small scr-muted">— {{ m.note }}</span>
              <button v-if="m.name !== 'You'" type="button" class="scr-btn scr-btn--ghost scr-btn--sm" style="margin-left: auto">Clock off</button>
            </li>
          </ul>
        </div>

        <div class="scr-card">
          <p class="scr-card-title">Today's shift log</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">Every shift that started since midnight, newest first — open ones still running.</p>
          <ul>
            <li v-for="s in log" :key="s.name + s.start" class="sd-row">
              <span class="scr-strong">{{ s.name }}</span>
              <span class="scr-pill" :data-tone="s.end ? undefined : 'safe'">{{ s.end ? 'Closed' : 'Open' }}</span>
              <span class="scr-small scr-muted scr-num">{{ s.start }}<template v-if="s.end"> – {{ s.end }}</template> · {{ s.dur }}</span>
              <span v-if="s.note" class="scr-small scr-muted">— {{ s.note }}</span>
              <span v-if="s.endedBy" class="scr-small scr-muted">clocked off by {{ s.endedBy }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="scr-stack">
        <div class="scr-card">
          <p class="scr-card-title">Invite code</p>
          <p class="scr-sub scr-small" style="margin-bottom: 8px">Anyone with this code can join as a member. Rotate it if it gets out.</p>
          <div class="scr-row"><span class="scr-input scr-num" style="letter-spacing: 0.12em; font-weight: 700">BM-4K7Q-2R</span><button type="button" class="scr-btn scr-btn--sm">Rotate</button></div>
        </div>
        <div class="scr-card">
          <p class="scr-card-title">People</p>
          <p class="scr-sub scr-small" style="margin-bottom: 6px">6 in this workspace</p>
          <ul>
            <li v-for="p in people" :key="p.name" class="sd-row">
              <span class="scr-avatar">{{ p.initials }}</span>
              <div style="min-width: 0"><span class="scr-item-title">{{ p.name }}</span><span class="scr-item-sub">{{ p.email }}</span></div>
              <span v-if="p.onDuty" class="scr-pill" data-tone="safe">On duty</span>
              <span v-if="p.invited" class="scr-pill" data-tone="warn">Invited</span>
              <span class="scr-pill" :data-tone="p.role === 'Owner' ? 'accent' : undefined" style="margin-left: auto">{{ p.role }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const onDuty = [
  { name: 'Rosa Delgado', role: 'Admin', onFor: '7 h 12 min', since: '06:00', note: 'Dockmaster, VHF 71' },
  { name: 'You', role: 'Staff', onFor: '5 h 40 min', since: '07:32', note: 'Fuel dock till 14:00' },
  { name: 'Luis Ortega', role: 'Staff', onFor: '3 h 05 min', since: '10:07', note: 'C and D docks' },
]
const log = [
  { name: 'Luis Ortega', start: '10:07', end: '', dur: '3 h 05 min', note: 'C and D docks', endedBy: '' },
  { name: 'You', start: '07:32', end: '', dur: '5 h 40 min', note: 'Fuel dock till 14:00', endedBy: '' },
  { name: 'Rosa Delgado', start: '06:00', end: '', dur: '7 h 12 min', note: 'Dockmaster, VHF 71', endedBy: '' },
  { name: 'Marcus Lee', start: '22:00', end: '06:05', dur: '8 h 05 min', note: 'Night desk', endedBy: 'Rosa Delgado' },
]
const people = [
  { name: 'Rosa Delgado', initials: 'RD', email: 'rosa@bahiamar.example', role: 'Owner', onDuty: true, invited: false },
  { name: 'Sam Miller', initials: 'SM', email: 'sam@example.com', role: 'Staff', onDuty: true, invited: false },
  { name: 'Luis Ortega', initials: 'LO', email: 'luis@bahiamar.example', role: 'Staff', onDuty: true, invited: false },
  { name: 'Marcus Lee', initials: 'ML', email: 'marcus@bahiamar.example', role: 'Staff', onDuty: false, invited: false },
  { name: 'Priya Nair', initials: 'PN', email: 'priya@bahiamar.example', role: 'Admin', onDuty: false, invited: false },
  { name: 'Tom Alvarez', initials: 'TA', email: 'tom.alvarez@example.com', role: 'Viewer', onDuty: false, invited: true },
]
</script>

<style scoped>
.sd-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; padding: 9px 0; border-top: 1px solid var(--ink-100); }
.sd-row:first-child { border-top: 0; }
</style>
