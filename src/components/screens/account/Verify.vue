<template>
  <div class="scr">
    <div class="scr-row scr-row--between" style="margin-bottom: 14px">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Day · Dusk · Night</button>
    </div>

    <div class="scr-card scr-stack">
      <div>
        <h1 class="scr-h2">Confirm your email</h1>
        <p class="scr-sub scr-small">WaterWAYZ ID sent a confirmation link to sam@example.com. Open it, and you are in.</p>
      </div>

      <div class="scr-alert" data-tone="warn">
        <ScrIcon name="clock" />
        <div><strong>Waiting on the confirmation</strong><span class="scr-small">Sent 2 min ago. Open the link in the email, then check again.</span></div>
      </div>

      <p class="scr-small scr-muted">The link can be opened anywhere — your phone is fine. This page will not notice by itself, so come back and check once you have.</p>

      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">I've confirmed it — check again</button>
      <button type="button" class="scr-btn scr-btn--block">Open WaterWAYZ ID</button>

      <p class="scr-micro scr-muted">No email after a few minutes? Check the spam folder, then open WaterWAYZ ID — it can send it again, and it is also where you fix an address you mistyped.</p>

      <div class="scr-divider"></div>
      <div class="scr-dl">
        <dt>Account</dt><dd>sam@example.com</dd>
        <dt>Phone</dt><dd class="scr-num">+1 305 555 0123 · pending</dd>
        <dt>Status</dt><dd><span class="scr-pill" data-tone="warn">Half-verified</span></dd>
      </div>
    </div>

    <p class="scr-small" style="text-align: center; margin-top: 14px"><a>Use a different email</a></p>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
</script>
