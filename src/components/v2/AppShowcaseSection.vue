<template>
  <section id="waterwayz" class="chapter app-showcase" data-chapter="light">
    <div class="container-wide">
      <div class="app-intro">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.app.overline') }}</span>
          <h2 class="t-display">{{ t('v2.app.title') }}</h2>
          <p class="t-lede">{{ t('v2.app.lede') }}</p>
        </div>
        <RouterLink to="/waterwayz" class="btn-quiet app-cta">{{ t('v2.app.cta') }}</RouterLink>
      </div>

      <div class="app-lead">
        <GlassShot id="waterwayz-map" :caption="t('v2.app.feature.depth.title')" sizes="(min-width: 1100px) 1180px, 94vw" bleed />
      </div>

      <div class="app-body">
        <ul class="app-features">
          <li v-for="feature in features" :key="feature" class="app-feature">
            <h3>{{ t(`v2.app.feature.${feature}.title`) }}</h3>
            <p>{{ t(`v2.app.feature.${feature}.body`) }}</p>
          </li>
        </ul>

        <div class="app-side">
          <GlassShot id="waterwayz-marina-card" sizes="(min-width: 1100px) 460px, 94vw" />
          <GlassShot id="waterwayz-discover" sizes="(min-width: 1100px) 460px, 94vw" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlassShot from './GlassShot.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const features = ['vessel', 'depth', 'traffic', 'dockpass', 'emergency', 'cameras'] as const
</script>

<style scoped>
.app-intro {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.app-cta {
  flex-shrink: 0;
}

.app-lead {
  margin-top: var(--space-12);
}

.app-body {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.82fr);
  gap: clamp(2rem, 1rem + 4vw, 4rem);
  margin-top: var(--space-16);
}

.app-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-8) var(--space-6);
  align-content: start;
}

.app-feature h3 {
  margin-bottom: var(--space-2);
}

.app-feature p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
}

.app-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

@media (max-width: 1040px) {
  .app-body {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 620px) {
  .app-features {
    grid-template-columns: minmax(0, 1fr);
    gap: var(--space-6);
  }
}
</style>
