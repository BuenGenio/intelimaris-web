<template>
  <main>
    <HeroSection />
    <ProblemSection />
    <PlatformSection />
    <CapabilitiesSection />
    <MarinaSection />
    <AiStackSection />
    <ArchitectureSection />
    <SensorsSection />
    <DashboardSection />
    <AutomationSection />
    <VisionSection />
    <UseCasesSection />
    <BusinessSection />
    <FuelDashSection />
    <AppSection />
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
const AiStackSection = defineAsyncComponent(() => import('../components/sections/AiStackSection.vue'))
const CapabilitiesSection = defineAsyncComponent(() => import('../components/sections/CapabilitiesSection.vue'))
const MarinaSection = defineAsyncComponent(() => import('../components/sections/MarinaSection.vue'))
const ArchitectureSection = defineAsyncComponent(() => import('../components/sections/ArchitectureSection.vue'))
const SensorsSection = defineAsyncComponent(() => import('../components/sections/SensorsSection.vue'))
const DashboardSection = defineAsyncComponent(() => import('../components/sections/DashboardSection.vue'))
const AutomationSection = defineAsyncComponent(() => import('../components/sections/AutomationSection.vue'))
const VisionSection = defineAsyncComponent(() => import('../components/sections/VisionSection.vue'))
const UseCasesSection = defineAsyncComponent(() => import('../components/sections/UseCasesSection.vue'))
const BusinessSection = defineAsyncComponent(() => import('../components/sections/BusinessSection.vue'))
const FuelDashSection = defineAsyncComponent(() => import('../components/sections/FuelDashSection.vue'))
const AppSection = defineAsyncComponent(() => import('../components/sections/AppSection.vue'))
const CompareSection = defineAsyncComponent(() => import('../components/sections/CompareSection.vue'))
const ClosingSection = defineAsyncComponent(() => import('../components/sections/ClosingSection.vue'))

useFadeIn()
</script>
