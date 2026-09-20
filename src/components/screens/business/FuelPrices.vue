<template>
  <div class="scr">
    <div class="scr-head">
      <div>
        <h1 class="scr-h1">Fuel prices</h1>
        <p class="scr-sub">What you tell passing vessels your fuel costs — and whether they still believe it.</p>
      </div>
      <button class="scr-btn scr-btn--ghost scr-btn--sm">Listing</button>
    </div>

    <div class="scr-card">
      <h2 class="scr-card-title">Published by you</h2>
      <p class="scr-small scr-muted">Prices go stale after 48 hours. A wrong price is worse than no price.</p>

      <div v-if="!editing" class="scr-grid-3" style="margin-top: 12px">
        <div v-for="p in published" :key="p.label" class="scr-tele" :data-tone="p.tone">
          <span class="scr-tele-icon"><ScrIcon name="fuel" /></span>
          <span><span class="scr-small scr-muted" style="display: block">{{ p.label }}</span><span class="scr-tele-value">{{ p.value }}<small>{{ p.unit }}</small></span><span class="scr-micro scr-muted" style="display: block">{{ p.trend }}</span></span>
          <span class="scr-pill" :data-tone="p.tone || 'safe'">{{ p.status }}</span>
        </div>
      </div>
      <div v-if="!editing" class="scr-row scr-row--wrap" style="margin-top: 14px">
        <button class="scr-btn scr-btn--primary">Confirm prices — same as last time</button>
        <button class="scr-btn" @click="editing = true">Update prices</button>
      </div>

      <div v-else class="scr-stack" style="margin-top: 12px">
        <div class="scr-grid-3">
          <label v-for="p in published" :key="p.label" class="scr-field"><span class="scr-label">{{ p.label }}</span><div class="scr-row"><input class="scr-input" :value="p.value === '—' ? '' : p.value" placeholder="—" /><span class="scr-muted" style="white-space: nowrap">{{ p.unit }}</span></div><span v-if="p.pro" class="scr-hint">A Pro field — the account's subscription decides.</span></label>
        </div>
        <p class="scr-small scr-muted">Blank clears the price — vessels see nothing, never a zero. The server stamps the clock.</p>
        <div class="scr-row"><button class="scr-btn scr-btn--primary" @click="editing = false">Publish</button><button class="scr-btn scr-btn--ghost" @click="editing = false">Cancel</button></div>
      </div>
    </div>

    <div class="scr-card scr-section">
      <h2 class="scr-card-title">What vessels are reporting</h2>
      <p class="scr-small scr-muted">A separate lane. These are what people say they paid. They are not your prices and they never become them — unless you publish the same number as yours.</p>
      <p class="scr-small scr-muted" style="margin-top: 10px">Diesel: 3 reports · newest 5 h ago · Gasoline: 1 report · newest 41 h ago · unverified</p>
      <ul class="scr-stack scr-stack--tight" style="margin-top: 6px">
        <li v-for="r in reports" :key="r.when + r.grade" class="scr-row scr-row--wrap" style="padding: 8px 0; border-top: 1px solid var(--ink-100)">
          <span class="scr-strong scr-num">{{ r.price }} <span class="scr-small scr-muted" style="font-weight: 400">per gal</span></span>
          <span class="scr-small scr-muted">{{ r.grade }}</span>
          <span class="scr-pill" :data-tone="r.tone">{{ r.status }}</span>
          <span class="scr-small scr-muted">{{ r.when }}{{ r.confirmations ? ` · confirmed ${r.confirmations}×` : '' }}{{ r.note ? ` · ${r.note}` : '' }}</span>
          <span class="scr-spacer"></span>
          <button class="scr-btn scr-btn--ghost scr-btn--sm">That matches — publish it as mine</button>
        </li>
      </ul>
      <p class="scr-micro scr-muted" style="margin-top: 10px">You cannot change or remove what somebody reported. Nothing notifies you — reports appear here when you open this screen.</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const editing = ref(false)
const published = [
  { label: 'Diesel', value: '4.79', unit: ' per gal', status: 'fresh', tone: 'safe', trend: 'fresh · confirmed 6 h ago', pro: false },
  { label: 'Gasoline', value: '4.29', unit: ' per gal', status: 'ageing', tone: 'warn', trend: 'ageing · confirmed 31 h ago', pro: false },
  { label: 'Ethanol-free', value: '—', unit: ' per gal', status: 'not published', tone: 'offline', trend: 'not published', pro: true },
]
const reports = [
  { price: '4.75', grade: 'Diesel', status: 'confirmed', tone: 'accent', when: 'Oct 6, 8:14 AM', confirmations: 2, note: '' },
  { price: '4.79', grade: 'Diesel', status: 'reported', tone: 'offline', when: 'Oct 5, 6:40 PM', confirmations: 0, note: 'matches the sign' },
  { price: '4.89', grade: 'Diesel', status: 'expiring', tone: 'warn', when: 'Oct 4, 11:02 AM', confirmations: 0, note: '' },
  { price: '4.29', grade: 'Gasoline', status: 'expiring', tone: 'warn', when: 'Oct 4, 3:55 PM', confirmations: 1, note: '' },
]
</script>
