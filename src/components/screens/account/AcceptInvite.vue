<template>
  <div class="scr">
    <div class="scr-row scr-row--between" style="margin-bottom: 14px">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Day · Dusk · Night</button>
    </div>

    <div class="scr-tabs" style="margin-bottom: 12px">
      <button v-for="s in STATES" :key="s.id" type="button" class="scr-tab" :class="{ 'is-on': state === s.id }" @click="state = s.id">{{ s.label }}</button>
    </div>

    <div v-if="state === 'signed-out'" class="scr-card scr-stack">
      <div><h1 class="scr-h2">You're invited</h1><p class="scr-sub scr-small">Sign in first, then reopen your invite link — it will join you to the account and the workspaces it names.</p></div>
      <div class="scr-dl"><dt>Invite</dt><dd class="scr-num">/invite/7f3a…c91e</dd><dt>From</dt><dd>Dana Reyes · Bahia Mar Marina</dd></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Sign in</button>
    </div>

    <div v-else-if="state === 'working'" class="scr-card scr-stack">
      <div><h1 class="scr-h2">Joining…</h1><p class="scr-sub scr-small">Redeeming your invite.</p></div>
      <div class="scr-progress"><i style="width: 55%"></i></div>
      <div class="scr-dl"><dt>Account</dt><dd>Bahia Mar Marina</dd><dt>Grants</dt><dd>Dockmaster at Bahia Mar · viewer at Wanderer</dd><dt>As</dt><dd>sam@example.com</dd></div>
    </div>

    <div v-else-if="state === 'joined'" class="scr-card scr-stack">
      <div class="scr-alert" data-tone="safe"><ScrIcon name="check" /><div><strong>Joined Bahia Mar Marina</strong><span class="scr-small">Dockmaster at Bahia Mar, viewer at Wanderer. Home now lists both.</span></div></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Go to Home</button>
    </div>

    <div v-else-if="state === 'refused'" class="scr-card scr-stack">
      <div><h1 class="scr-h2">This invite can't be used</h1><p class="scr-sub scr-small">invite is expired</p></div>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Go home</button>
      <p class="scr-micro scr-muted">Ask whoever invited you for a fresh one — invites expire, and a revoked or already-used invite stays that way.</p>
    </div>

    <div v-else class="scr-card scr-stack">
      <div><h1 class="scr-h2">Couldn't reach the workspace service</h1><p class="scr-sub scr-small">Your invite may be fine — we just couldn't ask. (network unreachable)</p></div>
      <div class="scr-row"><button type="button" class="scr-btn scr-btn--primary">Try again</button><button type="button" class="scr-btn">Go home</button></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const STATES = [
  { id: 'signed-out', label: 'Signed out' },
  { id: 'working', label: 'Joining' },
  { id: 'joined', label: 'Joined' },
  { id: 'refused', label: 'Refused' },
  { id: 'unavailable', label: 'Offline' },
]
const state = ref('working')
</script>
