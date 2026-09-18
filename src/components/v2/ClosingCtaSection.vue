<template>
  <section class="chapter closing" data-chapter="black">
    <div class="container-wide closing-inner">
      <WaveRule class="closing-rule" center />
      <h2 class="t-display">{{ t('v2.closing.title') }}</h2>
      <p class="t-lede">{{ t('v2.closing.lede') }}</p>
      <div class="closing-actions">
        <RouterLink to="/contact" class="btn-signal">{{ t('v2.closing.primary') }}</RouterLink>
        <RouterLink to="/products" class="btn-quiet">{{ t('v2.closing.secondary') }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import WaveRule from './WaveRule.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.closing-inner {
  max-width: 46rem;
  text-align: center;
}

.closing-rule {
  margin: 0 auto var(--space-8);
}

.closing-inner .t-lede {
  margin-top: var(--space-4);
}

.closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
  justify-content: center;
}
</style>
