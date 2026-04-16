<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="brand-icon">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 10V22L16 28L28 22V10L16 4Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M16 16L4 10M16 16L28 10M16 16V28" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span class="brand-text">InteliMaris</span>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('footer.platform') }}</h4>
          <a href="/#ecosystem">{{ t('footer.platform.ecosystem') }}</a>
          <a href="/#platform">{{ t('nav.platform') }}</a>
          <a href="/#ai-stack">{{ t('nav.aiStack') }}</a>
          <a href="/#architecture">{{ t('footer.platform.architecture') }}</a>
          <a href="/#capabilities">{{ t('footer.platform.capabilities') }}</a>
          <a href="/#marina">{{ t('footer.platform.marina') }}</a>
          <a href="/#sensors">{{ t('footer.platform.sensors') }}</a>
          <a href="/products">{{ t('footer.platform.products') }}</a>
          <a href="/intelibilge">{{ t('footer.platform.intelibilge') }}</a>
          <a href="/#automation">{{ t('footer.platform.automation') }}</a>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('footer.company') }}</h4>
          <a href="/about">{{ t('footer.company.about') }}</a>
          <a href="/#vision">{{ t('footer.company.vision') }}</a>
          <a href="/#contact">{{ t('footer.company.contact') }}</a>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
