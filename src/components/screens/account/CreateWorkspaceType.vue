<template>
  <div class="scr">
    <div class="scr-row scr-row--between" style="margin-bottom: 12px">
      <span class="scr-ov">WaterWayz</span>
      <button type="button" class="scr-btn scr-btn--sm scr-btn--ghost">Cancel</button>
    </div>
    <ol class="scr-chips scr-chips--scroll cwt-steps" aria-label="Progress">
      <li class="scr-chip"><ScrIcon name="check" /> Account</li>
      <li class="scr-chip is-on">Type</li>
      <li class="scr-chip">Details</li>
      <li class="scr-chip">Invite</li>
    </ol>

    <div class="scr-head">
      <div>
        <h1 class="scr-h2">What kind of workspace?</h1>
        <p class="scr-sub scr-small">Each type has its own dashboard, features and settings.</p>
        <p class="scr-micro scr-muted">In <span class="scr-strong">Sam Miller</span> · <a>change</a></p>
      </div>
    </div>

    <ul class="scr-stack scr-stack--tight">
      <li v-for="t in TYPES" :key="t.label">
        <button type="button" class="scr-card cwt-door" :style="{ '--door': t.color }">
          <span class="scr-row"><ScrIcon :name="t.icon" /><span class="scr-strong">{{ t.label }}</span><span class="scr-spacer"></span><ScrIcon name="chevron" /></span>
          <span class="scr-small scr-muted">{{ t.tagline }}</span>
          <span class="scr-ov">{{ t.audience }}</span>
        </button>
      </li>
    </ul>

    <div class="scr-bar">
      <button type="button" class="scr-btn">Back</button>
      <span class="scr-spacer"></span>
      <button type="button" class="scr-btn scr-btn--primary" disabled>Continue</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'
const TYPES = [
  { label: 'Vessel', tagline: 'One vessel, its crew and everything about it.', audience: 'Vessel owners', icon: 'vessel', color: '#4274bb' },
  { label: 'Marina', tagline: 'Run your marina: berths, arrivals and staff.', audience: 'Commercial marina operators', icon: 'anchor', color: '#14919b' },
  { label: 'Private marina', tagline: 'List your private dock and host visiting vessels.', audience: 'Private dock and marina owners', icon: 'home', color: '#1f6e5e' },
  { label: 'Business', tagline: 'Your on-water business, found by vessels nearby.', audience: 'Restaurants, fuel docks, tackle stores and other on-water businesses', icon: 'store', color: '#b8860b' },
  { label: 'Maintenance', tagline: 'For maintenance companies working across vessels.', audience: 'Maintenance and service companies', icon: 'wrench', color: '#b7472a' },
]
</script>

<style scoped>
.cwt-steps { margin-bottom: 12px; }
.cwt-steps .scr-chip { min-height: 26px; font-size: 11px; padding-inline: 10px; }
.cwt-door { display: grid; gap: 4px; width: 100%; text-align: left; cursor: pointer; border-left: 4px solid var(--door); }
.cwt-door > .scr-row > svg:first-child { color: var(--door); }
.cwt-door .scr-ov { margin-top: 4px; }
</style>
