<template>
  <section class="sensors-section" id="sensors">
    <div class="container">
      <div class="section-header">
        <div class="section-label">{{ t('sensors.label') }}</div>
        <h2>{{ t('sensors.title') }}</h2>
        <p class="section-description">
          {{ t('sensors.description') }}
        </p>
        <p class="sensors-battery">
          <ModelLinkedText :text="t('sensors.batteryNote')" />
        </p>
        <p class="sensors-catalog">
          <RouterLink to="/products" class="sensors-catalog-link">{{ t('sensors.catalogLink') }}</RouterLink>{{ t('sensors.catalogHint') }}
        </p>
      </div>
      
      <div class="sensors-grid">
        <div class="sensor-category fade-in">
          <div class="sensor-icon water">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('sensors.water.title') }}</h3>
          <ul class="sensor-list">
            <li><ModelLinkedText :text="t('sensors.water.item1')" /></li>
            <li><ModelLinkedText :text="t('sensors.water.item2')" /></li>
            <li><ModelLinkedText :text="t('sensors.water.item3')" /></li>
            <li><ModelLinkedText :text="t('sensors.water.item4')" /></li>
          </ul>
        </div>
        
        <div class="sensor-category fade-in">
          <div class="sensor-icon fire">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2c-1.5 4-4 6-4 10a4 4 0 0 0 8 0c0-4-2.5-6-4-10z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('sensors.fire.title') }}</h3>
          <ul class="sensor-list">
            <li><ModelLinkedText :text="t('sensors.fire.item1')" /></li>
            <li><ModelLinkedText :text="t('sensors.fire.item2')" /></li>
            <li><ModelLinkedText :text="t('sensors.fire.item3')" /></li>
            <li><ModelLinkedText :text="t('sensors.fire.item4')" /></li>
          </ul>
        </div>
        
        <div class="sensor-category fade-in">
          <div class="sensor-icon environment">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
              <path d="M12 1v2M12 21v2M1 12h2M21 12h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('sensors.environment.title') }}</h3>
          <ul class="sensor-list">
            <li><ModelLinkedText :text="t('sensors.environment.item1')" /></li>
            <li><ModelLinkedText :text="t('sensors.environment.item2')" /></li>
            <li><ModelLinkedText :text="t('sensors.environment.item3')" /></li>
            <li><ModelLinkedText :text="t('sensors.environment.item4')" /></li>
          </ul>
        </div>
        
        <div class="sensor-category fade-in">
          <div class="sensor-icon electrical">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="6" y="2" width="12" height="20" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M10 6h4M10 10h4M10 14h4" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('sensors.electrical.title') }}</h3>
          <ul class="sensor-list">
            <li><ModelLinkedText :text="t('sensors.electrical.item1')" /></li>
            <li><ModelLinkedText :text="t('sensors.electrical.item2')" /></li>
            <li><ModelLinkedText :text="t('sensors.electrical.item3')" /></li>
            <li><ModelLinkedText :text="t('sensors.electrical.item4')" /></li>
          </ul>
        </div>
        
        <div class="sensor-category fade-in">
          <div class="sensor-icon location">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="2"/>
              <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('sensors.motion.title') }}</h3>
          <ul class="sensor-list">
            <li><ModelLinkedText :text="t('sensors.motion.item1')" /></li>
            <li><ModelLinkedText :text="t('sensors.motion.item2')" /></li>
            <li><ModelLinkedText :text="t('sensors.motion.item3')" /></li>
            <li><ModelLinkedText :text="t('sensors.motion.item4')" /></li>
          </ul>
        </div>
      </div>
      
      <div class="sensor-flow">
        <div class="flow-step">
          <div class="flow-icon">📡</div>
          <div class="flow-text">{{ t('sensors.flow.step1') }}</div>
        </div>
        <div class="flow-connector"></div>
        <div class="flow-step">
          <div class="flow-icon">☁️</div>
          <div class="flow-text">{{ t('sensors.flow.step2') }}</div>
        </div>
        <div class="flow-connector"></div>
        <div class="flow-step">
          <div class="flow-icon">📊</div>
          <div class="flow-text">{{ t('sensors.flow.step3') }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import ModelLinkedText from '@/components/ModelLinkedText.vue'

const { t } = useI18n()
</script>

<style scoped>
.sensors-battery {
  margin-top: 1rem;
  max-width: 42rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.6;
}
.sensors-catalog {
  margin-top: 1.25rem;
  font-size: 1rem;
  color: var(--text-secondary);
}

.sensors-catalog-link {
  color: var(--cyan-bright);
  font-weight: 600;
  text-decoration: none;
}

.sensors-catalog-link:hover {
  text-decoration: underline;
}
</style>
