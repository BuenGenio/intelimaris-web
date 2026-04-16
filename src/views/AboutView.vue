<template>
  <main class="about-page">
    <section class="about-hero">
      <div class="container">
        <div class="section-label">{{ t('about.label') }}</div>
        <h1>{{ t('about.title') }}</h1>
        <p class="about-lead">{{ t('about.lead') }}</p>
      </div>
    </section>

    <section class="about-mission">
      <div class="container">
        <div class="mission-grid">
          <div class="mission-text">
            <h2>{{ t('about.mission.title') }}</h2>
            <p>{{ t('about.mission.p1') }}</p>
            <p>{{ t('about.mission.p2') }}</p>
          </div>
          <div class="mission-stats">
            <div class="stat-card">
              <span class="stat-number">3</span>
              <span class="stat-label">{{ t('about.stats.layers') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">10+</span>
              <span class="stat-label">{{ t('about.stats.sensors') }}</span>
            </div>
            <div class="stat-card">
              <span class="stat-number">24/7</span>
              <span class="stat-label">{{ t('about.stats.monitoring') }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-ecosystem">
      <div class="container">
        <h2>{{ t('about.ecosystem.title') }}</h2>
        <p class="ecosystem-intro">{{ t('about.ecosystem.intro') }}</p>
        <div class="ecosystem-grid">
          <div class="ecosystem-card">
            <h3>InteliMarine</h3>
            <p>{{ t('about.ecosystem.marine') }}</p>
          </div>
          <div class="ecosystem-card">
            <h3>InteliMaris</h3>
            <p>{{ t('about.ecosystem.maris') }}</p>
          </div>
          <div class="ecosystem-card">
            <h3>InteliMarina</h3>
            <p>{{ t('about.ecosystem.marina') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-values">
      <div class="container">
        <h2>{{ t('about.values.title') }}</h2>
        <div class="values-grid">
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <h3>{{ t('about.values.safety.title') }}</h3>
            <p>{{ t('about.values.safety.desc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
            </div>
            <h3>{{ t('about.values.innovation.title') }}</h3>
            <p>{{ t('about.values.innovation.desc') }}</p>
          </div>
          <div class="value-card">
            <div class="value-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3>{{ t('about.values.community.title') }}</h3>
            <p>{{ t('about.values.community.desc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="about-contact">
      <div class="container">
        <h2>{{ t('about.contact.title') }}</h2>
        <p>{{ t('about.contact.desc') }}</p>
        <div class="contact-links">
          <a href="mailto:info@intelimarine.com" class="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
            info@intelimarine.com
          </a>
          <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer" class="contact-link">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            intelimaris.com
          </a>
        </div>
        <RouterLink to="/" class="back-link">{{ t('about.backHome') }}</RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.about-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.about-hero {
  padding: 6rem 0 3rem;
  border-bottom: 1px solid var(--border-subtle);
}

.about-hero h1 {
  margin-bottom: 1rem;
}

.about-lead {
  max-width: 42rem;
  color: var(--text-secondary);
  font-size: 1.125rem;
  line-height: 1.7;
}

.about-mission {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.mission-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .mission-grid {
    grid-template-columns: 1fr 1fr;
    align-items: start;
  }
}

.mission-text h2 {
  margin-bottom: 1.5rem;
}

.mission-text p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}

.mission-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.stat-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.stat-number {
  font-family: 'Outfit', sans-serif;
  font-size: 2rem;
  font-weight: 800;
  color: var(--cyan-bright);
}

.stat-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: center;
  margin-top: 0.25rem;
}

.about-ecosystem {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.about-ecosystem h2 {
  margin-bottom: 1rem;
}

.ecosystem-intro {
  color: var(--text-secondary);
  max-width: 48rem;
  margin-bottom: 2.5rem;
  line-height: 1.7;
}

.ecosystem-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .ecosystem-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ecosystem-card {
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.ecosystem-card h3 {
  color: var(--cyan-bright);
  margin-bottom: 0.75rem;
}

.ecosystem-card p {
  color: var(--text-secondary);
  line-height: 1.65;
}

.about-values {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.about-values h2 {
  margin-bottom: 2.5rem;
}

.values-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .values-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.value-card {
  padding: 2rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.value-icon {
  width: 2.5rem;
  height: 2.5rem;
  color: var(--cyan-bright);
  margin-bottom: 1rem;
}

.value-icon svg {
  width: 100%;
  height: 100%;
}

.value-card h3 {
  margin-bottom: 0.75rem;
}

.value-card p {
  color: var(--text-secondary);
  line-height: 1.65;
}

.about-contact {
  padding: 5rem 0 6rem;
}

.about-contact h2 {
  margin-bottom: 1rem;
}

.about-contact > .container > p {
  color: var(--text-secondary);
  max-width: 42rem;
  margin-bottom: 2rem;
  line-height: 1.7;
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--cyan-bright);
  text-decoration: none;
  font-weight: 500;
}

.contact-link svg {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.contact-link:hover {
  text-decoration: underline;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: var(--cyan-bright);
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
