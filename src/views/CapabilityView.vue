<template>
  <main v-if="feature" class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />

      <p class="editorial-eyebrow">{{ feature.product }} / {{ feature.label }}</p>
      <div class="guide-heading">
        <h1>{{ feature.headline }}</h1>
        <div>
          <p class="editorial-lede">{{ feature.summary }}</p>
          <RouterLink :to="contactLink(audience, feature.id)" class="editorial-button">Discuss {{ feature.label.toLowerCase() }} <span aria-hidden="true">↗</span>
          </RouterLink>
          <RouterLink v-if="feature.id === 'marina-pms'" to="/demo/marina/bahia-mar" class="editorial-text-link marina-demo-link">Explore the LiDAR marina demo <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
      <aside class="release-note"><strong>{{ feature.status || 'Current workflow · Availability depends on coverage and setup' }}</strong><p>{{ feature.availability }}</p><p v-if="feature.id === 'emergency-assistance'">WaterWayz™ does not replace emergency services, a marine radio or the applicable emergency number.</p></aside>
      <EditorialShot :key="feature.shot" :id="feature.shot" :caption="feature.caption" priority />
      <p v-if="feature.chart" class="chart-disclaimer">WaterWayz™ is not a certified navigation system. Chart data supports situational awareness. Always cross-check official charts and local notices.</p>
    </section>
    <section class="editorial-shell editorial-section">
      <p class="editorial-eyebrow">How it works</p>
      <h2>The workflow, step by step.</h2>
      <ol class="guide-steps">
        <li v-for="(step, index) in feature.steps" :key="step.title">
          <span class="editorial-index">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </li>
      </ol>
    </section>
    <JourneySection :id="feature.journey" />
    <section id="availability" class="editorial-section section-wash">
      <div class="editorial-shell">
        <div class="section-intro">
          <div>
            <p class="editorial-eyebrow">Availability</p>
            <h2>Know what you can use today.</h2>
          </div>
          <p>Explore the working tools and the limits that matter for your setup.</p>
        </div>
        <div class="availability-grid">
          <div>
            <h3>Available workflows</h3>
            <ul>
              <li v-for="item in feature.available" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div>
            <h3>{{ feature.id === 'hazard-reporting' || feature.id === 'marina-pms' || feature.id === 'emergency-assistance' ? 'In development / planned' : 'Before you get started' }}</h3>
            <ul>
              <li v-for="item in feature.pending" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <section class="editorial-shell editorial-section role-directory">
      <div>
        <p class="editorial-eyebrow">Put it in your context</p>
        <h2>Where does this fit in your day?</h2>
      </div>
      <nav aria-label="Relevant audience guides">
        <RouterLink v-for="person in relevant" :key="person.id" :to="audienceLink(person.id)">{{ person.label }} <span aria-hidden="true">↗</span>
        </RouterLink>
      </nav>
    </section>
    <section class="editorial-shell editorial-section">
      <p class="editorial-eyebrow">The next connection</p>
      <h2>Continue exploring.</h2>
      <FeatureLinks :ids="feature.related" />
    </section>
    <GuideClosing :audience="audience" :topic="feature.id" />
  </main>
</template>
<script setup lang="ts">

import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { findCapability } from '@/data/capabilities'
import { AUDIENCES, audienceLink, contactLink } from '@/data/audiences'
import { useAudience } from '@/composables/useAudience'
import EditorialShot from '@/components/audience/EditorialShot.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import JourneySection from '@/components/audience/JourneySection.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const props = defineProps<{ featureId: string }>()
const feature = computed(() => findCapability(props.featureId))
const relevant = computed(() => AUDIENCES.filter(a => a.features.includes(props.featureId)))
const { audience } = useAudience()
</script>
