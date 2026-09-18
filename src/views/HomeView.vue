<template>
  <main class="home-v2">
    <GlassHero />
    <PositionSection />
    <VoyageSection />
    <AppShowcaseSection />
    <MarinaPmsSection />
    <SensorsShowcaseSection />
    <TrustSection />
    <ClosingCtaSection />
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import GlassHero from '@/components/v2/GlassHero.vue'
import { useFadeIn } from '@/composables/useFadeIn'

/* Only the hero is needed for first paint; the chapters below load as the
   reader gets to them. */
const PositionSection = defineAsyncComponent(() => import('@/components/v2/PositionSection.vue'))
const VoyageSection = defineAsyncComponent(() => import('@/components/v2/VoyageSection.vue'))
const AppShowcaseSection = defineAsyncComponent(() => import('@/components/v2/AppShowcaseSection.vue'))
const MarinaPmsSection = defineAsyncComponent(() => import('@/components/v2/MarinaPmsSection.vue'))
const SensorsShowcaseSection = defineAsyncComponent(() => import('@/components/v2/SensorsShowcaseSection.vue'))
const TrustSection = defineAsyncComponent(() => import('@/components/v2/TrustSection.vue'))
const ClosingCtaSection = defineAsyncComponent(() => import('@/components/v2/ClosingCtaSection.vue'))

useFadeIn()
</script>

<style scoped>
.home-v2 {
  /* Chapters carry their own background, so the page gradient stays behind
     only the gaps. */
  background: var(--surface-sunken);
}
</style>
