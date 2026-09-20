<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Notifications</h1><p class="scr-sub">Invites, requests, bookings and claims — everything that was sent to you, in one place.</p></div>
      <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="settings" /></button>
    </div>

    <div class="scr-chips scr-chips--scroll" style="margin-bottom: 12px">
      <button v-for="f in FILTERS" :key="f" type="button" class="scr-chip" :class="{ 'is-on': filter === f }" @click="filter = f">{{ f }}</button>
    </div>

    <div class="scr-card scr-card--flush">
      <div style="padding: 12px 14px 4px"><h2 class="scr-h3">Inbox</h2><p class="scr-small scr-muted">Newest first, one row per channel. A row says whether it was sent, is still queued, failed, or was skipped because you switched that channel off.</p></div>
      <ul class="scr-list" style="border: 0; border-radius: 0">
        <li v-for="n in shown" :key="n.subject + n.channel" class="scr-item scr-item--plain">
          <span>
            <span class="scr-item-title">{{ n.subject }}</span>
            <span class="scr-item-sub nt-body">{{ n.body }}</span>
            <span class="scr-item-sub">{{ n.kind }} · {{ n.channel }} · {{ n.age }}</span>
            <span v-if="n.note" class="scr-item-sub">{{ n.note }}</span>
          </span>
          <span class="scr-pill" :data-tone="n.tone">{{ n.status }}</span>
        </li>
      </ul>
      <div class="scr-row scr-row--between" style="padding: 8px 14px 12px">
        <span class="scr-micro scr-muted"><span class="scr-num">{{ shown.length }}</span> of <span class="scr-num">{{ ROWS.length }}</span> rows</span>
        <button type="button" class="scr-btn scr-btn--sm">Older</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const FILTERS = ['All', 'Email', 'Push']
const filter = ref('All')
const ROWS = [
  { subject: 'Berth C-14 is confirmed', body: 'Bahia Mar confirmed Wanderer for 12–14 Oct. Approach depth 8 ft MLLW, call VHF 71 on arrival.', kind: 'Stay confirmed', channel: 'Push', age: '4 min ago', status: 'Sent', tone: 'safe' },
  { subject: 'Berth C-14 is confirmed', body: 'Bahia Mar confirmed Wanderer for 12–14 Oct. Approach depth 8 ft MLLW, call VHF 71 on arrival.', kind: 'Stay confirmed', channel: 'Email', age: '4 min ago', status: 'Sent', tone: 'safe' },
  { subject: 'Dana Reyes invited you to Bahia Mar Marina', body: 'Dockmaster at Bahia Mar, viewer at Wanderer. The invite is open for 7 days.', kind: 'Invite created', channel: 'Email', age: '2 h ago', status: 'Sent', tone: 'safe' },
  { subject: 'Join request approved', body: 'You are now crew on Wanderer. The vessel workspace is on your Home.', kind: 'Join request approved', channel: 'Push', age: 'Yesterday', status: 'Queued', tone: 'offline' },
  { subject: 'Claim verdict: Coconuts', body: 'Your claim on the Coconuts listing was accepted. The listing is yours to edit.', kind: 'Claim accepted', channel: 'Push', age: '2 d ago', status: 'Skipped', tone: 'warn', note: 'Push is switched off on this account.' },
  { subject: 'Isle of Venice dock: a guest asked for Sat 3 Oct', body: 'Marlin, 38 ft, draft 3.9 ft, one night. Answer within 24 h or the request lapses.', kind: 'Stay requested', channel: 'Email', age: '3 d ago', status: 'Failed', tone: 'danger', note: 'Mailbox refused the message (550). Not retried.' },
]
const shown = computed(() => ROWS.filter((r) => filter.value === 'All' || r.channel === filter.value))
</script>

<style scoped>
.nt-body { color: var(--ink-700); }
</style>
