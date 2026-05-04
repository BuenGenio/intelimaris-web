<template>
  <section class="ai-stack-section" id="ai-stack">
    <div class="container">
      <div class="section-header">
        <div class="section-label">{{ t('aiStack.label') }}</div>
        <h2>{{ t('aiStack.title') }}</h2>
      </div>
      <div class="ai-stack-prose">
        <p>{{ t('aiStack.p1') }}</p>
        <p>{{ t('aiStack.p2') }}</p>
        <p class="ai-stack-tagline">{{ t('aiStack.tagline') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.ai-stack-prose {
  max-width: 48rem;
  margin: 0 auto;
}
.ai-stack-prose p {
  color: var(--text-secondary);
  line-height: 1.75;
  margin-bottom: 1.25rem;
  font-size: 1.05rem;
}
.ai-stack-tagline {
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0 !important;
}
</style>
