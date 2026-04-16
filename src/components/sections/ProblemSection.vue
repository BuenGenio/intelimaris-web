<template>
  <section class="ecosystem-section" id="ecosystem">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('eco.label') }}</div>
        <h2>{{ t('eco.title') }}</h2>
        <p class="section-description">{{ t('eco.subtitle') }}</p>
      </div>

      <div class="eco-brands">
        <article class="eco-card fade-in">
          <h3 class="eco-name">{{ t('eco.marine.name') }}</h3>
          <p class="eco-desc">{{ t('eco.marine.desc') }}</p>
        </article>
        <article class="eco-card fade-in">
          <h3 class="eco-name">{{ t('eco.maris.name') }}</h3>
          <p class="eco-desc">{{ t('eco.maris.desc') }}</p>
        </article>
        <article class="eco-card fade-in">
          <h3 class="eco-name">{{ t('eco.marina.name') }}</h3>
          <p class="eco-desc">{{ t('eco.marina.desc') }}</p>
        </article>
      </div>

      <p class="eco-closing">{{ t('eco.closing') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
