<template>
  <section class="closing-section" id="contact">
    <div class="editorial-shell">
      <div class="closing-content">
        <div class="closing-text">
          <div class="section-label accent">{{ t('nav.contact') }}</div>
          <h2>Start with what you need to do.</h2>
          <p>
            Tell us about your vessel, team, dock or business. We’ll help you understand the relevant workflow, what is available today and what your setup needs.
          </p>
          <p class="closing-contact-lead">Ask for a walkthrough, discuss an installation or get help finding your starting point.</p>

          <div class="closing-contact-links">
            <a href="https://www.intelimaris.com" target="_blank" rel="noopener noreferrer">{{ t('closing.websiteLabel') }}: intelimaris.com</a>
            <MailLink>
              <template #default="{ address }">{{ t('closing.emailLabel') }}: {{ address }}</template>
            </MailLink>
          </div>

          <div class="closing-trust-list">
            <div class="trust-item">
              <span class="trust-label">Response</span>
              <strong>Talk directly with the team</strong>
            </div>
            <div class="trust-item">
              <span class="trust-label">Deliverables</span>
              <strong>A walkthrough matched to your role and requirements</strong>
            </div>
            <div class="trust-item">
              <span class="trust-label">Deployment</span>
              <strong>Vessels, marinas, private docks, businesses and service teams</strong>
            </div>
          </div>

          <p class="closing-disclaimer">{{ t('closing.disclaimer') }}</p>
        </div>

        <div class="closing-form">
          <div class="form-card">
            <h3>Tell us about your setup</h3>

            <div v-if="submitState === 'success'" class="form-success" role="status" aria-live="polite">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <p>{{ successMessage }}</p>
            </div>

            <form v-else @submit.prevent="handleSubmit">
              <input
                v-model="form.website"
                type="text"
                name="website"
                class="hp-field"
                tabindex="-1"
                autocomplete="off"
                aria-hidden="true"
              >
              <label class="contact-field"><span>{{ t('closing.form.name') }}</span><input v-model.trim="form.name" type="text" :aria-label="t('closing.form.name')" :placeholder="t('closing.form.name')" autocomplete="name" required></label>
              <label class="contact-field"><span>{{ t('closing.form.email') }}</span><input v-model.trim="form.email" type="email" :aria-label="t('closing.form.email')" :placeholder="t('closing.form.email')" autocomplete="email" required></label>
              <label class="contact-field"><span>{{ t('closing.form.company') }}</span><input v-model.trim="form.company" type="text" :aria-label="t('closing.form.company')" :placeholder="t('closing.form.company')" autocomplete="organization"></label>
              <label class="contact-field"><span>Your role</span>
              <select v-model="form.role" aria-label="Your role" required>
                <option value="">{{ t('closing.form.role') }}</option>
                <option v-for="person in AUDIENCES" :key="person.id" :value="person.id">{{ person.label }}</option>
                <option value="insurance">{{ t('closing.form.role.insurance') }}</option>
                <option value="investor">{{ t('closing.form.role.investor') }}</option>
                <option value="other">{{ t('closing.form.role.other') }}</option>
              </select>
              </label>
              <label class="contact-field"><span>What would you like to do?</span><textarea v-model.trim="form.message" :aria-label="t('closing.form.message')" :placeholder="t('closing.form.message')" rows="4" required></textarea></label>

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
import { AUDIENCES } from '@/data/audiences'
import { useI18n } from '@/composables/useI18n'
import MailLink from '@/components/MailLink.vue'
import { buildMailto } from '@/utils/email'

type SubmitState = 'idle' | 'submitting' | 'success'

const props = withDefaults(defineProps<{ initialRole?: string; initialMessage?: string }>(), { initialRole: '', initialMessage: '' })
const { t } = useI18n()

const form = reactive({
  name: '',
  email: '',
  company: '',
  role: props.initialRole,
  message: props.initialMessage,
  /** Honeypot: hidden from real visitors via .hp-field; a filled value marks the submission as spam. */
  website: '',
})

const submitState = ref<SubmitState>('idle')
const submitError = ref('')
const successMessage = ref('')

const endpoint = import.meta.env.VITE_CONTACT_FORM_ENDPOINT?.trim()

const formNote = computed(() =>
  endpoint
    ? t('closing.form.note')
    : 'This form opens a draft in your email app. Review it there before sending.'
)

const resetForm = () => {
  form.name = ''
  form.email = ''
  form.company = ''
  form.role = ''
  form.message = ''
  form.website = ''
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
      const subject = `InteliMaris inquiry from ${form.name}`
      const body = [
        `Name: ${form.name}`,
        `Email: ${form.email}`,
        `Company: ${form.company || 'Not provided'}`,
        `Role: ${form.role}`,
        '',
        form.message,
      ].join('\n')

      window.location.href = buildMailto({ subject, body })
      successMessage.value = 'Your email client was opened with a prefilled inquiry.'
    }

    submitState.value = 'success'
    resetForm()
  } catch {
    submitState.value = 'idle'
    submitError.value = 'We could not send your request. Please email our support team directly.'
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

.hp-field {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
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
