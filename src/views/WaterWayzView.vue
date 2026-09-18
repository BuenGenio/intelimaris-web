<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'The platform', to: '/capabilities' }, { label: 'WaterWAYZ' }]" />
      <p class="editorial-eyebrow">WaterWAYZ</p>
      <div class="guide-heading">
        <h1>Know the<br>water ahead.</h1>
        <div>
          <p class="editorial-lede">A passage begins before departure and ends at the berth. Bring planning, navigation, hazard awareness and dockage into the same journey.</p>
          <RouterLink to="/for/captains" class="editorial-button">Start at the helm <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
      <EditorialShot id="waterwayz-route" caption="Plan the route with the vessel and destination in view." priority />
      <p class="chart-disclaimer">WaterWAYZ is not a certified navigation system. Always cross-check official charts and local notices.</p>
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <p class="editorial-eyebrow">Before departure. Underway. Alongside.</p>
        <h2>Follow the passage.</h2>
        <FeatureLinks :ids="['route-planning', 'navigation', 'hazard-reporting', 'dockpass']" />
      </div>
    </section>
    <VoyageSection />
    <section class="editorial-shell editorial-section role-directory">
      <div>
        <p class="editorial-eyebrow">Find your view</p>
        <h2>There is more than one way aboard.</h2>
      </div>
      <nav aria-label="WaterWAYZ audience guides">
        <RouterLink v-for="person in AUDIENCES.filter(a => a.group === 'aboard')" :key="person.id" :to="audienceLink(person.id)">{{ person.label }} <span aria-hidden="true">↗</span>
        </RouterLink>
      </nav>
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'

import { RouterLink } from 'vue-router'
import EditorialShot from '@/components/audience/EditorialShot.vue'
import VoyageSection from '@/components/v2/VoyageSection.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { AUDIENCES, audienceLink } from '@/data/audiences'
import { useAudience } from '@/composables/useAudience'
const { audience } = useAudience()
</script>
