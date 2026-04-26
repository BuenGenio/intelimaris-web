<template>
  <nav class="nav-container" aria-label="Main navigation">
    <div class="nav-content">
      <RouterLink to="/" class="nav-brand" @click="closeDrawer">
        <img :src="logoSrc" alt="InteliMaris" class="brand-logo">
      </RouterLink>

      <div class="nav-desktop-only nav-primary-bar">
        <RouterLink
          v-for="item in primaryLinks"
          :key="item.hash"
          :to="{ name: 'home', hash: item.hash }"
          class="nav-link"
        >
          {{ t(item.labelKey) }}
        </RouterLink>
        <RouterLink to="/products" class="nav-link">{{ t('nav.products') }}</RouterLink>
        <RouterLink to="/about" class="nav-link">{{ t('nav.about') }}</RouterLink>
      </div>

      <div class="nav-actions">
        <button
          type="button"
          class="nav-drawer-toggle nav-mobile-only"
          :aria-label="t('nav.openMenu')"
          :aria-expanded="isDrawerOpen"
          aria-controls="nav-mobile-drawer"
          @click="openDrawer"
        >
          <span class="nav-drawer-toggle-bar" aria-hidden="true"/>
          <span class="nav-drawer-toggle-bar" aria-hidden="true"/>
          <span class="nav-drawer-toggle-bar" aria-hidden="true"/>
        </button>

        <div class="theme-switcher nav-desktop-inline">
          <button
            class="theme-option"
            :class="{ active: theme === 'dark' }"
            data-theme="dark"
            type="button"
            @click="setTheme('dark')"
            aria-label="Dark mode"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button
            class="theme-option"
            :class="{ active: theme === 'light' }"
            data-theme="light"
            type="button"
            @click="setTheme('light')"
            aria-label="Light mode"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
              <circle cx="12" cy="12" r="5" stroke-width="2"/>
              <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>

        <div class="lang-selector nav-desktop-inline">
          <button
            class="lang-current"
            :class="{ open: isLangOpen }"
            type="button"
            aria-label="Select language"
            :aria-expanded="isLangOpen"
            aria-haspopup="true"
            @click="toggleLang"
          >
            <img :src="languageData[currentLanguage].flag" :alt="languageData[currentLanguage].code" class="lang-flag">
            <span class="lang-code">{{ languageData[currentLanguage].code }}</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style="opacity: 0.6;">
              <path d="M3 5L6 8L9 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="lang-dropdown" :class="{ open: isLangOpen }">
            <button
              v-for="lang in languages"
              :key="lang"
              type="button"
              class="lang-option"
              :class="{ active: currentLanguage === lang }"
              @click="selectLanguage(lang)"
            >
              <img :src="languageData[lang].flag" :alt="languageData[lang].code">
              <span class="lang-option-text">{{ languageData[lang].name }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="nav-drawer-fade">
        <div v-if="isDrawerOpen" class="nav-drawer-portal">
          <div class="nav-drawer-backdrop" @click="closeDrawer"/>
          <aside
            id="nav-mobile-drawer"
            class="nav-drawer-panel"
            role="dialog"
            aria-modal="true"
            :aria-label="t('nav.menuTitle')"
          >
            <div class="nav-drawer-header">
              <span class="nav-drawer-title">{{ t('nav.menuTitle') }}</span>
              <button type="button" class="nav-drawer-close" :aria-label="t('nav.closeMenu')" @click="closeDrawer">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </div>

            <div class="nav-drawer-scroll">
              <RouterLink to="/" class="nav-drawer-link" @click="closeDrawer">{{ t('nav.home') }}</RouterLink>

              <p class="nav-drawer-group-label">{{ t('nav.groupSections') }}</p>
              <RouterLink
                v-for="item in primaryLinks"
                :key="'m-' + item.hash"
                :to="{ name: 'home', hash: item.hash }"
                class="nav-drawer-link"
                @click="closeDrawer"
              >
                {{ t(item.labelKey) }}
              </RouterLink>

              <p class="nav-drawer-group-label">{{ t('nav.groupPages') }}</p>
              <RouterLink to="/products" class="nav-drawer-link" @click="closeDrawer">{{ t('nav.products') }}</RouterLink>
              <RouterLink to="/about" class="nav-drawer-link" @click="closeDrawer">{{ t('nav.about') }}</RouterLink>

              <div class="nav-drawer-divider"/>

              <p class="nav-drawer-group-label">{{ t('nav.appearance') }}</p>
              <div class="nav-drawer-theme">
                <button
                  type="button"
                  class="theme-option"
                  :class="{ active: theme === 'dark' }"
                  @click="setTheme('dark')"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ t('nav.themeDark') }}</span>
                </button>
                <button
                  type="button"
                  class="theme-option"
                  :class="{ active: theme === 'light' }"
                  @click="setTheme('light')"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="5" stroke-width="2"/>
                    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-width="2" stroke-linecap="round"/>
                  </svg>
                  <span>{{ t('nav.themeLight') }}</span>
                </button>
              </div>

              <p class="nav-drawer-group-label">{{ t('nav.language') }}</p>
              <div class="nav-drawer-lang">
                <button
                  v-for="lang in languages"
                  :key="'drawer-lang-' + lang"
                  type="button"
                  class="nav-drawer-lang-btn"
                  :class="{ active: currentLanguage === lang }"
                  @click="selectLanguage(lang)"
                >
                  <img :src="languageData[lang].flag" :alt="languageData[lang].code">
                  <span>{{ languageData[lang].name }}</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { useI18n } from '@/composables/useI18n'
import type { Language } from '@/i18n/translations'

const logoSrc = `${import.meta.env.BASE_URL}assets/logo.svg`

const primaryLinks = [
  { hash: '#platform', labelKey: 'nav.platform' as const },
  { hash: '#marina', labelKey: 'nav.marina' as const },
  { hash: '#why-us', labelKey: 'nav.capabilities' as const },
  { hash: '#contact', labelKey: 'nav.contact' as const }
]

const languages: Language[] = ['en', 'es', 'el', 'uk']

const { theme, setTheme } = useTheme()
const { currentLanguage, t, setLanguage, languageData } = useI18n()
const route = useRoute()

const isLangOpen = ref(false)
const isDrawerOpen = ref(false)

const openDrawer = () => {
  isDrawerOpen.value = true
  isLangOpen.value = false
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const toggleLang = () => {
  isLangOpen.value = !isLangOpen.value
}

const selectLanguage = (lang: Language) => {
  setLanguage(lang)
  isLangOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.lang-selector')) {
    isLangOpen.value = false
  }
}

const handleEscape = (e: KeyboardEvent) => {
  if (e.key !== 'Escape') return
  isLangOpen.value = false
  isDrawerOpen.value = false
}

watch(isDrawerOpen, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    isDrawerOpen.value = false
  }
)

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
  document.body.style.overflow = ''
})
</script>
