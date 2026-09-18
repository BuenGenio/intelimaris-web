<template>
  <section id="platform" class="chapter sensors" data-chapter="light">
    <div class="container-wide sensors-grid">
      <div class="sensors-copy">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.sensors.overline') }}</span>
          <h2 class="t-display">{{ t('v2.sensors.title') }}</h2>
          <p class="t-lede">{{ t('v2.sensors.lede') }}</p>
        </div>

        <ul class="sensors-points">
          <li v-for="point in points" :key="point">
            <h3>{{ t(`v2.sensors.point.${point}.title`) }}</h3>
            <p>{{ t(`v2.sensors.point.${point}.body`) }}</p>
          </li>
        </ul>

        <RouterLink to="/products" class="btn-quiet">{{ t('v2.sensors.cta') }}</RouterLink>
      </div>

      <div class="sensors-shot">
        <GlassShot
          id="waterwayz-sensors"
          :caption="t('v2.sensors.shotCaption')"
          sizes="(min-width: 1080px) 560px, 94vw"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlassShot from './GlassShot.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const points = ['stale', 'lora', 'clocks'] as const
</script>

<style scoped>
.sensors-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.92fr);
  gap: clamp(2rem, 1rem + 4vw, 4.5rem);
  align-items: start;
}

.sensors-points {
  list-style: none;
  margin: var(--space-12) 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.sensors-points li {
  padding-left: var(--space-4);
  border-left: 2px solid var(--brand-wave);
}

.sensors-points h3 {
  margin-bottom: var(--space-2);
}

.sensors-points p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
  max-width: 46ch;
}

.sensors-shot {
  position: sticky;
  top: var(--space-16);
}

@media (max-width: 1040px) {
  .sensors-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .sensors-shot {
    position: static;
  }
}
</style>
