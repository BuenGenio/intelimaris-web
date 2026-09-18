<template>
  <section id="marina" class="chapter pms" data-chapter="dark">
    <div class="container-wide">
      <div class="section-head">
        <span class="t-overline">{{ t('v2.pms.overline') }}</span>
        <h2 class="t-display">{{ t('v2.pms.title') }}</h2>
        <p class="t-lede">{{ t('v2.pms.lede') }}</p>
      </div>

      <div class="pms-lead">
        <GlassShot
          id="pms-berth-layout"
          :caption="t('v2.pms.shot.layout')"
          chrome="console.intelimaris.com"
          sizes="(min-width: 1100px) 1180px, 94vw"
          bleed
        />
      </div>

      <div class="pms-grid">
        <ul class="pms-features">
          <li v-for="feature in features" :key="feature" class="pms-feature">
            <h3>{{ t(`v2.pms.feature.${feature}.title`) }}</h3>
            <p>{{ t(`v2.pms.feature.${feature}.body`) }}</p>
          </li>
        </ul>

        <div class="pms-side">
          <GlassShot
            id="pms-dashboard"
            :caption="t('v2.pms.shot.dashboard')"
            chrome="console.intelimaris.com"
            sizes="(min-width: 1100px) 480px, 94vw"
          />
          <GlassShot
            id="pms-dock-editor"
            :caption="t('v2.pms.shot.dock')"
            chrome="console.intelimaris.com"
            sizes="(min-width: 1100px) 480px, 94vw"
          />
        </div>
      </div>

      <!-- Honesty is a copy rule: the unfinished rooms are listed, not hidden. -->
      <div class="pms-roadmap glass">
        <div class="pms-roadmap-head">
          <h3>{{ t('v2.pms.roadmap.title') }}</h3>
          <p class="t-caption">{{ t('v2.pms.roadmap.lede') }}</p>
        </div>
        <ul class="pms-roadmap-list">
          <li v-for="room in roadmap" :key="room.key" class="pms-roadmap-item">
            <span class="badge-status" :data-state="room.state">{{ t(`availability.${room.state}`) }}</span>
            <span class="pms-roadmap-name">{{ t(`v2.pms.roadmap.${room.key}`) }}</span>
          </li>
        </ul>
        <RouterLink to="/marinas" class="btn-signal pms-cta">{{ t('v2.pms.cta') }}</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import GlassShot from './GlassShot.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const features = ['free', 'assign', 'brief', 'residents'] as const

/* Mirrors the console's own built / partial / missing map. */
const roadmap = [
  { key: 'dashboard', state: 'live' },
  { key: 'bookings', state: 'live' },
  { key: 'berths', state: 'live' },
  { key: 'staff', state: 'live' },
  { key: 'settings', state: 'live' },
  { key: 'chat', state: 'live' },
  { key: 'calendar', state: 'building' },
  { key: 'finance', state: 'building' },
  { key: 'crm', state: 'building' },
  { key: 'reports', state: 'planned' },
] as const
</script>

<style scoped>
.pms-lead {
  margin-top: var(--space-12);
}

.pms-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.86fr);
  gap: clamp(2rem, 1rem + 4vw, 4rem);
  margin-top: var(--space-16);
}

.pms-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  align-content: start;
}

.pms-feature h3 {
  margin-bottom: var(--space-2);
}

.pms-feature p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
  max-width: 48ch;
}

.pms-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.pms-roadmap {
  margin-top: var(--space-16);
  padding: clamp(1.5rem, 1rem + 2vw, 2.5rem);
  display: grid;
  grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
  gap: clamp(1.5rem, 1rem + 2vw, 3rem);
  align-items: start;
}

.pms-roadmap-head h3 {
  margin-bottom: var(--space-3);
}

.pms-roadmap-head .t-caption {
  margin: 0;
  max-width: 40ch;
}

.pms-roadmap-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-3) var(--space-6);
}

.pms-roadmap-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.pms-roadmap-name {
  font-size: var(--type-body-sm);
  color: var(--text-secondary);
}

.pms-cta {
  grid-column: 1 / -1;
  justify-self: start;
}

@media (max-width: 1040px) {
  .pms-grid,
  .pms-roadmap {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 620px) {
  .pms-roadmap-list {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
