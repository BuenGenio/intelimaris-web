<template>
  <header class="site-header" :class="{ 'is-hidden': hidden }" lang="en" @keydown.esc="closeMenu(true)" @focusin="hidden = false">
    <svg class="glass-filter-defs" aria-hidden="true" width="0" height="0"><defs><filter id="nav-refraction" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.008 0.12" numOctaves="1" seed="7" result="surface" /><feDisplacementMap in="SourceGraphic" in2="surface" scale="3" xChannelSelector="R" yChannelSelector="G" /></filter></defs></svg>
    <div class="nav-glass" aria-hidden="true"></div><div class="nav-refraction" aria-hidden="true"></div>
    <div class="site-nav editorial-shell">
      <RouterLink to="/" class="site-brand" aria-label="InteliMaris home">
        <PartnerLogo v-if="logo" :logo="logo" :size="40" />
        <Wordmark v-else :size="27" tm />
      </RouterLink>
      <nav class="site-desktop-nav" aria-label="Main navigation">
        <template v-for="link in MAIN_NAVIGATION" :key="link.to"><PlatformMenu v-if="link.to === '/capabilities'" /><RouterLink v-else :to="link.to">{{ link.label }}</RouterLink></template>
      </nav>
      <div class="site-utilities">
        <RoleSwitcher @click="menuOpen = false" />
        <SitePreferences @click="menuOpen = false" />
        <a :href="loginLink()" class="site-login" rel="noopener">Log in</a>
        <RouterLink :to="contactLink(audience)" class="site-book">Book a call</RouterLink>
        <button type="button" class="site-contact site-start" @click="start(audience?.id, $event.currentTarget as HTMLElement)">Start free <span aria-hidden="true">→</span></button>
        <button ref="menuButton" type="button" class="site-menu-button" :aria-expanded="menuOpen" aria-controls="site-mobile-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? 'Close' : 'Menu' }}</button>
      </div>
    </div>
    <nav v-if="menuOpen" id="site-mobile-nav" class="site-mobile-nav editorial-shell" aria-label="Mobile navigation">
      <RouterLink v-for="link in MAIN_NAVIGATION" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>

      <div class="mobile-platform-links"><p>Software &amp; marina</p><RouterLink v-for="link in PLATFORM_NAVIGATION.filter(item => item.to !== '/capabilities')" :key="link.to" :to="link.to">{{ link.label }}</RouterLink></div>
      <div class="mobile-account">
        <button type="button" class="site-contact site-start" @click="closeMenu(); start(audience?.id)">Start free <span aria-hidden="true">→</span></button>
        <RouterLink :to="contactLink(audience)" class="site-book">Book a call</RouterLink>
        <a :href="loginLink()" class="site-book" rel="noopener">Log in</a>
      </div>
    </nav>
    <div class="breadcrumb-strip"><div class="editorial-shell"><SiteBreadcrumbs /></div></div>
  </header>
</template>
<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import PlatformMenu from '@/components/PlatformMenu.vue'
import { MAIN_NAVIGATION, PLATFORM_NAVIGATION } from '@/data/navigation'
import SiteBreadcrumbs from '@/components/SiteBreadcrumbs.vue'
import SitePreferences from '@/components/SitePreferences.vue'
import RoleSwitcher from '@/components/RoleSwitcher.vue'
import Wordmark from '@/components/v2/Wordmark.vue'
import PartnerLogo from '@/components/PartnerLogo.vue'
import { useLogo } from '@/composables/useLogo'
import { useAudience } from '@/composables/useAudience'
import { contactLink } from '@/data/audiences'
import { loginLink } from '@/data/app'
import { useOnboarding } from '@/composables/useOnboarding'
const { audience } = useAudience()
const { start } = useOnboarding()
const { logo } = useLogo()
const route = useRoute()
const menuOpen = ref(false)
const menuButton = ref<HTMLButtonElement | null>(null)
const closeMenu = async (restoreFocus = false) => { menuOpen.value = false; if (restoreFocus) { await nextTick(); menuButton.value?.focus() } }
watch(() => route.fullPath, () => { closeMenu(); hidden.value = false; graceUntil = performance.now() + 900 })

/* The header rolls away as the page scrolls down and returns on the first
   scroll back up, so it stops taxing the viewport while people read. */
const hidden = ref(false)
let lastY = 0
let graceUntil = 0
const onScroll = () => {
  const y = window.scrollY
  const delta = y - lastY
  lastY = y
  if (menuOpen.value || y < 96 || performance.now() < graceUntil) { hidden.value = false; lastY = y; return }
  if (delta > 6) hidden.value = true
  else if (delta < -6) hidden.value = false
}
onMounted(() => { lastY = window.scrollY; window.addEventListener('scroll', onScroll, { passive: true }) })
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
