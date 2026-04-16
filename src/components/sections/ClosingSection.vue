<template>
  <section class="closing-section" id="contact">
    <div class="container">
      <div class="closing-content">
        <div class="closing-text">
          <h2 v-html="t('closing.title')"></h2>
          <p>
            {{ t('closing.description') }}
          </p>
          <p class="closing-contact-lead">{{ t('closing.contactLead') }}</p>
          <div class="closing-contact-links">
            <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer">{{ t('closing.websiteLabel') }}: intelimaris.com</a>
            <a href="mailto:info@intelimarine.com">{{ t('closing.emailLabel') }}: info@intelimarine.com</a>
          </div>
          <p class="closing-disclaimer">{{ t('closing.disclaimer') }}</p>
        </div>

        <div class="closing-form">
          <div class="form-card">
            <h3>{{ t('closing.form.title') }}</h3>
            <div v-if="formSubmitted" class="form-success" role="status" aria-live="polite">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p>{{ t('closing.form.success') }}</p>
            </div>
            <form v-else @submit.prevent="handleSubmit">
              <input type="text" :placeholder="t('closing.form.name')" required>
              <input type="email" :placeholder="t('closing.form.email')" required>
              <input type="text" :placeholder="t('closing.form.company')">
              <select required>
                <option value="">{{ t('closing.form.role') }}</option>
                <option value="owner">{{ t('closing.form.role.owner') }}</option>
                <option value="marina">{{ t('closing.form.role.marina') }}</option>
                <option value="fleet">{{ t('closing.form.role.fleet') }}</option>
                <option value="insurance">{{ t('closing.form.role.insurance') }}</option>
                <option value="investor">{{ t('closing.form.role.investor') }}</option>
                <option value="other">{{ t('closing.form.role.other') }}</option>
              </select>
              <textarea :placeholder="t('closing.form.message')" rows="3"></textarea>
              <button type="submit" class="btn-primary full-width">
                {{ t('closing.form.submit') }}
              </button>
            </form>
            <p class="form-note">{{ t('closing.form.note') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const formSubmitted = ref(false)

const handleSubmit = () => {
  formSubmitted.value = true
}
</script>

<style scoped>
.closing-contact-lead {
  margin-top: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
}
.closing-contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-top: 0.75rem;
}
.closing-contact-links a {
  color: var(--cyan-bright);
  text-decoration: none;
  font-weight: 500;
}
.closing-contact-links a:hover {
  text-decoration: underline;
}
.closing-disclaimer {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.form-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2.5rem 1.5rem;
  gap: 1rem;
}

.form-success svg {
  width: 3rem;
  height: 3rem;
  color: #22c55e;
}

.form-success p {
  color: var(--text-secondary);
  line-height: 1.6;
}
</style>
