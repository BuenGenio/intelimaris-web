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
import { onMounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ProblemSection from '../components/sections/ProblemSection.vue'
import PlatformSection from '../components/sections/PlatformSection.vue'
import AiStackSection from '../components/sections/AiStackSection.vue'
import CapabilitiesSection from '../components/sections/CapabilitiesSection.vue'
import MarinaSection from '../components/sections/MarinaSection.vue'
import ArchitectureSection from '../components/sections/ArchitectureSection.vue'
import SensorsSection from '../components/sections/SensorsSection.vue'
import DashboardSection from '../components/sections/DashboardSection.vue'
import AutomationSection from '../components/sections/AutomationSection.vue'
import VisionSection from '../components/sections/VisionSection.vue'
import UseCasesSection from '../components/sections/UseCasesSection.vue'
import BusinessSection from '../components/sections/BusinessSection.vue'
import FuelDashSection from '../components/sections/FuelDashSection.vue'
import AppSection from '../components/sections/AppSection.vue'
import CompareSection from '../components/sections/CompareSection.vue'
import ClosingSection from '../components/sections/ClosingSection.vue'

onMounted(() => {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  const fadeElements = document.querySelectorAll('.fade-in')
  fadeElements.forEach((el) => observer.observe(el))
})
</script>
