<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acs-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Emergency contact' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack">
      <div class="scr-row scr-row--between">
        <h2 class="scr-h3">Emergency contact</h2>
        <span class="scr-pill" :data-tone="set ? 'safe' : 'warn'">{{ set ? 'Set' : 'Not set' }}</span>
      </div>
      <p class="scr-small scr-muted">Shown to an owner or admin of a workspace you are in, and to a marina you have a confirmed booking with. Never on your public card.</p>
      <label class="scr-field"><span class="scr-label">Name</span><input class="scr-input" :value="set ? 'Ana Miller' : ''" placeholder="Ana Trotsan" readonly /></label>
      <label class="scr-field"><span class="scr-label">Phone</span><input class="scr-input scr-num" :value="set ? '+1 954 555 0134' : ''" placeholder="+1 954 555 0134" readonly /><span class="scr-hint">Include the country code — whoever calls may not be in your country.</span></label>
      <label class="scr-field"><span class="scr-label">Relationship</span><input class="scr-input" :value="set ? 'Partner' : ''" placeholder="Partner" readonly /><span class="scr-hint">Optional. It tells whoever calls how to open the conversation.</span></label>
      <p v-if="!set" class="scr-micro scr-muted">An emergency contact needs both a name and a number — or leave all of it empty.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">Who can read it</h2>
      <ul class="scr-list">
        <li class="scr-item"><span class="scr-item-icon" style="color: #4274bb"><ScrIcon name="vessel" /></span><span><span class="scr-item-title">Wanderer</span><span class="scr-item-sub">Owner and admins · 2 people</span></span><span class="scr-item-end"><ScrIcon name="check" /></span></li>
        <li class="scr-item"><span class="scr-item-icon" style="color: #14919b"><ScrIcon name="anchor" /></span><span><span class="scr-item-title">Bahia Mar</span><span class="scr-item-sub">Confirmed booking · C-14, 12–14 Oct</span></span><span class="scr-item-end"><ScrIcon name="check" /></span></li>
        <li class="scr-item"><span class="scr-item-icon"><ScrIcon name="user" /></span><span><span class="scr-item-title">Your public card</span><span class="scr-item-sub">Never</span></span><span class="scr-item-end"><ScrIcon name="x" /></span></li>
      </ul>
    </div>

    <div class="scr-bar">
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">{{ set ? 'Save contact' : 'Remove contact' }}</button>
      <button type="button" class="scr-btn scr-btn--ghost" @click="set = !set">{{ set ? 'Clear' : 'Fill' }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const set = ref(true)
</script>

<style scoped>
.acs-tabs { margin: 12px 0; }
</style>
