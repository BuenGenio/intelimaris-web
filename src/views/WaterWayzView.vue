<template>
  <main class="ww-page">
    <PageHero
      :overline="t('v2.app.overline')"
      :title="t('v2.app.title')"
      :lede="t('v2.app.lede')"
      shot="waterwayz-route"
      :shot-caption="t('v2.hero.shotCaption')"
      tone="dark"
    >
      <template #actions>
        <RouterLink to="/contact" class="btn-signal">{{ t('v2.waterwayz.cta') }}</RouterLink>
        <RouterLink to="/marinas" class="btn-quiet">{{ t('v2.hero.secondary') }}</RouterLink>
      </template>
    </PageHero>

    <section class="chapter" data-chapter="light">
      <div class="container-wide">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.waterwayz.journeyOverline') }}</span>
          <h2 class="t-display">{{ t('v2.waterwayz.journeyTitle') }}</h2>
          <p class="t-lede">{{ t('v2.waterwayz.journeyLede') }}</p>
        </div>

        <ol class="ww-journey">
          <li v-for="(step, index) in journey" :key="step" class="ww-journey-step">
            <span class="ww-journey-index t-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ t(`v2.waterwayz.journey.${step}.title`) }}</h3>
            <p>{{ t(`v2.waterwayz.journey.${step}.body`) }}</p>
          </li>
        </ol>
      </div>
    </section>

    <VoyageSection />

    <AppShowcaseSection />

    <section class="chapter" data-chapter="dark">
      <div class="container-wide ww-workspaces">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.waterwayz.workspaceOverline') }}</span>
          <h2 class="t-display">{{ t('v2.waterwayz.workspaceTitle') }}</h2>
          <p class="t-lede">{{ t('v2.waterwayz.workspaceLede') }}</p>
        </div>

        <ul class="ww-workspace-list">
          <li v-for="workspace in workspaces" :key="workspace.key" class="ww-workspace">
            <span class="ww-workspace-dot" :style="{ background: workspace.color }" aria-hidden="true" />
            <strong>{{ t(`v2.waterwayz.workspace.${workspace.key}`) }}</strong>
          </li>
        </ul>
      </div>
    </section>

    <section class="chapter" data-chapter="light">
      <div class="container-wide">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.waterwayz.roadmapOverline') }}</span>
          <h2>{{ t('v2.waterwayz.roadmapTitle') }}</h2>
          <p class="t-lede">{{ t('v2.waterwayz.roadmapLede') }}</p>
        </div>
        <ul class="ww-roadmap">
          <li v-for="item in roadmap" :key="item" class="ww-roadmap-item">
            <span class="badge-status" data-state="planned">{{ t('availability.planned') }}</span>
            <span>{{ t(`v2.waterwayz.roadmap.${item}`) }}</span>
          </li>
        </ul>
        <p class="ww-disclaimer t-caption">{{ t('v2.disclaimer.charts') }}</p>
      </div>
    </section>

    <ClosingCtaSection />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHero from '@/components/v2/PageHero.vue'
import VoyageSection from '@/components/v2/VoyageSection.vue'
import AppShowcaseSection from '@/components/v2/AppShowcaseSection.vue'
import ClosingCtaSection from '@/components/v2/ClosingCtaSection.vue'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'

const { t } = useI18n()

const journey = ['account', 'vessel', 'plan', 'berth'] as const

/* Workspace accents come straight from the brand book. */
const workspaces = [
  { key: 'vessel', color: '#4274BB' },
  { key: 'marina', color: '#14919B' },
  { key: 'private', color: '#1F6E5E' },
  { key: 'business', color: '#D9A21B' },
  { key: 'maintenance', color: '#B7472A' },
] as const

const roadmap = ['hud', 'alarms', 'night', 'floatplan', 'gpx', 'billing'] as const

useFadeIn('.ww-page')
</script>

<style scoped>
.ww-journey {
  list-style: none;
  margin: var(--space-16) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
}

.ww-journey-step {
  padding-top: var(--space-6);
  border-top: 2px solid var(--brand-wave);
}

.ww-journey-index {
  display: block;
  font-size: var(--type-caption);
  color: var(--brand-wave);
  margin-bottom: var(--space-3);
}

.ww-journey-step h3 {
  margin-bottom: var(--space-2);
}

.ww-journey-step p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
}

.ww-workspace-list {
  list-style: none;
  margin: var(--space-12) 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.ww-workspace {
  display: inline-flex;
  align-items: center;
  gap: var(--space-3);
  padding: 0.625rem 1rem;
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-pill);
  background: var(--surface-soft);
  font-size: var(--type-body-sm);
}

.ww-workspace-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  flex-shrink: 0;
}

.ww-roadmap {
  list-style: none;
  margin: var(--space-12) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-4) var(--space-6);
}

.ww-roadmap-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
}

.ww-disclaimer {
  margin-top: var(--space-16);
  max-width: 62ch;
}

@media (max-width: 1040px) {
  .ww-journey {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-8) var(--space-6);
  }

  .ww-roadmap {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .ww-journey,
  .ww-roadmap {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
