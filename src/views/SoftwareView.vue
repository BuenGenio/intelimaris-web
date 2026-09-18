<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'The platform', to: '/capabilities' }, { label: 'Software' }]" />
      <p class="editorial-eyebrow">Software for the working water</p>
      <div class="guide-heading">
        <h1>The passage.<br>The vessel.<br>The people.</h1>
        <div>
          <p class="editorial-lede">WaterWAYZ handles the journey. InteliMARIS brings vessel systems into view. Marina, private-dock, business and maintenance workspaces connect the people around them.</p>
          <RouterLink to="/#choose" class="editorial-button">Find your starting point <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
      <FeatureLinks />
    </section>
    <GuideClosing :audience="audience" />
  </main>
</template>
<script setup lang="ts">
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'

import { RouterLink } from 'vue-router'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import { useAudience } from '@/composables/useAudience'
const { audience } = useAudience()
</script>
