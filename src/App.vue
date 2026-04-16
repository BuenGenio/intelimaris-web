<template>
  <div id="app">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NavigationBar />
    <div id="main-content">
      <router-view />
    </div>
    <FooterSection />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import NavigationBar from './components/NavigationBar.vue'
import FooterSection from './components/FooterSection.vue'
import { useTheme } from './composables/useTheme'
import { useI18n } from './composables/useI18n'

const { initTheme } = useTheme()
const { initLanguage } = useI18n()

onMounted(() => {
  initTheme()
  initLanguage()
})
</script>

<style>
@import './assets/main.css';

.skip-link {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.75rem 1.5rem;
  background: var(--cyan-bright);
  color: var(--deep-navy);
  font-weight: 600;
  border-radius: 0 0 0.5rem 0.5rem;
  text-decoration: none;
  transition: top 0.2s;
}

.skip-link:focus {
  top: 0;
}
</style>
