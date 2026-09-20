<template>
  <main v-if="person" class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />

      <p class="editorial-eyebrow">For {{ person.short.toLowerCase() }}</p>
      <div class="guide-heading">
        <h1>{{ person.headline }}</h1>
        <div>
          <p class="editorial-lede">{{ person.intro }}</p>
          <a :href="`#try-${person.journey}`" class="editorial-button">{{ person.primary }} <span aria-hidden="true">↓</span></a>
          <RouterLink :to="contactLink(person)" class="editorial-text-link">{{ person.cta }} <span aria-hidden="true">↗</span>
          </RouterLink>
          <RouterLink v-if="isMarinaAudience(person)" :to="{ path: '/demo/marina/bahia-mar', query: { audience: person.id } }" class="editorial-text-link marina-demo-link">Explore the LiDAR marina demo <span aria-hidden="true">↗</span></RouterLink>
        </div>
      </div>
      <JourneySection :id="person.journey" :title="person.demoTitle" :intro="person.demoIntro" :initial-screen="person.initialScreen" hero />
      <nav class="related-demos" aria-label="More demos for your role">
        <RouterLink v-for="demo in person.relatedDemos" :key="demo.to" :to="demo.to" class="editorial-text-link">{{ demo.label }} <span aria-hidden="true">↗</span></RouterLink>
        <RouterLink to="/demo" class="editorial-text-link">Browse all demos <span aria-hidden="true">↗</span></RouterLink>
      </nav>
    </section>
    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Your day on the water</p>
          <h2>Start with what you need to do.</h2>
        </div>
      </div>
      <ol class="guide-steps" :class="{ 'guide-steps--four': person.steps.length === 4 }">
        <li v-for="(step, index) in person.steps" :key="step.title">
          <span class="editorial-index">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p v-for="paragraph in step.body.split('\n\n')" :key="paragraph">{{ paragraph }}</p>
        </li>
      </ol>
      <aside class="access-note">
        <h3>How access works</h3>
        <p>{{ person.access }}</p>
      </aside>
      <aside v-if="person.availability" class="access-note">
        <h3>Available now and developing</h3>
        <p>{{ person.availability }}</p>
      </aside>
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell">
        <p class="editorial-eyebrow">Built around your role</p>
        <h2>Explore the tools behind the work.</h2>
        <FeatureLinks :ids="person.features" />
      </div>
    </section>
    <section class="editorial-shell editorial-section role-directory">
      <div>
        <p class="editorial-eyebrow">Another part of your day?</p>
        <h2>Change your perspective.</h2>
      </div>
      <nav aria-label="Other audience guides">
        <RouterLink v-for="other in AUDIENCES.filter(a => a.id !== person?.id)" :key="other.id" :to="audienceLink(other.id)">{{ other.label }} <span aria-hidden="true">↗</span>
        </RouterLink>
      </nav>
    </section>
    <GuideClosing :audience="person" />
  </main>
</template>
<script setup lang="ts">

import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { AUDIENCES, audienceLink, findAudience, contactLink, isMarinaAudience } from '@/data/audiences'
import JourneySection from '@/components/audience/JourneySection.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const props = defineProps<{ audienceId: string }>()
const person = computed(() => findAudience(props.audienceId))
</script>

<style scoped>
.related-demos { display: flex; flex-wrap: wrap; gap: 1rem 2rem; margin-top: var(--space-6); }
.guide-steps--four { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.guide-steps p + p { margin-top: 1rem; }
@media (max-width: 800px) {
  .guide-steps--four { grid-template-columns: 1fr; }
  .guide-heading h1 { font-size: clamp(2rem, 7vw, 3rem) !important; white-space: normal !important; text-wrap: balance !important; }
}
</style>
