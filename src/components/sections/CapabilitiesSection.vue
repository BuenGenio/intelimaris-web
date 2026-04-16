<template>
  <section class="capabilities-section" id="capabilities">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('capabilities.label') }}</div>
        <h2>{{ t('capabilities.title') }}</h2>
        <p class="section-description">{{ t('capabilities.subtitle') }}</p>
      </div>

      <div class="capabilities-grid capabilities-grid-four">
        <div class="capability-card fade-in">
          <div class="capability-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="8" stroke="currentColor" stroke-width="2"/>
              <path d="M12 8V12L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <h3>{{ t('capabilities.network.title') }}</h3>
          <p>{{ t('capabilities.network.desc') }}</p>
        </div>

        <div class="capability-card fade-in">
          <div class="capability-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 3c-4 4-7 7-7 12a7 7 0 0 0 14 0c0-5-3-8-7-12z" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="14" r="2" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('capabilities.ai.title') }}</h3>
          <p>{{ t('capabilities.ai.desc') }}</p>
        </div>

        <div class="capability-card fade-in">
          <div class="capability-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2v20M2 12h20M6 6l12 12M6 18L18 6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('capabilities.action.title') }}</h3>
          <p>{{ t('capabilities.action.desc') }}</p>
        </div>

        <div class="capability-card fade-in">
          <div class="capability-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 21h18M5 21V7l8-4v18M13 21V11l8 4v6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('capabilities.marina.title') }}</h3>
          <p>{{ t('capabilities.marina.desc') }}</p>
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
.capabilities-grid-four {
  grid-template-columns: repeat(2, 1fr);
}
@media (min-width: 960px) {
  .capabilities-grid-four {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
