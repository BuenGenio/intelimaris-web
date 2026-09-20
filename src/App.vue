<template>
  <div class="app-shell">
    <a href="#main-content" class="skip-link">Skip to main content</a>
    <NavigationBar v-if="!isStandalone" />
    <div id="main-content">
      <router-view />
    </div>
    <FooterSection v-if="!isStandalone" />
    <OnboardingModal v-if="mounted" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref } from 'vue'
import { useRoute } from 'vue-router'
import NavigationBar from './components/NavigationBar.vue'
import FooterSection from './components/FooterSection.vue'
import OnboardingModal from './components/onboarding/OnboardingModal.vue'
import { useAudienceRouteSync } from './composables/useAudience'
import { useTheme } from './composables/useTheme'
import { useI18n } from './composables/useI18n'
import { useFitHeadings } from './composables/useFitHeadings'

useAudienceRouteSync()
useFitHeadings()
const { initTheme } = useTheme()
const { initLanguage } = useI18n()

const route = useRoute()
const isStandalone = computed(() => route.name === 'home-alt')

/* The onboarding dialog teleports to body, so it waits for the client. */
const mounted = ref(false)
let disposeTheme: (() => void) | undefined
onBeforeUnmount(() => disposeTheme?.())
onMounted(() => {
  mounted.value = true
  disposeTheme = initTheme()
  initLanguage()
})
</script>

<style>
@import './assets/main.css';
@import './assets/v2.css';
@import './assets/audience.css';
@import './assets/screens.css';

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
