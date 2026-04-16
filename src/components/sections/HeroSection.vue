<template>
  <section class="hero-section">
    <div class="hero-background">
      <canvas ref="oceanCanvas" id="oceanCanvas"></canvas>
      <div class="grid-overlay"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-badge">
        <span class="pulse-dot"></span>
        <span>{{ t('hero.badge') }}</span>
      </div>
      
      <h1 class="hero-title">
        {{ t('hero.title') }}
      </h1>
      
      <p class="hero-subtitle">
        {{ t('hero.subtitle') }}
      </p>
      
      <div class="hero-actions">
        <button class="btn-primary" @click="scrollToSection('contact')">
          <span>{{ t('hero.cta.primary') }}</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        <button class="btn-secondary" @click="scrollToSection('ecosystem')">
          {{ t('hero.cta.secondary') }}
        </button>
      </div>
      
      <div class="hero-stats">
        <div class="stat-item">
          <div class="stat-value">3</div>
          <div class="stat-label">{{ t('hero.stat.layers') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">24/7</div>
          <div class="stat-label">{{ t('hero.stat.visibility') }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">∞</div>
          <div class="stat-label">{{ t('hero.stat.global') }}</div>
        </div>
      </div>
    </div>
    
    <div class="scroll-indicator">
      <div class="scroll-line"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'
import { useOceanCanvas } from '@/composables/useOceanCanvas'

const { t } = useI18n()
const oceanCanvas = ref<HTMLCanvasElement | null>(null)

useOceanCanvas(oceanCanvas)

const scrollToSection = (id: string) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
