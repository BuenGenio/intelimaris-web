<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Chat</h1>
        <p class="scr-sub">The technician channel for Lauderdale Marine Service — what the office says to itself.</p>
      </div>
      <div class="scr-row"><span class="scr-pill scr-pill--bare">3 channels</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Staff</button></div>
    </div>

    <div class="cht-split">
      <nav class="scr-list" aria-label="Channels">
        <button v-for="c in channels" :key="c.name" class="scr-item scr-item--plain" :class="{ 'is-on': c.name === current }" @click="current = c.name">
          <span><span class="scr-item-title">#{{ c.name }}</span><span class="scr-item-sub">{{ c.kind }}</span></span>
          <span v-if="c.unread" class="scr-pill" data-tone="accent">{{ c.unread }}</span>
        </button>
      </nav>

      <div class="scr-card">
        <h2 class="scr-card-title">#{{ current }}</h2>
        <p class="scr-small scr-muted">Newest at the bottom, like a radio log. Read every few seconds at the cadence the service sets.</p>
        <ol class="scr-stack scr-stack--tight" style="margin-top: 12px">
          <li v-for="m in messages" :key="m.when" class="cht-msg">
            <span class="scr-row" style="gap: 6px"><span class="scr-strong" :class="{ 'scr-accent': m.me }">{{ m.who }}</span><span class="scr-micro scr-muted">{{ m.when }}</span><span v-if="m.edited" class="scr-micro scr-muted">(edited)</span></span>
            <p :class="{ 'scr-muted': m.deleted }">{{ m.body }}</p>
          </li>
        </ol>
        <div class="scr-row" style="margin-top: 14px; align-items: flex-end">
          <label class="scr-field" style="flex: 1"><span class="scr-label">Message</span><textarea class="scr-textarea" style="min-height: 56px" placeholder="Say it to the yard"></textarea><span class="scr-hint">Up to 2,000 characters.</span></label>
          <button class="scr-btn scr-btn--primary">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const current = ref('yard')
const channels = [
  { name: 'yard', kind: 'Staff channel', unread: 0 },
  { name: 'wanderer-service', kind: 'Service channel · Wanderer', unread: 2 },
  { name: 'sea-change-service', kind: 'Service channel · Sea Change', unread: 0 },
]
const messages = [
  { who: 'Luis Ortega', when: 'Oct 6, 8:12 AM', body: 'On Wanderer at Bahia Mar C-14. Coolant temp climbs past 195 F above 2,400 rpm; pulling the raw-water strainer first.', me: false, edited: false, deleted: false },
  { who: 'Sam Miller', when: 'Oct 6, 8:20 AM', body: 'Impeller for Sea Change is in the van. Dana, it is yours Tuesday.', me: true, edited: true, deleted: false },
  { who: 'Dana Whitfield', when: 'Oct 6, 8:31 AM', body: 'Copy. Tern still has nobody assigned — the float switch finding is 4 days old.', me: false, edited: false, deleted: false },
  { who: 'Marcus Bell', when: 'Oct 6, 9:04 AM', body: 'This message was deleted.', me: false, edited: false, deleted: true },
  { who: 'Luis Ortega', when: 'Oct 6, 9:47 AM', body: 'Strainer was half blocked with weed. Running her up now; will log it as a service record from the vessel side.', me: false, edited: false, deleted: false },
]
</script>
<style scoped>
.cht-split { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 16px; align-items: start; }
.scr:not(.scr--desktop) .cht-split { grid-template-columns: 1fr; }
.scr-item.is-on { background: var(--wave-50); }
.cht-msg { padding: 6px 8px; border-radius: 8px; }
.cht-msg:hover { background: var(--ink-50); }
.cht-msg p { margin-top: 2px; }
</style>
