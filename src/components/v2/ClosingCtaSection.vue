<template>
  <section class="chapter closing" data-chapter="light">
    <div class="container-wide">
      <hr class="line closing-rule" />
      <div class="closing-inner">
        <h2 class="t-display">{{ t('v2.closing.title') }}</h2>
        <p class="t-lede">{{ t('v2.closing.lede') }}</p>
        <div class="closing-actions">
          <RouterLink to="/contact" class="link-arrow">{{ t('v2.closing.primary') }}</RouterLink>
          <RouterLink to="/products" class="link-arrow">{{ t('v2.closing.secondary') }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.closing-inner {
  max-width: 46rem;
}

.closing-rule {
  margin-bottom: var(--space-8);
}

.closing-inner .t-lede {
  margin-top: var(--space-4);
}

.closing-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin-top: var(--space-8);
}
</style>
