<template>
  <footer class="footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand-block">
          <RouterLink to="/" class="footer-brand">
            <img :src="logoSrc" alt="InteliMaris" class="footer-logo">
            <span class="brand-text">InteliMaris</span>
          </RouterLink>
          <p class="footer-summary">
            Maritime intelligence infrastructure for vessels, marinas, and fleets.
          </p>
          <div class="footer-contact">
            <MailLink />
            <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer">intelimaris.com</a>
          </div>
        </div>

        <nav class="footer-links" aria-label="Footer navigation">
          <div class="footer-section">
            <h4>{{ t('footer.platform') }}</h4>
            <RouterLink :to="{ name: 'home', hash: '#platform' }">{{ t('nav.platform') }}</RouterLink>
            <RouterLink :to="{ name: 'home', hash: '#marina' }">{{ t('footer.platform.marina') }}</RouterLink>
            <RouterLink :to="{ name: 'home', hash: '#why-us' }">{{ t('nav.capabilities') }}</RouterLink>
            <RouterLink to="/products">{{ t('footer.platform.products') }}</RouterLink>
          </div>

          <div class="footer-section">
            <h4>{{ t('footer.company') }}</h4>
            <RouterLink to="/about">{{ t('footer.company.about') }}</RouterLink>
            <RouterLink :to="{ name: 'home', hash: '#contact' }">{{ t('footer.company.contact') }}</RouterLink>
          </div>
        </nav>
      </div>

      <div class="footer-bottom">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import MailLink from '@/components/MailLink.vue'

const logoSrc = `${import.meta.env.BASE_URL}assets/logo.svg`
const { t } = useI18n()
</script>
