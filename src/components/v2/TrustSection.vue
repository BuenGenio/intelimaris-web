<template>
  <section class="chapter trust" data-chapter="slate">
    <div class="container-wide trust-inner">
      <div class="trust-copy">
        <h2>{{ t('v2.trust.title') }}</h2>
        <p class="t-lede">{{ t('v2.trust.lede') }}</p>
      </div>

      <dl class="trust-stats">
        <div v-for="stat in stats" :key="stat" class="trust-stat">
          <dd class="t-telemetry">{{ t(`v2.trust.stat.${stat}.value`) }}</dd>
          <dt class="t-caption">{{ t(`v2.trust.stat.${stat}.label`) }}</dt>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const stats = ['marinas', 'workspaces', 'roles', 'locales'] as const
</script>

<style scoped>
.trust {
  padding-block: var(--space-24);
}

.trust-inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
  gap: clamp(2rem, 1rem + 4vw, 4.5rem);
  align-items: center;
}

.trust-copy h2 {
  max-width: 18ch;
}

.trust-copy .t-lede {
  margin-top: var(--space-4);
  max-width: 44ch;
}

.trust-stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: var(--space-6);
  margin: 0;
}

.trust-stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--border-subtle);
}

.trust-stat dd {
  margin: 0;
  color: var(--domain-ink);
}

@media (max-width: 1040px) {
  .trust-inner {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 620px) {
  .trust-stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
