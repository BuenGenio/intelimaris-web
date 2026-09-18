<template>
  <main v-if="person" class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'For you', to: '/?choose=1#choose' }, { label: person.short }]" />
      <p class="editorial-eyebrow">For {{ person.short.toLowerCase() }}</p>
      <div class="guide-heading">
        <h1>{{ person.headline }}</h1>
        <div>
          <p class="editorial-lede">{{ person.intro }}</p>
          <RouterLink :to="contactLink(person)" class="editorial-button">{{ person.cta }} <span aria-hidden="true">↗</span>
          </RouterLink>
        </div>
      </div>
      <EditorialShot :key="person.shot" :id="person.shot" :caption="person.caption" priority />
    </section>
    <section class="editorial-shell editorial-section">
      <div class="section-intro">
        <div>
          <p class="editorial-eyebrow">Your working day</p>
          <h2>Start with what you need to do.</h2>
        </div>
      </div>
      <ol class="guide-steps">
        <li v-for="(step, index) in person.steps" :key="step.title">
          <span class="editorial-index">0{{ index + 1 }}</span>
          <h3>{{ step.title }}</h3>
          <p>{{ step.body }}</p>
        </li>
      </ol>
      <aside class="access-note">
        <h3>How access works</h3>
        <p>{{ person.access }}</p>
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
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'

import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { AUDIENCES, audienceLink, findAudience, contactLink } from '@/data/audiences'
import EditorialShot from '@/components/audience/EditorialShot.vue'
import FeatureLinks from '@/components/audience/FeatureLinks.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const props = defineProps<{ audienceId: string }>()
const person = computed(() => findAudience(props.audienceId))
</script>
