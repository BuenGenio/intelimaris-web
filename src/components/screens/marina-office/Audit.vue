<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Audit</h1>
        <p class="scr-sub">Who changed what, when, and through which door — the operator's own view of it, not the console's.</p>
      </div>
      <div class="scr-row"><span class="scr-pill" data-tone="warn">Scaffold</span><button type="button" class="scr-btn scr-btn--ghost"><ScrIcon name="download" /> Export</button></div>
    </div>

    <div class="scr-toolbar">
      <input class="scr-input scr-input--search" style="max-width: 280px" placeholder="Person, record or action" aria-label="Search the audit log" />
      <span class="scr-chip is-on">All</span>
      <span v-for="d in doors" :key="d" class="scr-chip">{{ d }}</span>
      <span class="scr-spacer"></span>
      <span class="scr-chip"><ScrIcon name="calendar" /> Last 7 days</span>
    </div>

    <table class="scr-table">
      <thead><tr><th>When</th><th>Who</th><th>Action</th><th>Record</th><th>Change</th><th>Door</th></tr></thead>
      <tbody>
        <tr v-for="e in events" :key="e.when + e.record">
          <td class="scr-num scr-muted">{{ e.when }}</td>
          <td><span class="scr-row" style="gap: 6px"><span class="scr-avatar" style="width: 24px; height: 24px; font-size: 10px">{{ e.initials }}</span>{{ e.who }}</span></td>
          <td><span class="scr-pill" :data-tone="e.tone">{{ e.action }}</span></td>
          <td class="scr-strong">{{ e.record }}</td>
          <td class="scr-small">{{ e.change }}</td>
          <td class="scr-muted">{{ e.door }}</td>
        </tr>
      </tbody>
    </table>
    <p class="scr-micro scr-muted" style="margin-top: 8px">Every write the workspace makes lands here with the member, the role they held at the time, and the screen it came through. Nothing in this log can be edited or deleted.</p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const doors = ['Bookings', 'Finance', 'Rates', 'Settings']
const events = [
  { when: '14 Oct 09:41', who: 'Dockmaster', initials: 'DK', action: 'Confirmed', tone: 'safe', record: 'Stay · Wanderer · C-14', change: 'Requested → confirmed · 16–19 Oct', door: 'Bookings' },
  { when: '14 Oct 09:12', who: 'Front desk', initials: 'FD', action: 'Sent', tone: 'info', record: 'Message · Sam Miller', change: 'Arrival instructions · C-14 · email', door: 'Messages' },
  { when: '13 Oct 17:30', who: 'Accounts', initials: 'AC', action: 'Changed', tone: 'warn', record: 'Rate band · Boat show week', change: '$8.50 → $9.00 per ft per night', door: 'Rates' },
  { when: '13 Oct 16:05', who: 'Front desk', initials: 'FD', action: 'Raised', tone: 'info', record: 'Credit note · CN-2026-0031', change: '$18.00 against INV-2026-0418', door: 'Finance' },
  { when: '13 Oct 11:20', who: 'Owner', initials: 'OW', action: 'Corrected', tone: 'warn', record: 'Profile · Approach depth', change: '2.1 m (imported) → 2.4 m · datum MLLW', door: 'Settings' },
  { when: '12 Oct 10:04', who: 'Dockmaster', initials: 'DK', action: 'Took', tone: 'safe', record: 'Receipt · RCP-3391', change: '$486.20 · card · settles INV-2026-0418', door: 'Finance' },
  { when: '12 Oct 08:52', who: 'Owner', initials: 'OW', action: 'Granted', tone: 'high', record: 'Member · Luis Vega', change: 'Role dockhand → dockmaster', door: 'Settings' },
  { when: '11 Oct 16:20', who: 'Accounts', initials: 'AC', action: 'Issued', tone: 'info', record: 'Invoice · INV-2026-0417', change: '$8,640.00 · Blue Water Yacht Management', door: 'Finance' },
]
</script>
