<template>
  <main class="marinas-page">
    <PageHero
      :overline="t('v2.pms.overline')"
      :title="t('v2.pms.title')"
      :lede="t('v2.pms.lede')"
      shot="pms-berth-layout"
      :shot-caption="t('v2.pms.shot.layout')"
      chrome="console.intelimaris.com"
      tone="dark"
    >
      <template #actions>
        <RouterLink to="/contact" class="btn-signal">{{ t('v2.pms.cta') }}</RouterLink>
        <RouterLink to="/demo/marina" class="btn-quiet">{{ t('v2.marinas.demoCta') }}</RouterLink>
      </template>
    </PageHero>

    <section class="chapter" data-chapter="light">
      <div class="container-wide">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.marinas.howOverline') }}</span>
          <h2 class="t-display">{{ t('v2.marinas.howTitle') }}</h2>
        </div>

        <ol class="marinas-steps">
          <li v-for="(step, index) in steps" :key="step" class="marinas-step">
            <span class="marinas-step-index t-num">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ t(`v2.marinas.step.${step}.title`) }}</h3>
            <p>{{ t(`v2.marinas.step.${step}.body`) }}</p>
          </li>
        </ol>

        <div class="marinas-gallery">
          <GlassShot
            id="pms-dashboard"
            :caption="t('v2.pms.shot.dashboard')"
            chrome="console.intelimaris.com"
            sizes="(min-width: 1080px) 560px, 94vw"
          />
          <GlassShot
            id="pms-operations"
            :caption="t('v2.marinas.shot.operations')"
            chrome="console.intelimaris.com"
            sizes="(min-width: 1080px) 560px, 94vw"
          />
        </div>
      </div>
    </section>

    <MarinaPmsSection />

    <section class="chapter" data-chapter="light">
      <div class="container-wide marinas-hosts">
        <div class="section-head">
          <span class="t-overline">{{ t('v2.marinas.hostOverline') }}</span>
          <h2 class="t-display">{{ t('v2.marinas.hostTitle') }}</h2>
          <p class="t-lede">{{ t('v2.marinas.hostLede') }}</p>
          <RouterLink to="/contact" class="btn-quiet marinas-host-cta">{{ t('v2.marinas.hostCta') }}</RouterLink>
        </div>
        <GlassShot
          id="dock-host-dashboard"
          :caption="t('v2.marinas.shot.host')"
          chrome="console.intelimaris.com"
          sizes="(min-width: 1080px) 600px, 94vw"
        />
      </div>
    </section>

    <ClosingCtaSection />
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PageHero from '@/components/v2/PageHero.vue'
import GlassShot from '@/components/v2/GlassShot.vue'
import MarinaPmsSection from '@/components/v2/MarinaPmsSection.vue'
import ClosingCtaSection from '@/components/v2/ClosingCtaSection.vue'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'

const { t } = useI18n()
const steps = ['claim', 'draw', 'rates', 'run'] as const

useFadeIn('.marinas-page')
</script>

<style scoped>
.marinas-steps {
  list-style: none;
  margin: var(--space-16) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
}

.marinas-step {
  padding-top: var(--space-6);
  border-top: 2px solid var(--brand-wave);
}

.marinas-step-index {
  display: block;
  font-size: var(--type-caption);
  color: var(--brand-wave);
  margin-bottom: var(--space-3);
}

.marinas-step h3 {
  margin-bottom: var(--space-2);
}

.marinas-step p {
  margin: 0;
  color: var(--text-secondary);
  font-size: var(--type-body-sm);
  line-height: 1.6;
}

.marinas-gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-6);
  margin-top: var(--space-16);
}

.marinas-hosts {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
  gap: clamp(2rem, 1rem + 4vw, 4rem);
  align-items: center;
}

.marinas-host-cta {
  margin-top: var(--space-8);
}

@media (max-width: 1040px) {
  .marinas-steps {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-8) var(--space-6);
  }

  .marinas-gallery,
  .marinas-hosts {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 560px) {
  .marinas-steps {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
