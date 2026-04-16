<template>
  <section class="fuel-dash-section" id="fuel-dashboard">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('fuelDash.label') }}</div>
        <h2>{{ t('fuelDash.title') }}</h2>
        <p class="section-description">
          <ModelLinkedText :text="t('fuelDash.lead')" />
        </p>
      </div>
      <div class="fuel-table-wrap">
        <table class="fuel-table">
          <thead>
            <tr>
              <th>{{ t('fuelDash.col.feature') }}</th>
              <th>{{ t('fuelDash.col.detail') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 5" :key="i">
              <td>{{ t(`fuelDash.row${i}f`) }}</td>
              <td>{{ t(`fuelDash.row${i}d`) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="fuel-dash-outro">{{ t('fuelDash.outro') }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import ModelLinkedText from '@/components/ModelLinkedText.vue'

const { t } = useI18n()
</script>

<style scoped>
.fuel-dash-section {
  background: var(--deep-navy);
  border-top: 1px solid var(--border-subtle);
}
.fuel-table-wrap {
  max-width: 52rem;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}
.fuel-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
}
.fuel-table th,
.fuel-table td {
  padding: 0.85rem 1.15rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}
.fuel-table th {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--border-subtle);
}
.fuel-table tr:last-child td {
  border-bottom: none;
}
.fuel-table td:first-child {
  color: var(--text-primary);
  font-weight: 500;
  white-space: nowrap;
}
.fuel-table td:last-child {
  color: var(--text-secondary);
  line-height: 1.55;
}
.fuel-dash-outro {
  text-align: center;
  margin-top: 2rem;
  font-family: 'Outfit', sans-serif;
  font-weight: 600;
  color: var(--text-primary);
}
</style>
