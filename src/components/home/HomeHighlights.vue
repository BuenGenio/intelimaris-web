<template>
  <ul class="highlights editorial-shell" aria-label="What InteliWaterwayz does">
    <li v-for="h in HIGHLIGHTS" :key="h.title">
      <RouterLink :to="h.to" class="highlight">
        <span class="highlight-icon" aria-hidden="true"><ScrIcon :name="h.icon" /></span>
        <h3>{{ h.title }}</h3>
        <p>{{ h.text }}</p>
        <span class="highlight-more">{{ h.more }} <span aria-hidden="true">→</span></span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ScrIcon from '@/components/screens/kit/ScrIcon.vue'

const HIGHLIGHTS = [
  { icon: 'compass', title: 'Plan the passage', text: 'A route for your vessel’s draft, with the waits for bridges and tide and the conditions along the way.', more: 'Route planning', to: '/capabilities/route-planning' },
  { icon: 'wave', title: 'Read the water', text: 'Charted dangers, reports from other skippers and the weather ahead, each with its source and its age.', more: 'Hazards', to: '/capabilities/hazard-reporting' },
  { icon: 'users', title: 'Bring your people', text: 'Crew, guests and the person ashore see the same plan, and the vessel’s readings reach the right phone.', more: 'Vessel monitoring', to: '/capabilities/monitoring' },
  { icon: 'anchor', title: 'Arrive expected', text: 'Check the berth fits, request the stay and tie up where the marina is already expecting you.', more: 'Dock Pass', to: '/capabilities/dockpass' },
]
</script>

<style scoped>
.highlights { list-style: none; margin: 0 auto; padding: 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 20px; }
.highlight { display: flex; flex-direction: column; align-items: center; height: 100%; padding: 30px 26px 26px; border: 2px solid var(--border-subtle); border-radius: 22px; background: var(--surface-page); color: var(--text-primary); text-align: center; text-decoration: none; transition: border-color .2s, transform .2s; }
.highlight:hover { border-color: var(--domain); transform: translateY(-2px); }
.highlight-icon { display: grid; place-items: center; width: 56px; height: 56px; margin-bottom: 14px; color: var(--maris-deep); }
[data-theme='dark'] .highlight-icon { color: var(--maris-night); }
.highlight-icon :deep(svg) { width: 40px; height: 40px; stroke-width: 1.6; }
.highlight h3 { margin: 0 0 10px; font: 600 1.3rem/1.25 var(--font-text); letter-spacing: -.01em; }
.highlight p { margin: 0 0 16px; font-size: .95rem; line-height: 1.6; color: var(--text-secondary); }
.highlight-more { margin-top: auto; font-size: .85rem; font-weight: 600; color: var(--domain-ink); }
@media (max-width: 1000px) { .highlights { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 560px) {
  .highlights { grid-template-columns: minmax(0, 1fr); gap: 12px; }
  /* On a phone each card is a row: icon beside the words. */
  .highlight { display: grid; grid-template-columns: 44px minmax(0, 1fr); column-gap: 14px; align-items: start; padding: 18px 18px 16px; text-align: left; border-radius: 16px; }
  .highlight-icon { grid-row: span 3; width: 44px; height: 44px; margin: 0; }
  .highlight-icon :deep(svg) { width: 30px; height: 30px; }
  .highlight h3 { font-size: 1.1rem; margin-bottom: 4px; }
  .highlight p { font-size: .9rem; margin-bottom: 8px; }
}
@media (prefers-reduced-motion: reduce) { .highlight, .highlight:hover { transition: none; transform: none; } }
</style>
