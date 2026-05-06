<template>
  <main class="bilge-page">
    <section class="bilge-hero">
      <div class="container">
        <div class="section-label">{{ t('bilge.label') }}</div>
        <h1>{{ intelibilgeHero.title }}</h1>
        <p class="bilge-overview">
          <ModelLinkedText :text="intelibilgeHero.overview" />
        </p>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.howTitle') }}</h2>
        <h3 class="bilge-subhead">{{ t('bilge.componentsTitle') }}</h3>
        <div class="bilge-table-wrap">
          <table class="bilge-table">
            <thead>
              <tr>
                <th>{{ t('bilge.col.component') }}</th>
                <th>{{ t('bilge.col.function') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in intelibilgeHowComponents" :key="i">
                <td>
                  <ModelLinkedText :text="row.component" />
                </td>
                <td>
                  <ModelLinkedText :text="row.function" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 class="bilge-subhead">{{ t('bilge.sequenceTitle') }}</h3>
        <ol class="bilge-steps">
          <li v-for="(step, i) in intelibilgeSteps" :key="i">
            <span class="bilge-step-lead">
              <ModelLinkedText :text="step.lead" />
            </span>
            <ul v-if="step.sub?.length" class="bilge-step-sub">
              <li v-for="(s, j) in step.sub" :key="j">
                <ModelLinkedText :text="s" />
              </li>
            </ul>
          </li>
        </ol>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.featuresTitle') }}</h2>
        <article v-for="(sec, i) in intelibilgeFeatureSections" :key="i" class="bilge-feature-block">
          <h3>{{ sec.title }}</h3>
          <ul>
            <li v-for="(b, j) in sec.bullets" :key="j">
              <ModelLinkedText :text="b" />
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.specsTitle') }}</h2>
        <div class="bilge-table-wrap">
          <table class="bilge-table">
            <thead>
              <tr>
                <th>{{ t('bilge.col.category') }}</th>
                <th>{{ t('bilge.col.specification') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, i) in intelibilgeSpecs" :key="i">
                <td>
                  <ModelLinkedText :text="row.category" />
                </td>
                <td>
                  <ModelLinkedText :text="row.specification" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.includedTitle') }}</h2>
        <ul class="bilge-list">
          <li v-for="(item, i) in intelibilgeIncluded" :key="i">
            <ModelLinkedText :text="item" />
          </li>
        </ul>
        <p class="bilge-note">{{ t('bilge.includedNote') }}</p>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.applicationsTitle') }}</h2>
        <ul class="bilge-list">
          <li v-for="(item, i) in intelibilgeApplications" :key="i">
            <ModelLinkedText :text="item" />
          </li>
        </ul>
      </div>
    </section>

    <section class="bilge-section fade-in">
      <div class="container">
        <h2>{{ t('bilge.orderingTitle') }}</h2>
        <div class="bilge-table-wrap">
          <table class="bilge-table">
            <thead>
              <tr>
                <th>{{ t('bilge.col.productCode') }}</th>
                <th>{{ t('bilge.col.description') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in intelibilgeOrdering" :key="row.code">
                <td><code>{{ row.code }}</code></td>
                <td>
                  <ModelLinkedText :text="row.description" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section class="bilge-foot fade-in">
      <div class="container">
        <h2>{{ t('bilge.contactTitle') }}</h2>
        <p class="bilge-company">{{ intelibilgeContact.company }}</p>
        <p>
          <a :href="intelibilgeContact.websiteUrl" target="_blank" rel="noopener noreferrer">
            {{ t('closing.websiteLabel') }}: {{ intelibilgeContact.websiteDisplay }}
          </a>
        </p>
        <p>
          <MailLink>
            <template #default="{ address }">{{ t('closing.emailLabel') }}: {{ address }}</template>
          </MailLink>
        </p>
        <p class="bilge-footnote">{{ intelibilgeContact.footnote }}</p>
        <div class="bilge-nav-links">
          <RouterLink to="/products#intelibilge">{{ t('bilge.backProducts') }}</RouterLink>
          <RouterLink to="/">{{ t('bilge.backHome') }}</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useI18n } from '@/composables/useI18n'
import { useFadeIn } from '@/composables/useFadeIn'
import ModelLinkedText from '@/components/ModelLinkedText.vue'
import MailLink from '@/components/MailLink.vue'
import {
  intelibilgeHero,
  intelibilgeHowComponents,
  intelibilgeSteps,
  intelibilgeFeatureSections,
  intelibilgeSpecs,
  intelibilgeIncluded,
  intelibilgeApplications,
  intelibilgeOrdering,
  intelibilgeContact,
} from '@/data/intelibilgeContent'

const { t } = useI18n()
useFadeIn('.bilge-page')
</script>

<style scoped>
.bilge-page {
  padding-top: 5rem;
  min-height: 60vh;
}
.bilge-hero {
  padding: 5rem 0 3rem;
  border-bottom: 1px solid var(--border-subtle);
}
.bilge-hero h1 {
  margin-bottom: 1.25rem;
  font-size: clamp(1.75rem, 4vw, 2.75rem);
}
.bilge-overview {
  max-width: 50rem;
  color: var(--text-secondary);
  line-height: 1.75;
  font-size: 1.05rem;
}
.bilge-section {
  padding: 4rem 0;
  border-bottom: 1px solid var(--border-subtle);
  scroll-margin-top: 5rem;
}
.bilge-section h2 {
  margin-bottom: 1.75rem;
  font-size: clamp(1.35rem, 2.5vw, 2rem);
}
.bilge-subhead {
  font-size: 1.05rem;
  margin: 2rem 0 1rem;
  color: var(--brand-marine-blue);
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

[data-theme="dark"] .bilge-subhead {
  color: #6FA0CC;
}
.bilge-table-wrap {
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
  margin-bottom: 2rem;
}
.bilge-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.92rem;
}
.bilge-table th,
.bilge-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}
.bilge-table th {
  font-weight: 600;
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--text-muted);
  background: var(--border-subtle);
}
.bilge-table tr:last-child td {
  border-bottom: none;
}
.bilge-table td:first-child {
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
}
.bilge-table td:last-child {
  color: var(--text-secondary);
  line-height: 1.55;
}
.bilge-table code {
  color: var(--brand-marine-blue);
  font-size: 0.9em;
  font-family: 'Montserrat', monospace;
  font-weight: 600;
}

[data-theme="dark"] .bilge-table code {
  color: #6FA0CC;
}
.bilge-steps {
  margin: 0;
  padding-left: 1.35rem;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 48rem;
}
.bilge-steps > li {
  margin-bottom: 1rem;
}
.bilge-step-lead {
  display: block;
}
.bilge-step-sub {
  margin: 0.5rem 0 0;
  padding-left: 1.25rem;
  list-style: disc;
}
.bilge-feature-block {
  margin-bottom: 2.5rem;
  max-width: 48rem;
}
.bilge-feature-block h3 {
  font-size: 1.1rem;
  margin-bottom: 0.65rem;
  color: var(--text-primary);
}
.bilge-feature-block ul {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
.bilge-list {
  max-width: 44rem;
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
.bilge-list li {
  margin-bottom: 0.4rem;
}
.bilge-note {
  margin-top: 1.25rem;
  color: var(--text-muted);
  font-size: 0.95rem;
}
.bilge-foot {
  padding: 4rem 0 6rem;
}
.bilge-foot h2 {
  margin-bottom: 1rem;
}
.bilge-company {
  font-weight: 600;
  margin-bottom: 0.75rem;
}
.bilge-foot a {
  color: var(--brand-marine-blue);
  text-decoration: none;
}

[data-theme="dark"] .bilge-foot a {
  color: #6FA0CC;
}
.bilge-foot a:hover {
  text-decoration: underline;
}
.bilge-footnote {
  margin-top: 1.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
  line-height: 1.55;
  max-width: 48rem;
}
.bilge-nav-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-top: 2rem;
}
.bilge-nav-links a {
  color: var(--brand-marine-blue);
  font-weight: 600;
  text-decoration: none;
}

[data-theme="dark"] .bilge-nav-links a {
  color: #6FA0CC;
}
.bilge-nav-links a:hover {
  text-decoration: underline;
}
</style>
