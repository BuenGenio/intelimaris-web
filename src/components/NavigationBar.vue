<template>
  <header class="site-header" lang="en" @keydown.esc="closeMenu(true)">
    <div class="site-nav editorial-shell">
      <RouterLink to="/" class="site-brand" aria-label="InteliMaris home">
        <Wordmark :size="27" tm />
      </RouterLink>
      <nav class="site-desktop-nav" aria-label="Main navigation">
        <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
      </nav>
      <div class="site-utilities">
        <button type="button" class="site-theme" :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'" @click="setTheme(theme === 'dark' ? 'light' : 'dark')">{{ theme === 'dark' ? 'Light' : 'Dark' }}</button>
        <label class="site-language">
          <span class="sr-only">Language</span>
          <select aria-label="Language" :value="currentLanguage" @change="changeLanguage">
            <option v-for="lang in languages" :value="lang" :key="lang">{{ languageData[lang].code }}</option>
          </select>
        </label>
        <RouterLink :to="contactLink(audience)" class="site-contact">Talk to us <span aria-hidden="true">↗</span>
        </RouterLink>
        <button ref="menuButton" type="button" class="site-menu-button" :aria-expanded="menuOpen" aria-controls="site-mobile-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
      </div>
    </div>
    <nav v-if="menuOpen" id="site-mobile-nav" class="site-mobile-nav editorial-shell" aria-label="Mobile navigation">
      <RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>

      <RouterLink to="/marinas">InteliMarina / PMS</RouterLink>
      <RouterLink :to="contactLink(audience)">Talk to us</RouterLink>
      <button type="button" class="mobile-theme" @click="setTheme(theme === 'dark' ? 'light' : 'dark')">{{ theme === 'dark' ? 'Use light appearance' : 'Use dark appearance' }}</button>
    </nav>
    <div class="audience-context">
      <div class="editorial-shell">
        <span v-if="audience">Your perspective <RouterLink :to="audienceLink(audience.id)">{{ audience.short }}</RouterLink>
        </span>
        <span v-else>WaterWayz™ <span aria-hidden="true">/</span> InteliMARIS <span aria-hidden="true">/</span> InteliMarina</span>
        <button v-if="audience" type="button" @click="reset">Change role <span aria-hidden="true">↗</span>
        </button>
        <RouterLink v-else to="/#choose">Find your role <span aria-hidden="true">↗</span>
        </RouterLink>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import Wordmark from '@/components/v2/Wordmark.vue'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import { useAudience } from '@/composables/useAudience'
import { audienceLink, contactLink } from '@/data/audiences'
import type { Language } from '@/i18n/translations'
const links = [{ to: '/#choose', label: 'For you' }, { to: '/waterwayz', label: 'WaterWayz™' }, { to: '/capabilities', label: 'The platform' }, { to: '/products', label: 'Hardware' }, { to: '/about', label: 'Our story' }]
const { theme, setTheme } = useTheme()
const { currentLanguage, setLanguage, languageData } = useI18n()
const { audience, reset } = useAudience()
const languages: Language[] = ['en', 'es', 'el', 'uk']
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeMenu = async (restoreFocus = false) => { menuOpen.value = false; if (restoreFocus) { await nextTick(); menuButton.value?.focus() } }
function changeLanguage(event: Event) { setLanguage((event.target as HTMLSelectElement).value as Language) }
watch(() => route.fullPath, () => closeMenu())
</script>
