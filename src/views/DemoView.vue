<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <p class="editorial-eyebrow">Explore the demos</p>
      <h1>Try a part of your day on the water.</h1>
      <p class="editorial-lede">Plan a sample passage, compare berths, work a marina day board or explore the product screens. Each demo explains what you can change and where its information comes from.</p>
      <p class="demo-lead">Most examples use sample data. The conditions demo uses public feeds, and the survey viewers use recorded aerial data. Choose a starting point below, or <RouterLink to="/?choose=1">find the guide for your role</RouterLink>.</p>
    </section>

    <section class="editorial-shell editorial-section" aria-labelledby="demo-directory-title">
      <h2 id="demo-directory-title">What would you like to try?</h2>
      <div class="demo-grid">
        <article v-for="journey in JOURNEYS" :key="journey.id" class="demo-card">
          <p class="editorial-eyebrow">{{ journey.dataLabel }}</p>
          <h3>{{ journey.title }}</h3>
          <p>{{ journey.action }}</p>
          <p class="demo-note">{{ journey.dataNote }}</p>
          <RouterLink :to="destinations[journey.id]!" class="editorial-text-link">{{ journey.id === 'app-screens' ? 'Browse screens below' : 'Open this demo' }} <span aria-hidden="true">↗</span></RouterLink>
        </article>
        <article class="demo-card">
          <p class="editorial-eyebrow">Recorded aerial survey</p>
          <h3>Inspect the full point cloud</h3>
          <p>Rotate, zoom and compare height, intensity and structure views of Halifax Harbor. The browser displays about 1.18 million points selected from a 220.4-million-point survey.</p>
          <p class="demo-note">The surrounding Bahia Mar listing is a sample. Structure views are derived from the survey; this is not live berth occupancy or a measurement of underwater depth.</p>
          <RouterLink to="/demo/marina/bahia-mar" class="editorial-text-link">Open the survey viewer <span aria-hidden="true">↗</span></RouterLink>
        </article>
        <article class="demo-card">
          <p class="editorial-eyebrow">Recorded sample passage</p>
          <h3>From plan to berth, in four stages</h3>
          <p>Move through Plan, Underway, Approach and Berth. Follow the changing map and read the bridge and berth details as the passage progresses.</p>
          <p class="demo-note">This replay uses a stored passage dataset. Its position, readings and arrival details are not a live vessel feed.</p>
          <RouterLink to="/waterwayz#sample-voyage" class="editorial-text-link">Explore the passage replay <span aria-hidden="true">↗</span></RouterLink>
        </article>
      </div>
    </section>

    <JourneySection id="app-screens" />
    <GuideClosing title="See how it fits your day." />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { JOURNEYS } from '@/data/playbook/journeys'
import JourneySection from '@/components/audience/JourneySection.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'

const destinations: Record<string, string> = {
  'passage-planner': '/capabilities/route-planning#try-passage-planner',
  'aging-reading': '/capabilities/monitoring#try-aging-reading',
  'berth-fit': '/capabilities/dockpass#try-berth-fit',
  'draw-your-water': '/marinas#try-draw-your-water',
  'hazard-reroute': '/capabilities/hazard-reporting#try-hazard-reroute',
  'orbit-the-scan': '/geospatial#try-orbit-the-scan',
  'water-right-now': '/capabilities/navigation#try-water-right-now',
  'helm-view': '/waterwayz#try-helm-view',
  'app-screens': '/demo#try-app-screens',
}
</script>

<style scoped>
.demo-lead { max-width: 70ch; margin-top: 1.5rem; color: var(--text-secondary); }
.demo-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: var(--space-6); margin-top: var(--space-8); }
.demo-card { display: flex; flex-direction: column; align-items: flex-start; padding: var(--space-6); border: 1px solid var(--border-medium); border-radius: var(--radius-lg); }
.demo-card h3 { font-size: var(--type-h3); }
.demo-card p { margin: 0 0 1rem; }
.demo-card .demo-note { color: var(--text-secondary); font-size: var(--type-body-sm); }
.demo-card a { margin-top: auto; }
@media (max-width: 800px) {
  .demo-grid { grid-template-columns: 1fr; }
  h1 { font-size: clamp(2rem, 7vw, 3rem) !important; white-space: normal !important; text-wrap: balance !important; }
}
</style>
