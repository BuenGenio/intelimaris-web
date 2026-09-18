<template>
  <section class="chapter position" data-chapter="light">
    <div class="container-wide">
      <div class="section-head">
        <span class="t-overline">{{ t('v2.position.overline') }}</span>
        <h2 class="t-display">{{ t('v2.position.title') }}</h2>
        <p class="t-lede">{{ t('v2.position.lede') }}</p>
      </div>

      <ol class="position-grid">
        <li v-for="(job, index) in jobs" :key="job" class="position-card">
          <span class="position-index t-num">{{ String(index + 1).padStart(2, '0') }}</span>
          <h3>{{ t(`v2.position.${job}.title`) }}</h3>
          <p>{{ t(`v2.position.${job}.body`) }}</p>
        </li>
      </ol>

      <WaveRule class="position-rule" center />
    </div>
  </section>
</template>

<script setup lang="ts">
import WaveRule from './WaveRule.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const jobs = ['navigate', 'monitor', 'dock', 'operate'] as const
</script>

<style scoped>
.position-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
  list-style: none;
  margin: var(--space-16) 0 0;
  padding: 0;
  counter-reset: none;
}

.position-card {
  padding: var(--space-6) 0 0;
  border-top: 2px solid var(--brand-wave);
}

.position-index {
  display: block;
  font-size: var(--type-caption);
  color: var(--brand-wave);
  margin-bottom: var(--space-3);
}

.position-card h3 {
  margin-bottom: var(--space-3);
}

.position-card p {
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
  margin: 0;
}

.position-rule {
  margin-top: var(--space-16);
}

@media (max-width: 960px) {
  .position-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-8) var(--space-6);
  }
}

@media (max-width: 560px) {
  .position-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
