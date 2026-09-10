<template>
  <main class="about-page">
    <section class="about-hero">
      <div class="container">
        <div class="about-hero-grid">
          <div>
            <div class="section-label">{{ t('about.label') }}</div>
            <h1>{{ t('about.title') }}</h1>
            <p class="about-lead">{{ t('about.lead') }}</p>
          </div>

          <div class="about-hero-panel">
            <div class="about-panel-card">
              <span class="panel-kicker">Positioning</span>
              <h2>Operational intelligence for marine risk</h2>
              <p>
                The platform is designed to make vessel issues visible early, route the signal to the right people,
                and turn marine monitoring into an operational system rather than a disconnected set of alarms.
              </p>
            </div>
            <div class="about-panel-metrics">
              <div class="metric-card">
                <strong>3</strong>
                <span>{{ t('about.stats.layers') }}</span>
              </div>
              <div class="metric-card">
                <strong>10+</strong>
                <span>{{ t('about.stats.sensors') }}</span>
              </div>
              <div class="metric-card">
                <strong>24/7</strong>
                <span>{{ t('about.stats.monitoring') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="about-mission">
      <div class="container">
        <div class="about-section-header">
          <div class="section-label accent">{{ t('about.mission.title') }}</div>
          <h2>Why InteliMaris exists</h2>
        </div>
        <div class="mission-grid">
          <p>{{ t('about.mission.p1') }}</p>
          <p>{{ t('about.mission.p2') }}</p>
        </div>
      </div>
    </section>

    <section class="about-ecosystem">
      <div class="container">
        <div class="about-section-header">
          <div class="section-label">{{ t('about.ecosystem.title') }}</div>
          <h2>{{ t('about.ecosystem.title') }}</h2>
          <p class="ecosystem-intro">{{ t('about.ecosystem.intro') }}</p>
        </div>
        <div class="ecosystem-grid">
          <article class="ecosystem-card">
            <span class="ecosystem-index">01</span>
            <h3>InteliMarine</h3>
            <p>{{ t('about.ecosystem.marine') }}</p>
          </article>
          <article class="ecosystem-card">
            <span class="ecosystem-index">02</span>
            <h3>InteliMaris</h3>
            <p>{{ t('about.ecosystem.maris') }}</p>
          </article>
          <article class="ecosystem-card">
            <span class="ecosystem-index">03</span>
            <h3>InteliMarina</h3>
            <p>{{ t('about.ecosystem.marina') }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-values">
      <div class="container">
        <div class="about-section-header">
          <div class="section-label">{{ t('about.values.title') }}</div>
          <h2>{{ t('about.values.title') }}</h2>
        </div>
        <div class="values-grid">
          <article class="value-card">
            <h3>{{ t('about.values.safety.title') }}</h3>
            <p>{{ t('about.values.safety.desc') }}</p>
          </article>
          <article class="value-card">
            <h3>{{ t('about.values.innovation.title') }}</h3>
            <p>{{ t('about.values.innovation.desc') }}</p>
          </article>
          <article class="value-card">
            <h3>{{ t('about.values.community.title') }}</h3>
            <p>{{ t('about.values.community.desc') }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-team">
      <div class="container">
        <div class="about-section-header">
          <div class="section-label">{{ t('about.team.title') }}</div>
          <h2>{{ t('about.team.title') }}</h2>
          <p class="team-intro">{{ t('about.team.intro') }}</p>
        </div>
        <div class="team-grid">
          <article v-for="member in team" :key="member.slug" class="team-card">
            <img
              v-if="member.photo"
              :src="member.photo"
              :alt="member.name"
              class="team-photo"
              width="480"
              height="480"
              loading="lazy"
            />
            <div v-else class="team-photo team-photo--initials" aria-hidden="true">{{ member.initials }}</div>
            <h3>{{ member.name }}</h3>
            <span class="team-role">{{ t(member.roleKey) }}</span>
            <p>{{ t(member.bioKey) }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-contact">
      <div class="container">
        <div class="contact-panel">
          <div>
            <div class="section-label accent">{{ t('about.contact.title') }}</div>
            <h2>{{ t('about.contact.title') }}</h2>
            <p>{{ t('about.contact.desc') }}</p>
          </div>
          <div class="contact-links">
            <MailLink class="contact-link" />
            <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer" class="contact-link">intelimaris.com</a>
            <RouterLink to="/" class="back-link">{{ t('about.backHome') }}</RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import MailLink from '@/components/MailLink.vue'

const { t } = useI18n()

const teamBase = `${import.meta.env.BASE_URL}assets/team/`

/* Photos live in public/assets/team/<slug>.jpg; a member without one renders initials. */
const team = [
  { slug: 'ron-bishop', name: 'Ron Bishop', initials: 'RB', photo: null, roleKey: 'about.team.ron.role', bioKey: 'about.team.ron.bio' },
  { slug: 'tristan-mullane', name: 'Tristan Mullane', initials: 'TM', photo: null, roleKey: 'about.team.tristan.role', bioKey: 'about.team.tristan.bio' },
  { slug: 'sam-skolnik', name: 'Sam Skolnik', initials: 'SS', photo: null, roleKey: 'about.team.sam.role', bioKey: 'about.team.sam.bio' },
  { slug: 'yevgen-trotsan', name: 'Yevgen Trotsan', initials: 'YT', photo: `${teamBase}yevgen-trotsan.jpg`, roleKey: 'about.team.yevgen.role', bioKey: 'about.team.yevgen.bio' },
] as const
</script>

<style scoped>
.about-page {
  padding-top: 5rem;
  min-height: 60vh;
}

.about-hero,
.about-mission,
.about-ecosystem,
.about-values,
.about-team,
.about-contact {
  padding: 5rem 0;
  border-bottom: 1px solid var(--border-subtle);
}

.about-hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.9fr);
  gap: 2rem;
  align-items: start;
}

.about-lead,
.ecosystem-intro,
.mission-grid p,
.value-card p,
.contact-panel p {
  color: var(--text-secondary);
  line-height: 1.7;
}

.about-hero-panel,
.contact-panel {
  display: grid;
  gap: 1rem;
}

.about-panel-card,
.contact-panel,
.value-card,
.ecosystem-card {
  padding: 1.6rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.panel-kicker,
.ecosystem-index {
  display: inline-block;
  margin-bottom: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .panel-kicker,
[data-theme="dark"] .ecosystem-index {
  color: #6FA0CC;
}

.about-panel-card h2 {
  margin-bottom: 0.75rem;
  font-size: clamp(1.4rem, 2vw, 2rem);
}

.about-panel-metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.metric-card {
  padding: 1.1rem;
  border-radius: 1rem;
  border: 1px solid var(--border-subtle);
  background: var(--surface-soft);
}

.metric-card strong {
  display: block;
  margin-bottom: 0.25rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .metric-card strong {
  color: #6FA0CC;
}

.metric-card span {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.about-section-header {
  margin-bottom: 2rem;
}

.mission-grid,
.values-grid,
.ecosystem-grid {
  display: grid;
  gap: 1rem;
}

.mission-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.values-grid,
.ecosystem-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.value-card h3,
.ecosystem-card h3 {
  margin-bottom: 0.75rem;
}

.contact-panel {
  grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.8fr);
  align-items: center;
}

.contact-links {
  display: grid;
  gap: 0.85rem;
}

.contact-link,
.back-link {
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 600;
}

.contact-link:hover,
.back-link:hover {
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .contact-link:hover,
[data-theme="dark"] .back-link:hover {
  color: #6FA0CC;
}

/* Team */
.team-intro {
  max-width: 60ch;
  color: var(--text-secondary);
  line-height: 1.7;
}

.team-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 1rem;
}

.team-card {
  padding: 1.6rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.team-photo {
  display: block;
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  margin-bottom: 1.1rem;
  border-radius: 1rem;
  background: var(--surface-soft);
}

.team-photo--initials {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed var(--border-medium);
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: clamp(2rem, 4vw, 3rem);
  letter-spacing: 0.04em;
  color: var(--brand-marine-blue);
}

.team-card h3 {
  margin-bottom: 0.25rem;
}

.team-role {
  display: inline-block;
  margin-bottom: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--brand-marine-blue);
}

[data-theme="dark"] .team-photo--initials,
[data-theme="dark"] .team-role {
  color: #6FA0CC;
}

.team-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.95rem;
}

@media (max-width: 920px) {
  .about-hero-grid,
  .mission-grid,
  .values-grid,
  .ecosystem-grid,
  .contact-panel {
    grid-template-columns: 1fr;
  }

  .team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .about-panel-metrics {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
}
</style>
