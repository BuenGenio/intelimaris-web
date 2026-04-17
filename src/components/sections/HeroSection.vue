<template>
  <section class="hero-section">
    <div class="hero-background" role="img" aria-label="Animated ocean visualization with vessels, particles, and wave connections">
      <canvas ref="oceanCanvas" id="oceanCanvas" aria-hidden="true"></canvas>
      <div class="grid-overlay"></div>
    </div>

    <div class="container-wide hero-layout">
      <div class="hero-copy">
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
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
          <button class="btn-secondary" @click="scrollToSection('platform')">
            {{ t('hero.cta.secondary') }}
          </button>
        </div>

        <div class="hero-proof-strip">
          <span class="proof-pill">Marine-grade hardware</span>
          <span class="proof-pill">AI-ranked alerts</span>
          <span class="proof-pill">Owner + marina workflows</span>
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

      <aside class="hero-panel fade-in" aria-label="Platform preview">
        <div class="hero-panel-shell">
          <div class="hero-panel-topbar">
            <span class="topbar-kicker">Command Center</span>
            <span class="topbar-status">Live system state</span>
          </div>

          <div class="hero-panel-main">
            <div class="hero-panel-card wide">
              <div class="panel-label">Critical path</div>
              <div class="panel-title">Detect, classify, escalate, automate</div>
              <div class="panel-flow">
                <span>Sensor</span>
                <span>Gateway</span>
                <span>AI Stack</span>
                <span>Response</span>
              </div>
            </div>

            <div class="hero-panel-grid">
              <div class="hero-panel-card">
                <div class="panel-label">Bilge risk</div>
                <div class="panel-figure ok">Normal</div>
                <p>Trend-aware thresholds separate washdowns from true flooding.</p>
              </div>

              <div class="hero-panel-card">
                <div class="panel-label">Marina escalation</div>
                <div class="panel-figure warn">Armed</div>
                <p>Owners and dock staff can receive the same event with context.</p>
              </div>
            </div>

            <div class="hero-panel-log">
              <div class="log-row">
                <span>14:28 UTC</span>
                <strong>Battery bank healthy</strong>
              </div>
              <div class="log-row">
                <span>14:15 UTC</span>
                <strong>Bilge cycle resolved automatically</strong>
              </div>
              <div class="log-row attention">
                <span>13:52 UTC</span>
                <strong>Temperature anomaly isolated and classified</strong>
              </div>
            </div>
          </div>
        </div>
      </aside>
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
