<template>
  <div class="scr">
    <div class="scr-head">
      <div><h1 class="scr-h1">Account</h1><p class="scr-sub">You, across every workspace you are in.</p></div>
    </div>
    <div class="scr-card scr-stack scr-stack--tight">
      <div class="scr-row">
        <span class="scr-avatar scr-avatar--lg">SM</span>
        <div><p class="scr-strong">Sam Miller</p><p class="scr-small scr-muted">sam@example.com</p><p class="scr-small">Coastal cruising · Fort Lauderdale</p></div>
      </div>
      <div class="scr-row scr-row--between scr-micro"><span class="scr-strong">Profile <span class="scr-num">70%</span> complete</span><span class="scr-muted">Next: add a photo</span></div>
      <div class="scr-progress"><i style="width: 70%"></i></div>
    </div>
    <div class="scr-chips scr-chips--scroll acp-tabs">
      <span v-for="t in TABS" :key="t" class="scr-chip" :class="{ 'is-on': t === 'Profile' }">{{ t }}</span>
    </div>

    <div class="scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Photo</h2><p class="scr-small scr-muted">What other members see beside your name.</p></div>
      <div class="scr-row">
        <span class="scr-avatar scr-avatar--lg">SM</span>
        <button type="button" class="scr-btn scr-btn--sm"><ScrIcon name="camera" /> Add a photo</button>
        <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost" disabled>Remove</button>
      </div>
      <p class="scr-micro scr-muted">PNG, JPEG or WebP, up to 512 KB. The file's own bytes decide the type, not its name.</p>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div class="scr-row scr-row--between">
        <div><h2 class="scr-h3">Photos and video</h2><p class="scr-small scr-muted">Your vessel and your work on the water, on your card.</p></div>
        <span class="scr-pill scr-pill--bare" data-tone="info"><span class="scr-num">5</span> of 12</span>
      </div>
      <div class="scr-media">
        <div class="scr-thumb acp-thumb"><span class="acp-cap">Wanderer · Bahia Mar</span></div>
        <div class="scr-thumb acp-thumb"><span class="acp-cap">Helm, Oct 2026</span></div>
        <div class="scr-thumb acp-thumb acp-thumb--video"><span class="acp-play"><ScrIcon name="activity" /></span><span class="acp-cap"><span class="scr-num">0:24</span> · Leaving C-14</span></div>
        <div class="scr-thumb acp-thumb"><span class="acp-cap">Isle of Venice dock</span></div>
        <div class="scr-thumb acp-thumb"><span class="acp-cap">Sounder, 8 ft</span></div>
        <button type="button" class="scr-thumb acp-thumb acp-thumb--add"><ScrIcon name="plus" /><span class="scr-micro scr-strong">Add photo or video</span></button>
      </div>
      <p class="scr-micro scr-muted">Photos up to 8 MB; video up to 30 s and 60 MB. Whoever can see your card sees these.</p>
    </div>

    <div class="scr-section scr-card scr-stack">
      <div><h2 class="scr-h3">Name and headline</h2><p class="scr-small scr-muted">Your name and headline are what other members see.</p></div>
      <label class="scr-field"><span class="scr-label">Display name</span><input class="scr-input" value="Sam Miller" readonly /><span class="scr-hint">Leave it empty to use the name on your sign-in account.</span></label>
      <label class="scr-field"><span class="scr-label">Headline</span><input class="scr-input" value="Coastal cruising · Fort Lauderdale" placeholder="Delivery skipper · South Florida" readonly /><span class="scr-hint">One line, under your name on crew lists.</span></label>
      <label class="scr-field"><span class="scr-label">About</span><textarea class="scr-textarea" placeholder="What you do on the water." readonly>Weekend skipper on Wanderer, a 42 ft Sabre out of Fort Lauderdale. Keys and Bahamas most winters.</textarea></label>
      <label class="scr-field"><span class="scr-label">Home port</span><input class="scr-input" value="Fort Lauderdale" readonly /></label>
      <label class="scr-field"><span class="scr-label">Country</span><input class="scr-input" value="US" readonly /><span class="scr-hint">Two-letter code.</span></label>
      <label class="scr-field"><span class="scr-label">Phone</span><input class="scr-input scr-num" value="+1 305 555 0123" readonly /><span class="scr-hint">Hidden from other members unless you turn it on under Privacy.</span></label>
    </div>

    <div class="scr-section scr-card scr-stack scr-stack--tight">
      <div><h2 class="scr-h3">Sign-in account</h2><p class="scr-small scr-muted">Held by your identity provider, not by us.</p></div>
      <label class="scr-field"><span class="scr-label">Email</span><input class="scr-input" value="sam@example.com" readonly /><span class="scr-hint">Changing your email re-verifies it — do that under Sign-in and security.</span></label>
    </div>

    <div class="scr-bar"><button type="button" class="scr-btn scr-btn--primary scr-btn--block">Save changes</button></div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TABS = ['Profile', 'On the water', 'Emergency contact', 'Privacy', 'Notifications', 'Preferences', 'Sign-in and security', 'Workspaces', 'Accounts', 'Billing', 'About & legal']
</script>

<style scoped>
.acp-tabs { margin: 12px 0; }
.acp-thumb { position: relative; display: grid; place-items: center; overflow: hidden; }
.acp-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 3px 6px; font-size: 9px; line-height: 1.2; color: #fff; background: linear-gradient(transparent, rgba(24, 32, 54, 0.7)); }
.acp-thumb--video { background: linear-gradient(160deg, #2c3d68, #182036); }
.acp-play { display: grid; place-items: center; width: 30px; height: 30px; border-radius: 50%; background: rgba(255, 255, 255, 0.92); color: var(--navy); }
.acp-thumb--add { background: var(--ink-0); border: 1.5px dashed var(--ink-300); color: var(--wave-700); cursor: pointer; gap: 2px; align-content: center; text-align: center; padding: 6px; }
.acp-thumb--add .scr-micro { line-height: 1.15; }
</style>
