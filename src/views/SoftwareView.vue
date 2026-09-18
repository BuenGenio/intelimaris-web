<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />

      <p class="editorial-eyebrow">The InteliMARIS ecosystem</p>
      <div class="guide-heading">
      <h1>Connected by design.<br>Useful in your day.</h1>
      <div>
      <p class="editorial-lede">Sensors capture what is happening. The radio network carries the data. Software adds structure and context. WaterWayz™ brings the useful information to the people who need it.</p>
      <RouterLink to="/waterwayz" class="editorial-button">Explore WaterWayz™ <span aria-hidden="true">↗</span>
      </RouterLink>
      </div>
      </div>
    </section>
    <EcosystemSection />
    <section class="editorial-shell editorial-section">
      <div class="section-intro">
      <div>
      <p class="editorial-eyebrow">The experience</p>
      <h2>One vessel.<br>Different responsibilities.</h2>
      </div>
      <p>Captains plan the passage. Crew see the vessel context. Marina teams organize arrivals. Assigned technicians work through service engagements. Information follows the access each person has been given.</p>
      </div>
      <FeatureLinks :ids="['navigation', 'monitoring', 'marina-pms', 'maintenance']" />
      </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell">
      <div class="section-intro">
      <div>
      <p class="editorial-eyebrow">Developing intelligence</p>
      <h2>Understand more than a single reading.</h2>
      </div>
      <p>We are developing event correlation, anomaly detection and contextual recommendations inside the technology Stack. Hardware behavior, measured data and model predictions have distinct roles.</p>
      </div>
      <ol class="intelligence-flow">
      <li>Monitor</li>
      <li>Analyze</li>
      <li>Detect</li>
      <li>Assess</li>
      <li>Inform</li>
      </ol>
      <RouterLink to="/intelligence" class="editorial-text-link">See what is available and what is developing →</RouterLink>
      </div>
      </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import { RouterLink } from 'vue-router'
import EcosystemSection from '@/components/audience/EcosystemSection.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { useAudience } from '@/composables/useAudience'
const { audience } = useAudience()
</script>
