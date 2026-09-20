<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Chat</h1>
        <p class="scr-sub">The staff channel for Bahia Mar — what the office says to itself.</p>
      </div>
      <div class="scr-row">
        <span class="scr-pill">2 channels</span>
        <button type="button" class="scr-btn scr-btn--ghost">Staff</button>
      </div>
    </div>

    <div class="sc-layout">
      <nav class="scr-stack scr-stack--tight" aria-label="Channels">
        <button v-for="c in channels" :key="c.name" type="button" class="sc-chan" :class="{ 'is-on': c.name === channel }" @click="channel = c.name">
          <span class="scr-strong">#{{ c.name }}</span><span class="scr-item-sub">{{ c.kind }} · {{ c.count }} messages</span>
        </button>
      </nav>

      <div class="scr-card">
        <p class="scr-card-title">#{{ channel }}</p>
        <p class="scr-sub scr-small">Newest at the bottom, like a radio log. Read every few seconds at the cadence the service sets.</p>
        <div class="scr-divider"></div>
        <ul class="scr-stack" style="gap: 10px">
          <li v-for="m in messages" :key="m.at + m.who">
            <div class="scr-row" style="gap: 8px"><span class="scr-strong" :class="{ 'scr-accent': m.who === 'You' }">{{ m.who }}</span><span class="scr-micro scr-muted scr-num">{{ m.at }}</span><span v-if="m.edited" class="scr-micro scr-muted">edited</span></div>
            <p style="white-space: pre-wrap">{{ m.body }}</p>
          </li>
        </ul>
        <div class="sc-compose">
          <div class="scr-field">
            <span class="scr-label">Message</span>
            <textarea class="scr-textarea" placeholder="Fuel dock opens at 7 — leaving at 8."></textarea>
            <span class="scr-hint scr-num">0 / 2000 · Enter sends</span>
          </div>
          <div class="scr-row"><button type="button" class="scr-btn scr-btn--primary">Send</button></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const channel = ref('staff')
const channels = [
  { name: 'staff', kind: 'Staff', count: 214 },
  { name: 'night-desk', kind: 'Topic', count: 38 },
]
const messages = [
  { who: 'Rosa Delgado', at: 'Oct 4, 12:48', body: 'Sea Change is moving to D-07 tomorrow at 15:00, no charge. Luis, can you have the fenders out on the piling side?', edited: false },
  { who: 'Luis Ortega', at: 'Oct 4, 12:51', body: 'Will do. C-14 pedestal: breaker is toast, swapping it now. Should be live by 14:00.', edited: false },
  { who: 'You', at: 'Oct 4, 13:22', body: 'Gate code sent to Wanderer (Sam Miller). ETA now 21:30, draft 4.6 ft so C-14 is fine on the low.', edited: true },
  { who: 'Marcus Lee', at: 'Oct 4, 13:30', body: 'Pump-out cart coupling still leaking. Part is on order, use the D dock cart until Thursday.', edited: false },
  { who: 'Rosa Delgado', at: 'Oct 4, 13:41', body: 'Wind 25 kn from the east after 22:00 tonight. Night desk, please walk the T-head and A dock cats before midnight.', edited: false },
]
</script>

<style scoped>
.sc-layout { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: 14px; align-items: start; }
.sc-chan { display: grid; text-align: left; padding: 8px 10px; border: 0; border-radius: 8px; background: transparent; cursor: pointer; color: var(--ink-500); }
.sc-chan.is-on { background: var(--ink-0); color: var(--ink-900); box-shadow: inset 0 0 0 1px var(--ink-200); }
.sc-compose { display: grid; gap: 8px; margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--ink-100); }
</style>
