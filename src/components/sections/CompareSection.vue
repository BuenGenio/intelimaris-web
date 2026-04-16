<template>
  <section class="compare-section" id="why-us">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('compare.label') }}</div>
        <h2>{{ t('compare.title') }}</h2>
      </div>
      <div class="compare-table-wrap">
        <table class="compare-table">
          <thead>
            <tr>
              <th>{{ t('compare.col.benefit') }}</th>
              <th>{{ t('compare.col.owners') }}</th>
              <th>{{ t('compare.col.marinas') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="r in 7" :key="r">
              <td>{{ t(`compare.r${r}b`) }}</td>
              <td>{{ t(`compare.r${r}o`) }}</td>
              <td>{{ t(`compare.r${r}m`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
</script>

<style scoped>
.compare-section {
  background: linear-gradient(180deg, var(--ocean-blue) 0%, var(--deep-navy) 100%);
  border-top: 1px solid var(--border-subtle);
}
.compare-table-wrap {
  max-width: 56rem;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}
.compare-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.compare-table th,
.compare-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}
.compare-table th {
  font-weight: 600;
  color: var(--cyan-bright);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--border-subtle);
}
.compare-table tr:last-child td {
  border-bottom: none;
}
.compare-table td {
  color: var(--text-secondary);
  line-height: 1.5;
}
.compare-table td:first-child {
  color: var(--text-primary);
  font-weight: 500;
}
</style>
