<template>
  <main class="editorial-page home-audience" lang="en">
    <section id="choose" class="editorial-shell audience-entry">
      <LanguageNote />
      <div class="entry-heading">
        <div>
          <p class="editorial-eyebrow">InteliMARIS™ / One connected boating experience</p>
          <h1>Your day on the water. <br>Connected.</h1>
        </div>
        <p class="editorial-lede">Plan the passage. Keep an eye on the vessel. Prepare the arrival. InteliMARIS brings it together through WaterWayz™.</p>
      </div>
      <h2 class="chooser-heading">Where do you come in?</h2>
      <p class="chooser-intro">Choose your role. We’ll start with what matters to you.</p>
      <div class="entry-grid">
        <AudienceChooser :selected="audience?.id" @choose="onChoose" />
        <div id="audience-preview" class="audience-preview">
          <div class="preview-map">
            <img :src="`${base}assets/voyage-basemap.webp`" alt="Satellite chart of the Fort Lauderdale Intracoastal and its marina basins" fetchpriority="high" width="1200" height="1200">
            <span class="map-caption">FORT LAUDERDALE / INTRACOASTAL</span>
          </div>
          <div class="preview-copy">
            <div aria-live="polite" aria-atomic="true">
              <p class="editorial-eyebrow">{{ audience ? `For ${audience.short.toLowerCase()}` : 'One connected platform' }}</p>
              <h2>{{ audience ? audience.headline : 'Navigate. Monitor. Arrive.' }}</h2>
              <p>{{ audience ? audience.intro : 'WaterWayz™ connects the journey with vessel information and the people on shore. Choose your role to find your starting point.' }}</p>
            </div>
            <RouterLink v-if="audience" :to="audienceLink(audience.id)" class="editorial-button">Explore your guide <span aria-hidden="true">↗</span>
            </RouterLink>
            <RouterLink v-else to="/capabilities" class="editorial-button">Explore the platform <span aria-hidden="true">↗</span>
            </RouterLink>
            <RouterLink v-if="isMarinaAudience(audience)" :to="{ path: '/demo/marina/bahia-mar', query: { audience: audience!.id } }" class="editorial-text-link marina-demo-link">Explore the LiDAR marina demo <span aria-hidden="true">↗</span></RouterLink>
          </div>
        </div>
      </div>
      <div class="choice-footnote">
        <p>{{ audience ? 'Your choice shapes this guide. You can change it whenever you like.' : 'Wear more than one hat? Start anywhere. You can switch roles at any time.' }}</p>
        <RouterLink to="/capabilities">Browse everything <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
    </section>
    <section class="editorial-section editorial-shell waterwayz-feature">
      <div><p class="editorial-eyebrow">WaterWayz™ by InteliMARIS</p><h2>Your whole boating experience. Intelligently connected.</h2><p class="editorial-lede">A passage starts before departure and carries on after you tie up. Bring the route, connected vessel information and your next stop into the same view.</p><RouterLink to="/waterwayz" class="editorial-button">Explore WaterWayz™ <span aria-hidden="true">↗</span></RouterLink></div>
      <EditorialShot id="waterwayz-route" caption="The actual WaterWayz passage-planning view." />
    </section>
    <section id="platform" class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">{{ audience ? 'Selected for you' : 'From passage to pontoon' }}</p>
            <h2>{{ audience ? `A closer look for ${audience.short.toLowerCase()}.` : 'The detail behind a better day on the water.' }}</h2>
          </div>
          <p>Explore the workflows, see the actual product and check what is available today.</p>
        </div>
        <FeatureLinks :ids="audience?.features || ['navigation', 'monitoring', 'dockpass', 'emergency-assistance']" />
      </div>
    </section>
    <section class="editorial-section editorial-shell">
      <div class="section-intro"><div><p class="editorial-eyebrow">Connected vessel systems</p><h2>Your vessel never stops communicating.</h2></div><p>Power, water, temperature and the systems beneath your feet. Build your view around what you want to know, then choose the hardware to support it.</p></div>
      <SystemLinks :ids="['pwts', 'intelibilge', 'intelibms']" />
    </section>
    <EcosystemSection />
    <section class="editorial-section editorial-shell">
      <div class="section-intro"><div><p class="editorial-eyebrow">Beyond the passage</p><h2>More detail.<br>More useful context.</h2></div><p>Explore a real survey demonstration and the capabilities we are developing around connected information. Each guide explains what is available and what comes next.</p></div>
      <SystemLinks :ids="['geospatial', 'intelligence', 'vision']" />
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import EditorialShot from '@/components/audience/EditorialShot.vue'
import SystemLinks from '@/components/audience/SystemLinks.vue'
import EcosystemSection from '@/components/audience/EcosystemSection.vue'
import { nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import AudienceChooser from '@/components/audience/AudienceChooser.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { useAudience } from '@/composables/useAudience'
import { audienceLink, isMarinaAudience } from '@/data/audiences'
const { audience, choose } = useAudience()
const base = import.meta.env.BASE_URL
async function onChoose(id: string) {
  await choose(id)
  if (window.matchMedia('(max-width: 800px)').matches) {
    await nextTick()
    const preview = document.getElementById('audience-preview')
    preview?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' })
    const heading = preview?.querySelector('h2')
    heading?.setAttribute('tabindex', '-1')
    heading?.focus({ preventScroll: true })
  }
}
</script>
