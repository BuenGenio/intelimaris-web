<template>
  <header class="site-header" lang="en" @keydown.esc="closeMenu(true)">
    <svg class="glass-filter-defs" aria-hidden="true" width="0" height="0"><defs><filter id="nav-refraction" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.12" numOctaves="1" seed="7" result="surface" /><feDisplacementMap in="SourceGraphic" in2="surface" scale="3" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
    <div class="nav-glass" aria-hidden="true"></div><div class="nav-refraction" aria-hidden="true"></div>
    <div class="site-nav editorial-shell">
      <RouterLink to="/" class="site-brand" aria-label="InteliMaris home">
        <Wordmark :size="27" tm />
      </RouterLink>
      <nav class="site-desktop-nav" aria-label="Main navigation">
        <template v-for="link in MAIN_NAVIGATION" :key="link.to"><PlatformMenu v-if="link.to === '/capabilities'" /><RouterLink v-else :to="link.to">{{ link.label }}</RouterLink></template>
      </nav>
      <div class="site-utilities">
        <RoleSwitcher @click="menuOpen = false" />
        <SitePreferences @click="menuOpen = false" />
        <RouterLink :to="contactLink(audience)" class="site-contact">Talk to us <span aria-hidden="true">↗</span>
        </RouterLink>
        <button ref="menuButton" type="button" class="site-menu-button" :aria-expanded="menuOpen" aria-controls="site-mobile-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
      </div>
    </div>
    <nav v-if="menuOpen" id="site-mobile-nav" class="site-mobile-nav editorial-shell" aria-label="Mobile navigation">
      <RouterLink v-for="link in MAIN_NAVIGATION" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>

      <div class="mobile-platform-links"><p>Software &amp; marina</p><RouterLink v-for="link in PLATFORM_NAVIGATION.filter(item => item.to !== '/capabilities')" :key="link.to" :to="link.to">{{ link.label }}</RouterLink></div>
      <RouterLink :to="contactLink(audience)">Talk to us</RouterLink>
    </nav>
    <div class="breadcrumb-strip"><div class="editorial-shell"><SiteBreadcrumbs /></div></div>
  </header>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PlatformMenu from '@/components/PlatformMenu.vue'
import { MAIN_NAVIGATION, PLATFORM_NAVIGATION } from '@/data/navigation'
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'
import SitePreferences from '@/components/SitePreferences.vue'
import RoleSwitcher from '@/components/RoleSwitcher.vue'
import Wordmark from '@/components/v2/Wordmark.vue'
import { useAudience } from '@/composables/useAudience'
import { contactLink } from '@/data/audiences'
const { audience } = useAudience()
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeMenu = async (restoreFocus = false) => { menuOpen.value = false; if (restoreFocus) { await nextTick(); menuButton.value?.focus() } }
watch(() => route.fullPath, () => closeMenu())
</script>
