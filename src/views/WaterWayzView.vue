<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'The platform', to: '/capabilities' }, { label: 'WaterWayz™' }]" />
      <p class="editorial-eyebrow">WaterWayz™</p>
      <div class="guide-heading">
        <h1>Your whole boating experience.<br>Connected.</h1>
        <div>
          <p class="editorial-lede">Navigate, monitor, discover and connect. WaterWayz™ brings the passage, supported vessel readings and arrival coordination together, with reporting and further assistance workflows in development.</p>
          <RouterLink to="/for/captains" class="editorial-button">Start at the helm <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
      <EditorialShot id="waterwayz-route" caption="Plan the route with the vessel and destination in view." priority />
      <p class="chart-disclaimer">WaterWayz™ is not a certified navigation system. Always cross-check official charts and local notices.</p>
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <p class="editorial-eyebrow">Before departure. Underway. Alongside.</p>
        <h2>Follow the passage.</h2>
        <FeatureLinks :ids="['route-planning', 'navigation', 'monitoring', 'hazard-reporting', 'dockpass', 'emergency-assistance']" />
      </div>
    </section>
    <section class="editorial-shell editorial-section"><div class="section-intro"><div><p class="editorial-eyebrow">InteliMarina + Dock Pass</p><h2>Know the berth<br>before you arrive.</h2></div><p>Find the marina, check the vessel requirements and request a stay. Once the host confirms and assigns a berth, keep the arrival information with the journey.</p></div><RouterLink to="/marinas" class="editorial-button">Discover InteliMarina <span aria-hidden="true">↗</span></RouterLink></section>
    <VoyageSection />
    <section class="editorial-shell editorial-section role-directory">
      <div>
        <p class="editorial-eyebrow">Find your view</p>
        <h2>There is more than one way aboard.</h2>
      </div>
      <nav aria-label="WaterWayz™ audience guides">
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
