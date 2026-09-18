<template>
  <footer class="footer chapter" data-chapter="slate" role="contentinfo">
    <div class="container-wide footer-grid">
      <div class="footer-family">
        <p class="t-overline footer-label">{{ t('footer.family') }}</p>
        <ul class="footer-family-list">
          <li>
            <RouterLink to="/" class="footer-mark"><Wordmark :size="22" /></RouterLink>
            <span class="t-caption">{{ t('footer.family.sea') }}</span>
          </li>
          <li>
            <RouterLink to="/waterwayz" class="footer-mark"><Wordmark root="Water" domain="Wayz" product :size="22" /></RouterLink>
            <span class="t-caption">{{ t('footer.family.waterwayz') }}</span>
          </li>
        </ul>
        <p class="footer-sentence">{{ t('v2.closing.sentence') }}</p>
      </div>

      <nav class="footer-links" aria-label="Footer navigation">
        <div class="footer-section">
          <h4>{{ t('footer.platform') }}</h4>
          <RouterLink :to="{ name: 'waterwayz' }">{{ t('nav.waterwayz') }}</RouterLink>
          <RouterLink :to="{ name: 'marinas' }">{{ t('nav.marina') }}</RouterLink>
          <RouterLink to="/capabilities/monitoring">{{ t('nav.platform') }}</RouterLink>
          <RouterLink to="/capabilities">Explore all capabilities</RouterLink>
          <RouterLink to="/#choose">Find your role</RouterLink>
          <RouterLink to="/products">{{ t('footer.platform.products') }}</RouterLink>
          <RouterLink :to="{ name: 'software' }">{{ t('footer.platform.software') }}</RouterLink>
          <RouterLink :to="{ name: 'demo' }">{{ t('footer.platform.demo') }}</RouterLink>
        </div>

        <div class="footer-section">
          <h4>{{ t('footer.company') }}</h4>
          <RouterLink to="/about">{{ t('footer.company.about') }}</RouterLink>
          <RouterLink to="/contact">{{ t('nav.contact') }}</RouterLink>
          <MailLink />
        </div>
      </nav>
    </div>

    <nav class="container-wide footer-audiences" aria-label="Audience guides" lang="en"><RouterLink v-for="person in AUDIENCES" :key="person.id" :to="audienceLink(person.id)">{{ person.label }}</RouterLink></nav>
    <div class="container-wide footer-bottom">
      <hr class="line" />
      <p class="t-caption">{{ t('footer.copyright') }}</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { AUDIENCES, audienceLink } from '@/data/audiences'
import Wordmark from '@/components/v2/Wordmark.vue'
import MailLink from '@/components/MailLink.vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.footer-audiences { display:flex; flex-wrap:wrap; gap:16px 28px; margin-top:36px; padding-top:26px; border-top:1px solid var(--border-subtle); }
.footer-audiences a { color:var(--text-secondary); font-size:.8rem; text-decoration:none; }
.footer-audiences a:hover { color:#fff; }
.footer {
  padding: var(--space-16) 0 var(--space-8);
}

.footer-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: var(--space-12);
}

.footer-label {
  margin: 0 0 var(--space-4);
}

.footer-family-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.footer-family-list li {
  display: flex;
  align-items: baseline;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.footer-mark {
  display: inline-flex;
  text-decoration: none;
}

.footer-sentence {
  margin: var(--space-8) 0 0;
  max-width: 34ch;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: var(--type-h3);
  line-height: 1.3;
  color: #ffffff;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-8);
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.footer-section h4 {
  font-family: var(--font-text);
  font-size: var(--type-overline);
  font-weight: 500;
  letter-spacing: var(--type-overline-ls);
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 var(--space-1);
}

.footer-section a,
.footer-section :deep(a) {
  color: var(--text-secondary);
  text-decoration: none;
  font-family: var(--font-text);
  font-size: var(--type-body-sm);
}

.footer-section a:hover,
.footer-section :deep(a:hover) {
  color: #ffffff;
}

.footer-bottom {
  margin-top: var(--space-12);
}

.footer-bottom .line {
  margin-bottom: var(--space-4);
}

.footer-bottom p {
  margin: 0;
}

@media (max-width: 860px) {
  .footer-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
