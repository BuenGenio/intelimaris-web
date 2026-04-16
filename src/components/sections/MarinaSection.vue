<template>
  <section class="marina-section" id="marina">
    <div class="container">
      <div class="section-header centered">
        <div class="section-label">{{ t('marina.label') }}</div>
        <h2>{{ t('marina.title') }}</h2>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.what.title') }}</h3>
        <p>{{ t('marina.what.p1') }}</p>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.alerts.title') }}</h3>
        <p>{{ t('marina.alerts.lead') }}</p>
        <ul class="marina-list">
          <li v-for="i in 5" :key="i">
            <ModelLinkedText :text="t(`marina.alerts.item${i}`)" />
          </li>
        </ul>
        <p>
          <ModelLinkedText :text="t('marina.alerts.im501')" />
        </p>
        <p>{{ t('marina.alerts.staff') }}</p>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.risks.title') }}</h3>
        <p>{{ t('marina.risks.lead') }}</p>
        <div class="marina-table-wrap">
          <table class="marina-table">
            <thead>
              <tr>
                <th>{{ t('marina.risks.col1') }}</th>
                <th>{{ t('marina.risks.col2') }}</th>
                <th>{{ t('marina.risks.col3') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in 4" :key="r">
                <td>{{ t(`marina.risks.r${r}c1`) }}</td>
                <td>{{ t(`marina.risks.r${r}c2`) }}</td>
                <td>{{ t(`marina.risks.r${r}c3`) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>{{ t('marina.risks.footer') }}</p>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.benefits.title') }}</h3>
        <ul class="marina-list">
          <li v-for="i in 5" :key="'b' + i">{{ t(`marina.benefits.item${i}`) }}</li>
        </ul>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.how.title') }}</h3>
        <ol class="marina-ordered">
          <li>{{ t('marina.how.step1') }}</li>
          <li>{{ t('marina.how.step2') }}</li>
          <li>{{ t('marina.how.step3') }}</li>
          <li>
            {{ t('marina.how.step4') }}
            <ul class="marina-sublist">
              <li>{{ t('marina.how.step4a') }}</li>
              <li>{{ t('marina.how.step4b') }}</li>
            </ul>
          </li>
          <li>{{ t('marina.how.step5') }}</li>
        </ol>
      </div>

      <div class="marina-block">
        <h3>{{ t('marina.dashboard.title') }}</h3>
        <p>{{ t('marina.dashboard.lead') }}</p>
        <ul class="marina-list">
          <li v-for="i in 3" :key="'d' + i">{{ t(`marina.dashboard.item${i}`) }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
import ModelLinkedText from '@/components/ModelLinkedText.vue'

const { t } = useI18n()
</script>

<style scoped>
.marina-section {
  background: var(--ocean-blue);
  border-top: 1px solid var(--border-subtle);
  border-bottom: 1px solid var(--border-subtle);
}
.marina-block {
  max-width: 48rem;
  margin: 0 auto 3rem;
}
.marina-block h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
}
.marina-block p {
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 1rem;
}
.marina-list,
.marina-sublist {
  margin: 0 0 1rem;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.65;
}
.marina-ordered {
  margin: 0;
  padding-left: 1.25rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
.marina-ordered > li {
  margin-bottom: 0.75rem;
}
.marina-table-wrap {
  overflow-x: auto;
  margin: 1.25rem 0;
  border-radius: 0.75rem;
  border: 1px solid var(--border-medium);
  background: var(--glass-bg);
}
.marina-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.marina-table th,
.marina-table td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--border-subtle);
  vertical-align: top;
}
.marina-table th {
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  background: var(--border-subtle);
}
.marina-table tr:last-child td {
  border-bottom: none;
}
</style>
