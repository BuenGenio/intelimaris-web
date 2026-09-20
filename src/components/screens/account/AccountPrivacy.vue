<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acv-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Privacy' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Your card</h2><p class="scr-small scr-muted">{{ COPY[visibility] }}</p></div>
      <div class="scr-field">
        <span class="scr-label">Who can see it</span>
        <div class="scr-stack scr-stack--tight">
          <button v-for="o in OPTIONS" :key="o.id" type="button" class="scr-row acv-opt" :class="{ 'is-on': visibility === o.id }" @click="visibility = o.id">
            <span class="scr-radio" :class="{ 'is-on': visibility === o.id }"></span><span class="scr-small">{{ o.label }}</span>
          </button>
        </div>
      </div>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Contact details</h2><p class="scr-small scr-muted">Separate from the setting above: seeing your face on a crew list is not consent to hold your phone number.</p></div>
      <label class="scr-row acv-toggle" :class="{ 'is-off': hidden }">
        <button type="button" class="scr-switch" :class="{ 'is-on': showEmail && !hidden }" :disabled="hidden" @click="showEmail = !showEmail"></button>
        <span><span class="scr-strong scr-small">Show my email</span><span class="scr-item-sub">{{ hidden ? 'Nobody can see your card while it is private.' : 'On your card, to whoever can see it.' }}</span></span>
      </label>
      <label class="scr-row acv-toggle" :class="{ 'is-off': hidden }">
        <button type="button" class="scr-switch" :class="{ 'is-on': showPhone && !hidden }" :disabled="hidden" @click="showPhone = !showPhone"></button>
        <span><span class="scr-strong scr-small">Show my phone number</span><span class="scr-item-sub">{{ hidden ? 'Nobody can see your card while it is private.' : 'On your card, to whoever can see it.' }}</span></span>
      </label>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">What is never on your card</h2>
      <ul class="scr-small scr-muted acv-never">
        <li>Your emergency contact.</li>
        <li>The reference numbers on your certificates — only which ones you hold.</li>
        <li>Your About text.</li>
      </ul>
    </div>

    <div class="scr-section scr-card scr-card--dark">
      <p class="scr-ov">How your card reads now</p>
      <div class="scr-row" style="margin-top: 8px">
        <span class="scr-avatar" style="background: #fff; color: var(--navy)">SM</span>
        <div><p class="scr-strong" style="color: #fff">Sam Miller</p><p class="scr-small scr-muted">Coastal cruising · Fort Lauderdale</p></div>
      </div>
      <p class="scr-small scr-muted" style="margin-top: 8px">{{ hidden ? 'Hidden — name only on member lists.' : `${showEmail ? 'sam@example.com' : 'Email hidden'} · ${showPhone ? '+1 305 555 0123' : 'Phone hidden'}` }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
const OPTIONS = [
  { id: 'private', label: 'Only you' },
  { id: 'workspaces', label: 'People in my workspaces' },
  { id: 'platform', label: 'Anyone signed in' },
] as const
const COPY: Record<string, string> = {
  private: 'Nobody sees your card. Your name still appears on member lists — a workspace cannot have anonymous members.',
  workspaces: 'Anyone who shares a workspace with you sees your photo, headline and home port. The default.',
  platform: 'For people who want to be found — delivery skippers, technicians looking for work.',
}
const visibility = ref<'private' | 'workspaces' | 'platform'>('workspaces')
const hidden = computed(() => visibility.value === 'private')
const showEmail = ref(true)
const showPhone = ref(false)
</script>

<style scoped>
.acv-tabs { margin: 12px 0; }
.acv-opt { padding: 9px 12px; border: 1px solid var(--ink-200); border-radius: var(--scr-r-sm); background: var(--ink-0); text-align: left; cursor: pointer; width: 100%; }
.acv-opt.is-on { border-color: var(--wave); background: var(--wave-50); }
.acv-toggle { align-items: flex-start; padding: 6px 0; }
.acv-toggle.is-off > span { opacity: 0.6; }
.acv-never { display: grid; gap: 4px; padding-left: 14px; list-style: disc; }
</style>
