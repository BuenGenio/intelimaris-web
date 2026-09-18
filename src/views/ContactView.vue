<template>
  <main class="editorial-page" lang="en">
    <section class="editorial-shell guide-hero">
      <LanguageNote />
      <SiteBreadcrumbs :items="[{ label: 'Talk to us' }]" />
      <p class="editorial-eyebrow">Let’s start with your day</p>
      <div class="guide-heading">
        <h1>{{ audience ? audience.cta + '.' : 'What brings you to the water?' }}</h1>
        <div>
          <p class="editorial-lede">{{ audience ? `You’re exploring the platform for ${audience.short.toLowerCase()}. Tell us what you want to do and where you operate.` : 'A first passage, a better service workflow or a whole marina. Tell us what you need and we’ll help you find the right starting point.' }}</p>
          <p v-if="topic" class="contact-topic">Interested in: <strong>{{ topic.label }}</strong>
          </p>
          <RouterLink to="/?choose=1#choose" class="editorial-text-link">Choose a different role →</RouterLink>
        </div>
      </div>
    </section>
    <ClosingSection :key="contextKey" :initial-role="audience?.id" :initial-message="initialMessage" />
  </main>
</template>
<script setup lang="ts">
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'

import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useAudience } from '@/composables/useAudience'
import { findSolution } from '@/data/solutions'
import { findCapability } from '@/data/capabilities'
import ClosingSection from '@/components/sections/ClosingSection.vue'
import LanguageNote from '@/components/audience/LanguageNote.vue'
const route = useRoute()
const { audience } = useAudience()
const topic = computed(() => findCapability(route.query.topic) ?? findSolution(route.query.topic))
const contextKey = computed(() => `${audience.value?.id || ''}:${topic.value?.id || ''}`)
const initialMessage = computed(() => [audience.value ? `I'm interested in the guide for ${audience.value.short.toLowerCase()}.` : '', topic.value ? `I'd like to discuss ${topic.value.label}.` : ''].filter(Boolean).join('\n'))
</script>
