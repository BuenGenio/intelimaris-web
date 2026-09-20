<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Crew channels</h1>
        <p class="scr-sub">Talk to the people aboard Wanderer.</p>
      </div>
      <div class="scr-row"><span class="scr-pill scr-pill--bare">3 channels</span><button class="scr-btn scr-btn--ghost scr-btn--sm">Roster</button></div>
    </div>

    <div class="scr-chips scr-chips--scroll" style="margin-bottom: 12px">
      <button v-for="c in channels" :key="c.name" class="scr-chip" :class="{ 'is-on': c.name === current }" @click="current = c.name">#{{ c.name }} <span class="scr-micro" style="opacity: .7">{{ c.kind }}</span></button>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">#{{ current }}</h2>
      <p class="scr-small scr-muted">Newest at the bottom, like a radio log. Read every few seconds at the cadence the service sets.</p>
      <div class="scr-divider"></div>
      <ol class="chn-log">
        <li v-for="m in messages" :key="m.at + m.who" :class="{ 'is-me': m.me }">
          <div class="scr-row" style="gap: 6px"><span class="scr-strong" :class="{ 'scr-accent': m.me }">{{ m.who }}</span><span class="scr-micro scr-muted">{{ m.at }}</span><span v-if="m.edited" class="scr-micro scr-muted">(edited)</span></div>
          <p v-if="m.deleted" class="scr-small scr-muted" style="font-style: italic">Message deleted</p>
          <p v-else class="chn-body">{{ m.body }}</p>
        </li>
      </ol>
      <div class="scr-divider"></div>
      <label class="scr-field">
        <span class="scr-label">Message</span>
        <textarea class="scr-textarea" placeholder="Fuel dock opens at 7 — leaving at 8." style="min-height: 56px"></textarea>
        <span class="scr-hint">0 / 2000 · Enter sends</span>
      </label>
      <div class="scr-row" style="margin-top: 8px"><button class="scr-btn scr-btn--primary">Send</button><span class="scr-micro scr-muted">Posting needs a member role — viewers read.</span></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const channels = [
  { name: 'crew', kind: 'default' },
  { name: 'passage-keys', kind: 'topic' },
  { name: 'service', kind: 'yard' },
]
const current = ref('crew')
const messages = [
  { who: 'Ana Miller', at: 'Oct 13, 6:12 PM', body: 'Provisioning done. Ice in both boxes, water tanks topped up.', me: false, edited: false, deleted: false },
  { who: 'Luis Ferreira', at: 'Oct 13, 7:40 PM', body: 'Dinghy outboard ran rough — changed the plug, fine now.', me: false, edited: true, deleted: false },
  { who: 'Sam Miller', at: 'Oct 14, 6:55 AM', body: 'Fuel dock opens at 7 — leaving at 8. Bridge at Las Olas opens on the half hour.', me: true, edited: false, deleted: false },
  { who: 'Luis Ferreira', at: 'Oct 14, 7:02 AM', body: '', me: false, edited: false, deleted: true },
  { who: 'Ana Miller', at: 'Oct 14, 7:05 AM', body: 'On my way, bringing the spare impeller.', me: false, edited: false, deleted: false },
]
</script>

<style scoped>
.chn-log { display: grid; gap: 10px; }
.chn-log li { padding: 6px 8px; border-radius: var(--scr-r-sm); }
.chn-log li.is-me { background: var(--wave-50); }
.chn-body { margin-top: 2px; white-space: pre-wrap; }
</style>
