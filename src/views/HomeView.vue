<template>
  <main>
    <HeroSection />
    <ProblemSection />
    <PlatformSection />
    <CapabilitiesSection />
    <DashboardSection />
    <MarinaSection />
    <UseCasesSection />
    <CompareSection />
    <ClosingSection />
  </main>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ProblemSection from '../components/sections/ProblemSection.vue'
import { useFadeIn } from '../composables/useFadeIn'

const PlatformSection = defineAsyncComponent(() => import('../components/sections/PlatformSection.vue'))
const CapabilitiesSection = defineAsyncComponent(() => import('../components/sections/CapabilitiesSection.vue'))
const MarinaSection = defineAsyncComponent(() => import('../components/sections/MarinaSection.vue'))
const DashboardSection = defineAsyncComponent(() => import('../components/sections/DashboardSection.vue'))
const UseCasesSection = defineAsyncComponent(() => import('../components/sections/UseCasesSection.vue'))
const CompareSection = defineAsyncComponent(() => import('../components/sections/CompareSection.vue'))
const ClosingSection = defineAsyncComponent(() => import('../components/sections/ClosingSection.vue'))

useFadeIn()
</script>
