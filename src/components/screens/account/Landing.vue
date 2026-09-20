<template>
  <div class="scr lnd">
    <div class="scr-row scr-row--between">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Day · Dusk · Night</button>
    </div>

    <div class="lnd-hero">
      <div class="lnd-rings" aria-hidden="true">
        <span class="lnd-ring lnd-ring--outer"></span>
        <span class="lnd-ring lnd-ring--inner"></span>
        <span class="lnd-mark"><ScrIcon name="wave" /></span>
      </div>
      <h1 class="scr-h1">Know the water ahead.</h1>
      <p class="scr-sub">Routing, hazards and dockage for your vessel — with monitoring by InteliMARIS when you want it.</p>
    </div>

    <div class="scr-stack scr-stack--tight lnd-doors">
      <button type="button" class="scr-btn scr-btn--primary scr-btn--block">Create an account</button>
      <button type="button" class="scr-btn scr-btn--block">Sign in with WaterWAYZ ID</button>
      <button type="button" class="scr-btn scr-btn--block">Demo sign in</button>
      <p class="scr-micro scr-muted lnd-note">WaterWayz is not a certified navigation system. Always cross-check official charts.</p>
      <a class="scr-small lnd-note">Have an 8-character invite code? Sign in first, then join.</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
</script>

<style scoped>
.lnd { display: flex; flex-direction: column; min-height: 100%; background: linear-gradient(180deg, #eef3fa, #f3f5f9 55%, #dce6f4); }
.lnd-hero { flex: 1; display: grid; place-content: center; justify-items: center; gap: 10px; text-align: center; padding: 26px 6px 22px; }
.lnd-hero .scr-sub { max-width: 30ch; }
.lnd-rings { position: relative; display: grid; place-items: center; width: 150px; height: 150px; margin-bottom: 6px; }
.lnd-ring { position: absolute; border-radius: 50%; border: 1px solid rgba(66, 116, 187, 0.35); }
.lnd-ring--outer { inset: 0; }
.lnd-ring--inner { inset: 24px; border-width: 2px; border-color: rgba(66, 116, 187, 0.5); }
.lnd-mark { display: grid; place-items: center; width: 56px; height: 56px; border-radius: 50%; background: var(--navy); color: #fff; }
.lnd-mark svg { width: 28px; height: 28px; }
.lnd-doors { text-align: center; padding-bottom: 8px; }
.lnd-note { margin-top: 4px; }
</style>
