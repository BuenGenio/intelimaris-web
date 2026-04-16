<template>
  <section class="app-section" id="app-center">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('appScreen.label') }}</div>
        <h2>{{ t('appScreen.title') }}</h2>
      </div>
      <ul class="app-features">
        <li v-for="i in 6" :key="i">{{ t(`appScreen.item${i}`) }}</li>
      </ul>
      <p class="app-compat">{{ t('appScreen.compat') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.app-section {
  background: var(--ocean-blue);
  border-top: 1px solid var(--border-subtle);
}
.app-features {
  max-width: 40rem;
  margin: 0 auto 1.5rem;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.75;
}
.app-features li {
  margin-bottom: 0.5rem;
}
.app-compat {
  text-align: center;
  color: var(--text-muted);
  font-size: 0.9rem;
}
</style>
