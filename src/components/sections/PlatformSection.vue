<template>
  <section class="platform-section" id="platform">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('platform.label') }}</div>
        <h2>{{ t('platform.title') }}</h2>
        <p class="section-description">
          {{ t('platform.description') }}
        </p>
      </div>

      <div class="platform-diagram">
        <div class="platform-layer">
          <div class="layer-header">
            <div class="layer-number">01</div>
            <h3>{{ t('platform.layer1.title') }}</h3>
          </div>
          <p class="layer-desc">{{ t('platform.layer1.desc') }}</p>
          <div class="layer-content">
            <div class="layer-items">
              <span v-for="n in 3" :key="n" class="layer-tag">
                <ModelLinkedText :text="t(`platform.layer1.tag${n}`)" />
              </span>
            </div>
          </div>
        </div>

        <div class="platform-arrow">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>

        <div class="platform-layer">
          <div class="layer-header">
            <div class="layer-number">02</div>
            <h3>{{ t('platform.layer2.title') }}</h3>
          </div>
          <p class="layer-desc">{{ t('platform.layer2.desc') }}</p>
          <div class="layer-content">
            <div class="layer-items">
              <span v-for="n in 3" :key="n" class="layer-tag">
                <ModelLinkedText :text="t(`platform.layer2.tag${n}`)" />
              </span>
            </div>
          </div>
        </div>

        <div class="platform-arrow">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19M12 19L5 12M12 19L19 12" stroke="currentColor" stroke-width="2"/>
          </svg>
        </div>

        <div class="platform-layer highlight">
          <div class="layer-header">
            <div class="layer-number">03</div>
            <h3>{{ t('platform.layer3.title') }}</h3>
          </div>
          <p class="layer-desc">{{ t('platform.layer3.desc') }}</p>
          <div class="layer-content">
            <div class="layer-items">
              <span v-for="n in 4" :key="n" class="layer-tag">
                <ModelLinkedText :text="t(`platform.layer3.tag${n}`)" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import ModelLinkedText from '@/components/ModelLinkedText.vue'

const { t } = useI18n()
</script>

<style scoped>
.layer-desc {
  color: var(--text-secondary);
  line-height: 1.65;
  margin-bottom: 1.25rem;
  font-size: 0.95rem;
  text-align: center;
  max-width: 36rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
