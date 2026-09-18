<template>
  <main class="editorial-page home-audience" lang="en">
    <section id="choose" class="editorial-shell audience-entry">
      <LanguageNote />
      <div class="entry-heading">
        <div>
          <p class="editorial-eyebrow">Different roles. The same water.</p>
          <h1>Where do <br>you come in?</h1>
        </div>
        <p class="editorial-lede">At the helm. On the dock. Behind the scenes.<br>Choose your role to find what matters to you.</p>
      </div>
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
              <h2>{{ audience ? audience.headline : 'Every role has a different view.' }}</h2>
              <p>{{ audience ? audience.intro : 'WaterWAYZ for the passage. InteliMARIS for the vessel. Connected workspaces for the people who keep the water moving.' }}</p>
            </div>
            <RouterLink v-if="audience" :to="audienceLink(audience.id)" class="editorial-button">Explore your guide <span aria-hidden="true">↗</span>
            </RouterLink>
            <RouterLink v-else to="/capabilities" class="editorial-button">Explore the platform <span aria-hidden="true">↗</span>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="choice-footnote">
        <p>{{ audience ? 'Your choice shapes this guide. You can change it whenever you like.' : 'Wear more than one hat? Start anywhere. You can switch roles at any time.' }}</p>
        <RouterLink to="/capabilities">Browse everything <span aria-hidden="true">→</span>
        </RouterLink>
      </div>
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
        <FeatureLinks :ids="audience?.features" />
      </div>
    </section>
    <section id="marina" class="editorial-section editorial-shell">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Connected, with purpose</p>
          <h2>The right information.<br>The right people.</h2>
        </div>
        <p>A captain plans the passage. A dockmaster prepares the berth. A technician looks after the systems. Separate responsibilities, connected around the same vessel.</p>
      </div>
      <div class="connection-line">
        <span>Plan a passage</span>
        <span>Understand the vessel</span>
        <span>Prepare the arrival</span>
        <span>Care for what comes next</span>
      </div>
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import { nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import AudienceChooser from '@/components/audience/AudienceChooser.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { useAudience } from '@/composables/useAudience'
import { audienceLink } from '@/data/audiences'
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
