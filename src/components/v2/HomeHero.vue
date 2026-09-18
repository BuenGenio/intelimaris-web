<template>
  <section class="hero chapter" data-chapter="slate">
    <!-- The place at the hour a lookout works, darkened towards slate until
         white type passes; the wordmark never sits on the photograph. -->
    <div class="hero-photo" aria-hidden="true">
      <img
        class="hero-photo-img"
        :src="`${base}assets/hero-dusk-1280.webp`"
        :srcset="`${base}assets/hero-dusk-768.webp 768w, ${base}assets/hero-dusk-1280.webp 1280w, ${base}assets/hero-dusk-1600.webp 1600w`"
        sizes="100vw"
        alt=""
        width="1600"
        height="757"
        fetchpriority="high"
        decoding="async"
        :style="{ backgroundImage: `url(${base}assets/hero-dusk-lqip.webp)` }"
      />
      <div class="hero-photo-scrim" />
    </div>

    <div class="container-wide hero-inner">
      <span class="t-overline hero-eyebrow">{{ t('v2.hero.eyebrow') }}</span>
      <h1 class="t-display hero-title">{{ t('v2.hero.title') }}</h1>
      <p class="t-lede hero-lede">{{ t('v2.hero.lede') }}</p>
      <div class="hero-actions">
        <RouterLink to="/waterwayz" class="link-arrow">{{ t('v2.hero.primary') }}</RouterLink>
        <RouterLink to="/marinas" class="link-arrow">{{ t('v2.hero.secondary') }}</RouterLink>
      </div>
    </div>

    <!-- The band: the mark on slate, the line at its foot in the domain colour. -->
    <div class="hero-band">
      <div class="container-wide hero-band-inner">
        <div class="hero-shot">
          <ShotFrame
            id="waterwayz-route"
            :caption="t('v2.hero.shotCaption')"
            sizes="(min-width: 1180px) 1180px, 94vw"
            priority
            bleed
          />
        </div>

        <dl class="hero-facts">
          <div v-for="fact in facts" :key="fact.key" class="hero-fact">
            <dd class="t-telemetry">{{ fact.value }}</dd>
            <dt class="t-caption">{{ t(`v2.hero.fact.${fact.key}.label`) }}</dt>
          </div>
        </dl>

        <p class="hero-disclaimer t-caption">{{ t('v2.disclaimer.charts') }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import ShotFrame from './ShotFrame.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const base = import.meta.env.BASE_URL

const facts = [
  { key: 'marinas', value: '27,000+' },
  { key: 'vessels', value: '340+' },
  { key: 'link', value: 'LoRaWAN' },
] as const
</script>

<style scoped>
.hero {
  padding: 0;
  overflow: hidden;
}

.hero-photo {
  position: absolute;
  inset: 0 0 auto 0;
  height: min(78vh, 720px);
  min-height: 520px;
  z-index: 0;
}

.hero-photo-img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 60%;
  background-size: cover;
  background-position: center;
}

.hero-photo-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(36, 44, 56, 0.55) 0%, rgba(36, 44, 56, 0.25) 40%, rgba(36, 44, 56, 0.72) 100%),
    linear-gradient(90deg, rgba(36, 44, 56, 0.6) 0%, rgba(36, 44, 56, 0.1) 60%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  min-height: min(78vh, 720px);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-top: clamp(8rem, 6rem + 6vw, 11rem);
  padding-bottom: var(--space-12);
}

.hero-eyebrow {
  color: rgba(255, 255, 255, 0.72);
}

.hero-title {
  margin-top: var(--space-4);
  max-width: 22ch;
  color: #ffffff;
}

.hero-lede {
  margin-top: var(--space-6);
  max-width: 52ch;
  color: rgba(255, 255, 255, 0.84);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin-top: var(--space-8);
}

.hero-actions .link-arrow {
  color: #ffffff;
}

.hero-band {
  position: relative;
  z-index: 1;
  background: var(--slate);
  border-top: 2px solid var(--maris-night);
}

.hero-band-inner {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}

.hero-facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-12);
  margin: var(--space-12) 0 0;
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

.hero-fact {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.hero-fact dd {
  margin: 0;
  color: #ffffff;
}

.hero-disclaimer {
  margin: var(--space-8) 0 0;
  max-width: 64ch;
}

@media (max-width: 720px) {
  .hero-photo {
    min-height: 460px;
  }

  .hero-inner {
    min-height: 460px;
  }

  .hero-facts {
    gap: var(--space-6);
  }
}
</style>
