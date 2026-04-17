<template>
  <section class="compare-section" id="why-us">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('compare.label') }}</div>
        <h2>{{ t('compare.title') }}</h2>
        <p class="section-description">
          One operating model for owners, marina operators, and fleet teams.
        </p>
      </div>

      <div class="compare-grid">
        <article v-for="r in 7" :key="r" class="compare-card fade-in">
          <div class="compare-card-kicker">{{ t(`compare.r${r}b`) }}</div>
          <div class="compare-card-columns">
            <div>
              <span class="compare-card-label">{{ t('compare.col.owners') }}</span>
              <p>{{ t(`compare.r${r}o`) }}</p>
            </div>
            <div>
              <span class="compare-card-label">{{ t('compare.col.marinas') }}</span>
              <p>{{ t(`compare.r${r}m`) }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.compare-grid {
  display: grid;
  gap: 1rem;
  max-width: 72rem;
  margin: 0 auto;
}

.compare-card {
  padding: 1.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}

.compare-card-kicker {
  margin-bottom: 1rem;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cyan-bright);
}

.compare-card-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem 2rem;
}

.compare-card-label {
  display: inline-block;
  margin-bottom: 0.4rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted);
}

.compare-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 720px) {
  .compare-card-columns {
    grid-template-columns: 1fr;
  }
}
</style>
