<template>
  <div class="scr">
    <div class="scr-row scr-row--between" style="margin-bottom: 14px">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Day · Dusk · Night</button>
    </div>

    <div class="scr-card scr-stack">
      <div>
        <h1 class="scr-h2">Create your account</h1>
        <p class="scr-sub scr-small">One account, however many workspaces you end up in.</p>
      </div>

      <div class="scr-tabs" role="tablist" aria-label="Sign in with">
        <button type="button" class="scr-tab is-on" role="tab" aria-selected="true">Email</button>
        <button type="button" class="scr-tab" role="tab" aria-selected="false" disabled>Phone number <span class="scr-pill scr-pill--bare scr-micro">Pending</span></button>
      </div>

      <p class="scr-small scr-muted">Creating your account happens on WaterWAYZ ID, our identity service. You will pick an email and a password there — this app never sees either — and it will send you a link to confirm the address. Come back here and you carry on where you left off.</p>
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Create your account</button>
      <p class="scr-micro scr-muted">The ground rules — and the one thing WaterWayz is not — are the first thing we ask you about when you get back.</p>

      <div class="scr-card scr-stack scr-stack--tight" style="background: var(--ink-50)">
        <p class="scr-strong scr-small">Or open the demo account</p>
        <p class="scr-micro scr-muted">No identity behind it, no email sent, no workspaces — it exists so the whole journey can be walked with the network unplugged. Use it at the booth.</p>
        <label class="scr-field">
          <span class="scr-label">Email</span>
          <input class="scr-input" type="email" value="sam@example.com" readonly />
          <span class="scr-hint">Only used to label the demo. Nothing is sent to it.</span>
        </label>
        <button type="button" class="scr-btn scr-btn--block">Open the demo account</button>
      </div>
    </div>

    <p class="scr-small scr-muted" style="text-align: center; margin-top: 14px">Already have one? <a class="scr-strong">Sign in</a></p>
    <p class="scr-micro scr-muted" style="text-align: center; margin-top: 6px">Have an 8-character invite code? Sign in first, then join.</p>
  </div>
</template>

<script setup lang="ts"></script>
