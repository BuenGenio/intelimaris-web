<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Hazard reports</h1>
        <p class="scr-sub">Every community report, newest first — including the cleared and expired ones the map hides. Clearing from the app needs no account, so this queue is where a wrong clear gets caught and put back.</p>
      </div>
    </div>

    <div class="scr-toolbar">
      <span class="scr-chip" v-for="f in filters" :key="f.label" :class="{ 'is-on': f.on }">{{ f.label }} · {{ f.value }} <span aria-hidden="true">⌄</span></span>
      <span class="scr-spacer"></span>
      <span class="scr-small scr-muted">3 of 412 reports</span>
    </div>

    <div class="scr-stack">
      <article v-for="h in reports" :key="h.id" class="scr-card">
        <div class="scr-row">
          <span class="scr-item-icon haz-mark" :data-tone="h.live ? 'danger' : 'warn'"><ScrIcon :name="h.icon" /></span>
          <h2 class="scr-h3">{{ h.category }}</h2>
          <span class="scr-spacer"></span>
          <span class="scr-pill" :data-tone="h.tone">{{ h.status }}</span>
        </div>
        <p class="scr-small scr-muted haz-meta"><ScrIcon name="pin" /> <span class="scr-num">{{ h.position }}</span> · reported {{ h.reported }} · {{ h.severity }} · workspace {{ h.workspace }}…</p>
        <p v-if="h.note" class="haz-note">{{ h.note }}</p>
        <p v-else class="scr-small scr-muted haz-gap">No note was filed — the category is the whole report.</p>
        <p class="scr-muted haz-gap">{{ h.confirmations }} · {{ h.expiry }}</p>

        <div v-if="h.cleared" class="scr-alert haz-gap" :data-tone="h.cleared.untrusted ? 'warn' : undefined">
          <ScrIcon name="alert" />
          <span>{{ h.cleared.who }} · {{ h.cleared.at }}<br />{{ h.cleared.note }}</span>
        </div>

        <div class="scr-field haz-form">
          <span class="scr-ov">Reason — required, and recorded against your account</span>
          <div class="scr-textarea haz-textarea scr-muted">{{ h.cleared ? 'Why this report is coming back' : 'Why this report is false or stale' }}</div>
          <div class="scr-row">
            <button type="button" class="scr-btn scr-btn--sm" :class="{ 'scr-btn--primary': !h.cleared }"><ScrIcon v-if="h.cleared" name="back" />{{ h.cleared ? 'Put it back on the map' : 'Clear this report' }}</button>
          </div>
        </div>
      </article>
    </div>

    <div class="scr-row scr-row--between scr-section">
      <span class="scr-small scr-muted">Showing 1–3 of 412</span>
      <div class="scr-row"><button type="button" class="scr-btn scr-btn--sm" disabled>Newer</button><button type="button" class="scr-btn scr-btn--sm">Older</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const filters = [
  { label: 'Status', value: 'Every report', on: false },
  { label: 'Category', value: 'Any category', on: false },
]

const reports = [
  {
    id: 'h1', category: 'Shoaling', icon: 'wave', status: 'confirmed', tone: 'danger', live: true,
    position: '26.10412, -80.10891', reported: '38 minutes ago', severity: 'danger', workspace: 'a4f0c2e1',
    note: 'Bar has built across the south side of the Isle of Venice cut. Touched bottom at 4.5 ft on a falling tide, mid-channel reads fine.',
    confirmations: 'Confirmed 3 times, last 4 minutes ago', expiry: 'Window closes in 2 days', cleared: null,
  },
  {
    id: 'h2', category: 'Floating debris', icon: 'alert', status: 'cleared', tone: 'safe', live: false,
    position: '26.11980, -80.10322', reported: '3 hours ago', severity: 'caution', workspace: 'c91b77d0',
    note: 'Pallet and line adrift off the Bahia Mar fuel dock, drifting north with the flood.',
    confirmations: 'No confirmations — one report, one sighting', expiry: 'Window closes in 9 hours',
    cleared: { untrusted: true, who: 'Cleared from the app by “dockhand” — unverified, anyone may submit this name', at: '10/14/2026, 11:52 AM', note: 'gone' },
  },
  {
    id: 'h3', category: 'Submerged object', icon: 'anchor', status: 'expired', tone: 'offline', live: false,
    position: '26.09277, -80.11540', reported: '4 days ago', severity: 'caution', workspace: '7e2d9a13',
    note: '', confirmations: 'Confirmed once, last 3 days ago', expiry: 'Window closed 1 day ago',
    cleared: { untrusted: false, who: 'Cleared by operator sam@example.com', at: '10/11/2026, 4:20 PM', note: 'Piling removed by the county; verified on the water.' },
  },
]
</script>

<style scoped>
.haz-mark { border-radius: 50%; width: 28px; height: 28px; }
.haz-meta { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; margin-top: 4px; }
.haz-note { margin-top: 10px; padding: 9px 11px; border-radius: 8px; background: var(--ink-50); }
.haz-gap { margin-top: 10px; }
.haz-form { margin-top: 14px; }
.haz-textarea { min-height: 52px; }
</style>
