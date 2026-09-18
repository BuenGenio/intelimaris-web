<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'The platform' }]" />
      <p class="editorial-eyebrow">The connected platform</p>
      <div class="guide-heading">
        <h1>One waterway.<br>Many working lives.</h1>
        <p class="editorial-lede">Plan the passage, look after the vessel and prepare the berth. Explore each workflow, or start with the guide for your role.</p>
      </div>
      <RouterLink to="/#choose" class="editorial-text-link">Find your role <span aria-hidden="true">→</span>
      </RouterLink>
      <FeatureLinks />
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell role-directory">
        <div>
          <p class="editorial-eyebrow">Find your perspective</p>
          <h2>Made for the people around the water.</h2>
        </div>
        <nav aria-label="Audience guides">
          <RouterLink v-for="person in AUDIENCES" :key="person.id" :to="audienceLink(person.id)">{{ person.label }} <span aria-hidden="true">↗</span>
          </RouterLink>
        </nav>
      </div>
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'

import { RouterLink } from 'vue-router'
import { AUDIENCES, audienceLink } from '@/data/audiences'
import { useAudience } from '@/composables/useAudience'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const { audience } = useAudience()
</script>
