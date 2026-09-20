<template>
  <main v-if="solution" class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />

      <p class="editorial-eyebrow">{{ solution.eyebrow }}</p>
      <div class="guide-heading">
        <h1>{{ solution.headline }}</h1>
        <div>
      <p class="editorial-lede">{{ solution.summary }}</p>
      <RouterLink :to="contactLink(audience, solution.id)" class="editorial-button">{{ solution.cta }} <span aria-hidden="true">↗</span>
      </RouterLink>
      </div>
      </div>
      <aside class="release-note">
      <strong>{{ solution.status }}</strong>
      <p>{{ solution.statusDetail }}</p>
      </aside>
      <JourneySection v-if="solution.journey" :id="solution.journey" hero />
      <EditorialShot v-else-if="solution.shot" :key="solution.shot" :id="solution.shot" :caption="solution.caption || solution.label" priority />
    </section>
    <section class="editorial-shell editorial-section">
      <p class="editorial-eyebrow">{{ solution.id === 'vision' ? 'The direction' : 'How it fits your day' }}</p>
      <h2>{{ solution.id === 'vision' ? 'The ideas we are exploring.' : 'From information to a useful next step.' }}</h2>
      <ol class="guide-steps">
      <li v-for="(step, index) in solution.steps" :key="step.title">
      <span class="editorial-index">0{{ index + 1 }}</span>
      <h3>{{ step.title }}</h3>
      <p>{{ step.body }}</p>
      </li>
      </ol>
    </section>
    <section class="editorial-section section-wash">
      <div class="editorial-shell availability-grid">
      <div>
      <h2>{{ solution.currentTitle }}</h2>
      <ul>
      <li v-for="item in solution.current" :key="item">{{ item }}</li>
      </ul>
      </div>
      <div>
      <h2>{{ solution.nextTitle }}</h2>
      <ul>
      <li v-for="item in solution.next" :key="item">{{ item }}</li>
      </ul>
      </div>
    </div>
      </section>
    <section class="editorial-shell editorial-section">
      <p class="editorial-eyebrow">Explore the detail</p>
      <h2>Make the next connection.</h2>
      <nav class="solution-next" aria-label="Related product and capability pages">
      <RouterLink v-for="link in solution.links" :key="link.to" :to="link.to">{{ link.label }} <span aria-hidden="true">↗</span>
      </RouterLink>
      </nav>
      </section>
    <GuideClosing :audience="audience" :topic="solution.id" :title="solution.cta" />
  </main>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { findSolution } from '@/data/solutions'
import { contactLink } from '@/data/audiences'
import { useAudience } from '@/composables/useAudience'
import LanguageNote from '@/components/audience/LanguageNote.vue'
import EditorialShot from '@/components/audience/EditorialShot.vue'
import GuideClosing from '@/components/audience/GuideClosing.vue'
import JourneySection from '@/components/audience/JourneySection.vue'
const props = defineProps<{ solutionId: string }>()
const solution = computed(() => findSolution(props.solutionId))
const { audience } = useAudience()
</script>
