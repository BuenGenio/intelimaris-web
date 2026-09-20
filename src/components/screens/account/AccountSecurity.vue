<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-row">
      <span class="scr-avatar scr-avatar--lg">SM</span>
      <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
    </div>
    <div class="scr-chips scr-chips--scroll acy-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Sign-in and security' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Signed in as</h2><p class="scr-small scr-muted">The identity behind this session.</p></div>
      <div class="scr-row"><span class="scr-small scr-strong">sam@example.com</span><span class="scr-pill" data-tone="safe">Verified sign-in</span></div>
      <div class="scr-dl"><dt>Phone</dt><dd class="scr-num">+1 305 555 0123 · verified</dd><dt>Session started</dt><dd>Today, 09:12</dd></div>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Password, two-factor and passkeys</h2><p class="scr-small scr-muted">Changed in your account console, which is the only place that holds them.</p></div>
      <ul class="scr-list">
        <li class="scr-item"><span class="scr-item-icon" data-tone="safe"><ScrIcon name="lock" /></span><span><span class="scr-item-title">Two-factor</span><span class="scr-item-sub">Authenticator app · set up 14 Sep 2026</span></span><span class="scr-pill" data-tone="safe">On</span></li>
        <li class="scr-item"><span class="scr-item-icon"><ScrIcon name="phone" /></span><span><span class="scr-item-title">Passkeys</span><span class="scr-item-sub">Sam's iPhone · 1 passkey</span></span><span class="scr-pill scr-pill--bare" data-tone="info">1</span></li>
      </ul>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Open account security</button>
      <p class="scr-micro scr-muted">Opens id.waterwayz.dev in a new tab.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Your name and email</h2><p class="scr-small scr-muted">The name on the account, and the address you sign in with.</p></div>
      <button type="button" class="scr-btn scr-btn--block">Open account details</button>
      <p class="scr-micro scr-muted">Changing your email re-verifies it. The display name on your InteliMaris profile is separate, and lives under Profile.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">Devices and sessions</h2>
      <p class="scr-small scr-muted">Signing out ends this browser’s session and clears its stored tokens. To see every device you are signed in on, and end those, use the account console.</p>
      <button type="button" class="scr-btn scr-btn--block">Sign out</button>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <h2 class="scr-h3">What we hold, and what we do not</h2>
      <ul class="scr-small scr-muted acy-list">
        <li>We never see or store your password.</li>
        <li>Two-factor, passkeys and active sessions are your provider’s.</li>
        <li>Your InteliMaris profile — name, photo, units, contact — is ours, and lives under Profile.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
</script>

<style scoped>
.acy-tabs { margin: 12px 0; }
.acy-list { display: grid; gap: 4px; padding-left: 14px; list-style: disc; }
</style>
