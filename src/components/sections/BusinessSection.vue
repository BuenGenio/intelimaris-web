<template>
  <section class="business-section">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('business.label') }}</div>
        <h2>{{ t('business.title') }}</h2>
      </div>
      
      <div class="business-grid">
        <div class="business-card fade-in">
          <div class="business-tier">{{ t('business.hardware.tier') }}</div>
          <h3>{{ t('business.hardware.title') }}</h3>
          <p class="business-pricing-note">{{ t('business.pricingNote') }}</p>
          <p>{{ t('business.hardware.desc') }}</p>
          <ul class="business-features">
            <li>{{ t('business.hardware.feature1') }}</li>
            <li>{{ t('business.hardware.feature2') }}</li>
            <li>{{ t('business.hardware.feature3') }}</li>
            <li>{{ t('business.hardware.feature4') }}</li>
          </ul>
        </div>
        
        <div class="business-card featured fade-in">
          <div class="business-tier accent">{{ t('business.saas.tier') }}</div>
          <h3>{{ t('business.saas.title') }}</h3>
          <p class="business-pricing-note">{{ t('business.pricingNote') }}</p>
          <p>{{ t('business.saas.desc') }}</p>
          <ul class="business-features">
            <li>{{ t('business.saas.feature1') }}</li>
            <li>{{ t('business.saas.feature2') }}</li>
            <li>{{ t('business.saas.feature3') }}</li>
            <li>{{ t('business.saas.feature4') }}</li>
            <li>{{ t('business.saas.feature5') }}</li>
          </ul>
        </div>
        
        <div class="business-card fade-in">
          <div class="business-tier">{{ t('business.data.tier') }}</div>
          <h3>{{ t('business.data.title') }}</h3>
          <p class="business-pricing-note">{{ t('business.pricingNote') }}</p>
          <p>{{ t('business.data.desc') }}</p>
          <ul class="business-features">
            <li>{{ t('business.data.feature1') }}</li>
            <li>{{ t('business.data.feature2') }}</li>
            <li>{{ t('business.data.feature3') }}</li>
            <li>{{ t('business.data.feature4') }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.business-pricing-note {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 1rem;
  line-height: 1.45;
}
</style>
