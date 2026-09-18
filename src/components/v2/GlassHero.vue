<template>
  <section class="hero chapter" data-chapter="dark">
    <div class="hero-surface" aria-hidden="true">
      <!-- The LQIP paints the hero immediately; WebGL takes over when ready,
           so the shader never sits on the LCP path. -->
      <div class="hero-surface-fallback" :style="{ backgroundImage: `url(${lqip})` }" />
      <canvas v-if="useWebgl" ref="canvasRef" class="hero-surface-canvas" :class="{ live: ready }" />
      <div v-else class="hero-surface-image" :style="{ backgroundImage: `url(${backdrop})` }" />
      <div class="hero-surface-scrim" />
    </div>

    <div class="container-wide hero-inner">
      <div class="hero-copy">
        <span class="t-overline">{{ t('v2.hero.eyebrow') }}</span>
        <h1 class="t-display">{{ t('v2.hero.title') }}</h1>
        <p class="t-lede hero-lede">{{ t('v2.hero.lede') }}</p>

        <div class="hero-actions">
          <RouterLink to="/waterwayz" class="btn-signal">
            {{ t('v2.hero.primary') }}
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </RouterLink>
          <RouterLink to="/marinas" class="btn-quiet">{{ t('v2.hero.secondary') }}</RouterLink>
        </div>

        <dl class="hero-facts">
          <div v-for="fact in facts" :key="fact.key" class="hero-fact">
            <dt class="t-caption">{{ t(`v2.hero.fact.${fact.key}.label`) }}</dt>
            <dd class="t-telemetry">{{ fact.value }}</dd>
          </div>
        </dl>
      </div>

      <div class="hero-shot">
        <GlassShot
          id="waterwayz-route"
          :caption="t('v2.hero.shotCaption')"
          sizes="(min-width: 1180px) 620px, 92vw"
          priority
          bleed
        />
      </div>
    </div>

    <p class="container-wide hero-disclaimer t-caption">{{ t('v2.disclaimer.charts') }}</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import GlassShot from './GlassShot.vue'
import { useGlassSurface, detectGlassTier } from '@/composables/useGlassSurface'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const base = import.meta.env.BASE_URL
const backdrop = `${base}assets/hero-backdrop.webp`
const lqip = `${base}assets/hero-backdrop-lqip.webp`

const canvasRef = ref<HTMLCanvasElement | null>(null)
const useWebgl = ['webgl2', 'webgl1'].includes(detectGlassTier())

const { ready } = useGlassSurface(canvasRef, {
  backdrop,
  tint: [0.16, 0.31, 0.55],
  tintAmount: 0.12,
  ior: 1.24,
  dispersion: 0.006,
  rippleAmp: 0.0055,
})

const facts = [
  { key: 'marinas', value: '27,000+' },
  { key: 'vessels', value: '340+' },
  { key: 'link', value: 'LoRaWAN' },
] as const
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-top: clamp(7rem, 5rem + 8vw, 11rem);
  padding-bottom: var(--space-16);
}

.hero-surface {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-surface-fallback,
.hero-surface-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}

.hero-surface-fallback {
  filter: blur(24px);
  transform: scale(1.1);
}

.hero-surface-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 900ms var(--ease-out);
}

.hero-surface-canvas.live {
  opacity: 1;
}

/* The scrim is what makes text on the refractive surface legible. */
.hero-surface-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      100deg,
      rgba(5, 7, 13, 0.94) 0%,
      rgba(8, 12, 24, 0.88) 30%,
      rgba(12, 26, 44, 0.44) 56%,
      rgba(12, 26, 44, 0.1) 78%,
      rgba(12, 26, 44, 0.02) 100%
    ),
    linear-gradient(180deg, rgba(5, 7, 13, 0.52) 0%, transparent 22%, transparent 74%, rgba(5, 7, 13, 0.46) 100%);
}

.hero-inner {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
  gap: clamp(2rem, 1rem + 4vw, 4.5rem);
  align-items: center;
}

.hero-copy .t-display {
  margin-top: var(--space-4);
  max-width: 14ch;
}

.hero-lede {
  margin-top: var(--space-6);
  max-width: 46ch;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-8);
}

.hero-facts {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-8);
  margin: var(--space-12) 0 0;
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

.hero-fact {
  display: flex;
  flex-direction: column-reverse;
  gap: 0.25rem;
}

.hero-fact dd {
  margin: 0;
  color: var(--text-primary);
}

.hero-disclaimer {
  position: relative;
  z-index: 1;
  margin-top: var(--space-12);
  opacity: 0.7;
}

@media (max-width: 1080px) {
  .hero-inner {
    grid-template-columns: minmax(0, 1fr);
  }

  .hero-copy .t-display {
    max-width: 18ch;
  }
}

@media (max-width: 720px) {
  .hero-facts {
    gap: var(--space-6);
  }
}
</style>
