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
          <RouterLink :to="{ name: 'home', hash: '#ecosystem' }">{{ t('footer.platform.ecosystem') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#platform' }">{{ t('nav.platform') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#ai-stack' }">{{ t('nav.aiStack') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#architecture' }">{{ t('footer.platform.architecture') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#capabilities' }">{{ t('footer.platform.capabilities') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#marina' }">{{ t('footer.platform.marina') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#sensors' }">{{ t('footer.platform.sensors') }}</RouterLink>
          <RouterLink to="/products">{{ t('footer.platform.products') }}</RouterLink>
          <RouterLink to="/intelibilge">{{ t('footer.platform.intelibilge') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#automation' }">{{ t('footer.platform.automation') }}</RouterLink>
        </div>
        
        <div class="footer-section">
          <h4>{{ t('footer.company') }}</h4>
          <RouterLink to="/about">{{ t('footer.company.about') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#vision' }">{{ t('footer.company.vision') }}</RouterLink>
          <RouterLink :to="{ name: 'home', hash: '#contact' }">{{ t('footer.company.contact') }}</RouterLink>
        </div>
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

const { t } = useI18n()
</script>
