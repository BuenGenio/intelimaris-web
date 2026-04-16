<template>
  <section class="architecture-section" id="architecture">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('architecture.label') }}</div>
        <h2>{{ t('architecture.title') }}</h2>
      </div>
      
      <div class="architecture-grid">
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.eventdriven.title') }}</h3>
          <p>{{ t('architecture.eventdriven.desc') }}</p>
          <div class="tech-tags">
            <span>NATS</span>
            <span>Event Sourcing</span>
            <span>CQRS</span>
          </div>
        </div>
        
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.ingestion.title') }}</h3>
          <p>{{ t('architecture.ingestion.desc') }}</p>
          <div class="tech-tags">
            <span>Node.js</span>
            <span>IMLRN ingest</span>
            <span>Edge compute</span>
          </div>
        </div>
        
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2"/>
              <path d="M3 9h18M9 3v18" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.observability.title') }}</h3>
          <p>{{ t('architecture.observability.desc') }}</p>
          <div class="tech-tags">
            <span>Prometheus</span>
            <span>Grafana</span>
            <span>Tempo</span>
          </div>
        </div>
        
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.timeseries.title') }}</h3>
          <p>{{ t('architecture.timeseries.desc') }}</p>
          <div class="tech-tags">
            <span>PostgreSQL</span>
            <span>TimescaleDB</span>
            <span>Compression</span>
          </div>
        </div>
        
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.microservices.title') }}</h3>
          <p>{{ t('architecture.microservices.desc') }}</p>
          <div class="tech-tags">
            <span>Microservices</span>
            <span>Docker</span>
            <span>Kubernetes-ready</span>
          </div>
        </div>
        
        <div class="arch-card fade-in">
          <div class="arch-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM20 8v6M23 11h-6" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <h3>{{ t('architecture.multitenant.title') }}</h3>
          <p>{{ t('architecture.multitenant.desc') }}</p>
          <div class="tech-tags">
            <span>Row-level Security</span>
            <span>JWT Auth</span>
            <span>RBAC</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>
