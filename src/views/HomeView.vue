<template>
  <main class="lp-home">
    <LandingHeroSection />
    <FeaturedProductSection />
    <PowerfulFeaturesSection />
    <TrustStripSection />
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import LandingHeroSection from '../components/sections/LandingHeroSection.vue'
import { useFadeIn } from '../composables/useFadeIn'

const FeaturedProductSection = defineAsyncComponent(() => import('../components/sections/FeaturedProductSection.vue'))
const PowerfulFeaturesSection = defineAsyncComponent(() => import('../components/sections/PowerfulFeaturesSection.vue'))
const TrustStripSection = defineAsyncComponent(() => import('../components/sections/TrustStripSection.vue'))

useFadeIn()
</script>
