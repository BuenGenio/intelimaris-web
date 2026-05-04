<template>
  <section class="vision-section" id="vision">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label accent">{{ t('vision.label') }}</div>
        <h2>{{ t('vision.title') }}</h2>
        <p class="section-description">
          {{ t('vision.description') }}
        </p>
      </div>

      <div class="vision-grid vision-grid-roadmap">
        <div v-for="step in 4" :key="step" class="vision-card fade-in">
          <div class="vision-step">{{ step }}</div>
          <h3>{{ t(`vision.roadmap.s${step}.title`) }}</h3>
          <p>{{ t(`vision.roadmap.s${step}.desc`) }}</p>
        </div>
      </div>

      <div class="vision-statement">
        <blockquote>
          {{ t('vision.quote') }}
        </blockquote>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.vision-step {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--cyan-glow);
  border: 1px solid var(--cyan-electric);
  border-radius: 0.5rem;
  color: var(--cyan-bright);
  font-family: 'Montserrat', sans-serif;
  font-size: 0.875rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}
.vision-grid-roadmap {
  grid-template-columns: 1fr;
}
@media (min-width: 720px) {
  .vision-grid-roadmap {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
