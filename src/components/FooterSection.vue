<template>
  <footer class="footer chapter" data-chapter="slate" role="contentinfo">
    <div class="container-wide footer-grid">
      <div class="footer-family">
        <p class="t-overline footer-label">{{ t('footer.family') }}</p>
        <ul class="footer-family-list">
          <li>
            <RouterLink to="/" class="footer-mark"><Wordmark :size="22" tm /></RouterLink>
            <span class="t-caption">{{ t('footer.family.sea') }}</span>
          </li>
          <li>
            <RouterLink to="/waterwayz" class="footer-mark"><Wordmark root="Water" domain="Wayz" product :size="22" tm /></RouterLink>
            <span class="t-caption">{{ t('footer.family.waterwayz') }}</span>
          </li>
        </ul>
        <p class="footer-sentence">Know more. Worry less.<br>Enjoy the water.</p>
      </div>

      <nav class="footer-links" aria-label="Footer navigation" lang="en">
        <div class="footer-section">
          <h4>Explore</h4>
          <RouterLink v-for="link in MAIN_NAVIGATION" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
          <RouterLink to="/contact">Talk to us</RouterLink>
          <MailLink />
        </div>
        <div class="footer-section">
          <h4>Software &amp; marina</h4>
          <RouterLink v-for="link in PLATFORM_NAVIGATION" :key="link.to" :to="link.to">{{ link.label }}</RouterLink>
          <RouterLink to="/capabilities/monitoring">Vessel monitoring</RouterLink>
          <RouterLink to="/capabilities/dockpass">Dock Pass</RouterLink>
        </div>
      </nav>
    </div>

    <nav class="container-wide footer-audiences" aria-label="Connected systems and developing capabilities" lang="en"><RouterLink v-for="solution in SOLUTIONS" :key="solution.id" :to="solutionLink(solution.id)">{{ solution.label }}</RouterLink><RouterLink to="/capabilities/emergency-assistance">Emergency Assistance</RouterLink></nav>
    <nav class="container-wide footer-audiences" aria-label="Audience guides" lang="en"><RouterLink v-for="person in AUDIENCES" :key="person.id" :to="audienceLink(person.id)">{{ person.label }}</RouterLink></nav>
    <div class="container-wide footer-bottom">
      <hr class="line" />
      <p class="t-caption">{{ t('footer.copyright') }}</p>
      <p class="t-caption" lang="en">InteliMarine LLC d/b/a InteliMARIS™. WaterWayz™ is the connected boating experience.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { MAIN_NAVIGATION, PLATFORM_NAVIGATION } from '@/data/navigation'
import { RouterLink } from 'vue-router'
import { SOLUTIONS, solutionLink } from '@/data/solutions'
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
