<template>
  <section class="closing-section" id="contact">
    <div class="container">
      <div class="closing-content">
        <div class="closing-text fade-in">
          <div class="section-label accent">{{ t('nav.contact') }}</div>
          <h2 v-html="t('closing.title')"></h2>
          <p>
            {{ t('closing.description') }}
          </p>
          <p class="closing-contact-lead">{{ t('closing.contactLead') }}</p>

          <div class="closing-contact-links">
            <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer">{{ t('closing.websiteLabel') }}: intelimaris.com</a>
            <a href="mailto:info@intelimarine.com">{{ t('closing.emailLabel') }}: info@intelimarine.com</a>
          </div>

          <div class="closing-trust-list">
            <div class="trust-item">
              <span class="trust-label">Response</span>
              <strong>Commercial follow-up within 1 business day</strong>
            </div>
            <div class="trust-item">
              <span class="trust-label">Deliverables</span>
              <strong>Demo path, hardware fit, and deployment guidance</strong>
            </div>
            <div class="trust-item">
              <span class="trust-label">Deployment</span>
              <strong>Single vessel, marina, and fleet conversations supported</strong>
            </div>
          </div>

          <p class="closing-disclaimer">{{ t('closing.disclaimer') }}</p>
        </div>

        <div class="closing-form fade-in">
          <div class="form-card">
            <h3>{{ t('closing.form.title') }}</h3>

            <div v-if="submitState === 'success'" class="form-success" role="status" aria-live="polite">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p>{{ successMessage }}</p>
            </div>

            <form v-else @submit.prevent="handleSubmit">
              <input v-model.trim="form.name" type="text" :placeholder="t('closing.form.name')" autocomplete="name" required>
              <input v-model.trim="form.email" type="email" :placeholder="t('closing.form.email')" autocomplete="email" required>
              <input v-model.trim="form.company" type="text" :placeholder="t('closing.form.company')" autocomplete="organization">
              <select v-model="form.role" required>
                <option value="">{{ t('closing.form.role') }}</option>
                <option value="owner">{{ t('closing.form.role.owner') }}</option>
                <option value="marina">{{ t('closing.form.role.marina') }}</option>
                <option value="fleet">{{ t('closing.form.role.fleet') }}</option>
                <option value="insurance">{{ t('closing.form.role.insurance') }}</option>
                <option value="investor">{{ t('closing.form.role.investor') }}</option>
                <option value="other">{{ t('closing.form.role.other') }}</option>
              </select>
              <textarea v-model.trim="form.message" :placeholder="t('closing.form.message')" rows="4" required></textarea>

              <p v-if="submitError" class="form-error" role="alert">{{ submitError }}</p>

              <button type="submit" class="btn-primary full-width" :disabled="submitState === 'submitting'">
                {{ submitState === 'submitting' ? 'Sending...' : t('closing.form.submit') }}
              </button>
            </form>

            <p class="form-note">{{ formNote }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from '@/composables/useI18n'

type SubmitState = 'idle' | 'submitting' | 'success'

const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: '',
  message: '',
})

const submitState = ref<SubmitState>('idle')
const submitError = ref('')
const successMessage = ref('')

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim()

const formNote = computed(() =>
  endpoint
    ? t('closing.form.note')
    : 'If no web form endpoint is configured, submission opens a prefilled email to the InteliMaris team.'
)

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.company = ''
  form.role = ''
  form.message = ''
}

const handleSubmit = async () => {
  submitError.value = ''
  submitState.value = 'submitting'

  const payload = {
    ...form,
    source: 'intelimaris-web',
    submittedAt: new Date().toISOString(),
  }

  try {
    if (endpoint) {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      successMessage.value = t('closing.form.success')
    } else {
      const subject = encodeURIComponent(`InteliMaris inquiry from ${form.name}`)
      const body = encodeURIComponent(
        [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          `Company: ${form.company || 'Not provided'}`,
          `Role: ${form.role}`,
          '',
          form.message,
        ].join('\n')
      )

      window.location.href = `mailto:info@intelimarine.com?subject=${subject}&body=${body}`
      successMessage.value = 'Your email client was opened with a prefilled inquiry.'
    }

    submitState.value = 'success'
    resetForm()
  } catch {
    submitState.value = 'idle'
    submitError.value = 'We could not send your request. Please email info@intelimarine.com directly.'
  }
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
  margin-top: 0.9rem;
}

.closing-contact-links a {
  color: var(--cyan-bright);
  text-decoration: none;
  font-weight: 600;
}

.closing-contact-links a:hover {
  text-decoration: underline;
}

.closing-trust-list {
  display: grid;
  gap: 0.85rem;
  margin-top: 2rem;
}

.trust-item {
  padding: 1rem 1.1rem;
  border: 1px solid var(--border-subtle);
  border-radius: 1rem;
  background: var(--surface-soft);
}

.trust-label {
  display: block;
  margin-bottom: 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.trust-item strong {
  color: var(--text-primary);
  font-size: 0.98rem;
  line-height: 1.45;
}

.closing-disclaimer {
  margin-top: 1.5rem;
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.form-error {
  color: #f97316;
  font-size: 0.92rem;
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

button[disabled] {
  opacity: 0.7;
  cursor: wait;
}
</style>
