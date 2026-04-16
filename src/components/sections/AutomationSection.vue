<template>
  <section class="automation-section" id="automation">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('automation.label') }}</div>
        <h2>{{ t('automation.title') }}</h2>
        <p class="section-description">
          {{ t('automation.description') }}
        </p>
      </div>
      
      <div class="automation-example">
        <div class="automation-card">
          <div class="automation-step trigger">
            <div class="step-icon">⚠️</div>
            <div class="step-content">
              <h4>{{ t('automation.trigger.title') }}</h4>
              <p>
                <ModelLinkedText :text="t('automation.trigger.desc')" />
              </p>
            </div>
          </div>
          
          <div class="automation-arrow">→</div>
          
          <div class="automation-step action">
            <div class="step-icon">📱</div>
            <div class="step-content">
              <h4>{{ t('automation.alert.title') }}</h4>
              <p>
                <ModelLinkedText :text="t('automation.alert.desc')" />
              </p>
            </div>
          </div>
          
          <div class="automation-arrow">→</div>
          
          <div class="automation-step action">
            <div class="step-icon">🔧</div>
            <div class="step-content">
              <h4>{{ t('automation.response.title') }}</h4>
              <p>
                <ModelLinkedText :text="t('automation.response.desc')" />
              </p>
            </div>
          </div>
          
          <div class="automation-arrow">→</div>
          
          <div class="automation-step result">
            <div class="step-icon">📋</div>
            <div class="step-content">
              <h4>{{ t('automation.log.title') }}</h4>
              <p>
                <ModelLinkedText :text="t('automation.log.desc')" />
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="automation-features">
        <div class="automation-feature">
          <h4>{{ t('automation.feature1.title') }}</h4>
          <p>
            <ModelLinkedText :text="t('automation.feature1.desc')" />
          </p>
        </div>
        <div class="automation-feature">
          <h4>{{ t('automation.feature2.title') }}</h4>
          <p>
            <ModelLinkedText :text="t('automation.feature2.desc')" />
          </p>
        </div>
        <div class="automation-feature">
          <h4>{{ t('automation.feature3.title') }}</h4>
          <p>
            <ModelLinkedText :text="t('automation.feature3.desc')" />
          </p>
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
