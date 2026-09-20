<template>
  <Teleport to="body">
    <Transition name="ob">
      <div v-if="open" class="ob-backdrop" @click.self="close">
        <div ref="dialog" class="ob-dialog" role="dialog" aria-modal="true" :aria-labelledby="titleId" lang="en" @keydown.esc.stop="close" @keydown.tab="trapTab">
          <div class="ob-top">
            <ol class="ob-progress" :aria-label="`Step ${step + 1} of ${STEPS.length}`">
              <li v-for="(name, i) in STEPS" :key="name" :class="{ done: i < step, now: i === step }"><span class="sr-only">{{ name }}</span></li>
            </ol>
            <span class="ob-count t-num">{{ step + 1 }}/{{ STEPS.length }}</span>
            <button type="button" class="ob-close" aria-label="Close" @click="close">×</button>
          </div>

          <!-- 1 · role -->
          <section v-if="step === 0" class="ob-step">
            <h2 :id="titleId">Where do you come in?</h2>
            <p class="ob-sub">Pick the one that fits today. You can change it later.</p>
            <div class="ob-roles" role="radiogroup" aria-label="Your role">
              <button v-for="person in AUDIENCES" :key="person.id" ref="roleButtons" type="button" role="radio" :aria-checked="role === person.id" class="ob-role" :class="{ on: role === person.id }" @click="role = person.id" @dblclick="next">
                <span class="ob-role-icon"><RoleIcon :id="person.id" /></span>
                <span class="ob-role-text"><strong>{{ person.label }}</strong><span>{{ person.intent }}</span></span>
                <span class="ob-radio" aria-hidden="true"></span>
              </button>
            </div>
          </section>

          <!-- 2 · phone -->
          <section v-else-if="step === 1" class="ob-step">
            <h2 :id="titleId">Where should we text your link?</h2>
            <p class="ob-sub">WaterWayz™ sends one text to confirm the number, then asks for your name and email. Nothing is stored on this site.</p>
            <form class="ob-phone" @submit.prevent="next">
              <label class="ob-dial">
                <span class="sr-only">Country code</span>
                <select v-model="dial">
                  <option v-for="c in DIAL_CODES" :key="c.code" :value="c.code">{{ c.flag }} {{ c.code }}</option>
                </select>
              </label>
              <label class="ob-number">
                <span class="sr-only">Mobile number</span>
                <input ref="phoneInput" v-model="local" type="tel" inputmode="tel" autocomplete="tel-national" placeholder="Mobile number" :aria-invalid="phoneTouched && !phone ? 'true' : undefined" @input="phoneTouched = false" />
              </label>
            </form>
            <p v-if="phoneTouched && !phone" class="ob-error" role="alert">That number looks short. Check it and try again.</p>
            <p v-else class="ob-fine">Standard message rates apply. Reply STOP to any text to opt out.</p>
          </section>

          <!-- 3 · hand off -->
          <section v-else class="ob-step">
            <h2 :id="titleId">Continue in WaterWayz™</h2>
            <p class="ob-sub">Here is what we will pass along. WaterWayz confirms the number by text and takes it from there.</p>
            <dl class="ob-summary">
              <div><dt>Role</dt><dd>{{ chosen?.label }}</dd></div>
              <div><dt>Mobile</dt><dd class="t-num">{{ dial }} {{ formatLocal(dial, local) }}</dd></div>
            </dl>
            <p class="ob-fine">Prefer a person? <RouterLink to="/contact" @click="close">Talk to us</RouterLink> instead.</p>
          </section>

          <div class="ob-actions">
            <button v-if="step > 0" type="button" class="ob-back" @click="step--">← Back</button>
            <span v-else></span>
            <a v-if="step === 2" :href="handoff" class="ob-next ob-go" @click="close">Open WaterWayz <span aria-hidden="true">→</span></a>
            <button v-else type="button" class="ob-next" :disabled="step === 0 && !role" :aria-label="step === 0 ? 'Next: your mobile number' : 'Next: review'" @click="next">→</button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { AUDIENCES, findAudience } from '@/data/audiences'
import { DIAL_CODES, formatLocal, signUpLink, toE164 } from '@/data/app'
import { useOnboarding } from '@/composables/useOnboarding'
import RoleIcon from './RoleIcon.vue'

const STEPS = ['Your role', 'Your mobile', 'Continue in WaterWayz'] as const
const { open, presetRole, close } = useOnboarding()
const titleId = 'onboarding-title'
const dialog = ref<HTMLElement | null>(null)
const roleButtons = ref<HTMLButtonElement[]>([])
const phoneInput = ref<HTMLInputElement | null>(null)

const step = ref(0)
const role = ref<string | undefined>(undefined)
const dial = ref<string>('+1')
const local = ref('')
const phoneTouched = ref(false)

const chosen = computed(() => findAudience(role.value))
const phone = computed(() => toE164(dial.value, local.value))
const handoff = computed(() => signUpLink({ role: role.value, phone: phone.value ?? undefined }))

function next() {
  if (step.value === 0) { if (!role.value) return; step.value = 1; return }
  if (step.value === 1) { phoneTouched.value = true; if (!phone.value) { phoneInput.value?.focus(); return }; step.value = 2 }
}

/* Focus follows the step; the dialog keeps focus until it closes. */
watch(open, async (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
  if (!isOpen) return
  step.value = 0
  role.value = presetRole.value
  phoneTouched.value = false
  await nextTick()
  focusStep()
})
watch(step, async () => { await nextTick(); focusStep() })
function focusStep() {
  if (step.value === 0) (roleButtons.value.find((b) => b.classList.contains('on')) ?? roleButtons.value[0])?.focus()
  else if (step.value === 1) phoneInput.value?.focus()
  else dialog.value?.querySelector<HTMLElement>('.ob-go')?.focus()
}
function trapTab(e: KeyboardEvent) {
  const nodes = dialog.value?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, select') ?? []
  if (!nodes.length) return
  const first = nodes[0]!, last = nodes[nodes.length - 1]!
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
}
</script>

<style scoped>
.ob-backdrop { position: fixed; inset: 0; z-index: 200; display: grid; place-items: center; padding: 16px; background: rgba(11, 18, 32, 0.45); backdrop-filter: blur(6px); -webkit-backdrop-filter: blur(6px); }
.ob-dialog { width: min(560px, 100%); max-height: calc(100dvh - 32px); overflow-y: auto; background: var(--surface-page); color: var(--text-primary); border-radius: var(--radius-2xl); box-shadow: var(--sky-shadow); padding: 22px 28px 24px; font-family: var(--font-text); }
.ob-top { display: grid; grid-template-columns: minmax(0, 1fr) auto auto; align-items: center; gap: 14px; margin-bottom: 26px; }
.ob-progress { display: flex; gap: 6px; list-style: none; margin: 0; padding: 0; }
.ob-progress li { flex: 1; height: 6px; border-radius: 999px; background: var(--sky-line); }
.ob-progress li.done, .ob-progress li.now { background: var(--domain); }
.ob-count { font-size: 0.78rem; color: var(--text-muted); }
.ob-close { width: 36px; height: 36px; border: 0; border-radius: 50%; background: var(--sky-wash); color: var(--text-secondary); font-size: 1.4rem; line-height: 1; cursor: pointer; }
.ob-close:hover { background: var(--domain-tint); color: var(--text-primary); }
.ob-step { padding: 0; }
.ob-step h2 { margin: 0; font-family: var(--font-display); font-size: clamp(1.45rem, 2.4vw, 1.8rem); letter-spacing: -0.03em; line-height: 1.15; }
.ob-sub { margin: 8px 0 20px; color: var(--text-secondary); font-size: 0.93rem; line-height: 1.5; }
.ob-roles { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
.ob-role { display: grid; grid-template-columns: auto minmax(0, 1fr) auto; align-items: center; gap: 12px; padding: 12px 14px; border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); background: var(--surface-page); color: var(--text-primary); text-align: left; cursor: pointer; font-family: inherit; transition: border-color 140ms, background 140ms; }
.ob-role:hover { border-color: var(--domain); }
.ob-role.on { border-color: var(--domain); background: var(--sky-wash); }
.ob-role-icon { display: grid; place-items: center; width: 40px; height: 40px; border-radius: 12px; background: var(--sky-wash); color: var(--domain-ink); }
.ob-role.on .ob-role-icon { background: var(--domain); color: #fff; }
.ob-role-text strong { display: block; font-size: 0.9rem; font-weight: 600; line-height: 1.2; }
.ob-role-text span { display: block; margin-top: 3px; font-size: 0.74rem; color: var(--text-secondary); line-height: 1.35; }
.ob-radio { width: 18px; height: 18px; border-radius: 50%; border: 2px solid var(--border-medium); }
.ob-role.on .ob-radio { border-color: var(--domain); box-shadow: inset 0 0 0 4px var(--surface-page); background: var(--domain); }
.ob-phone { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: 10px; }
.ob-phone select, .ob-phone input { min-height: 54px; border: 1px solid var(--border-medium); border-radius: var(--radius-lg); background: var(--surface-page); color: var(--text-primary); font: 500 1.05rem var(--font-text); padding: 0 16px; }
.ob-phone select { padding-right: 34px; }
.ob-phone input { width: 100%; letter-spacing: 0.02em; }
.ob-phone input:focus, .ob-phone select:focus { outline: 2px solid var(--domain); outline-offset: 1px; border-color: var(--domain); }
.ob-phone input[aria-invalid='true'] { border-color: #bf5114; }
.ob-error { margin: 12px 0 0; color: #bf5114; font-size: 0.85rem; }
.ob-fine { margin: 12px 0 0; color: var(--text-muted); font-size: 0.8rem; }
.ob-fine a { color: var(--domain-ink); font-weight: 600; }
.ob-summary { display: grid; gap: 10px; margin: 0; }
.ob-summary div { display: flex; justify-content: space-between; gap: 16px; padding: 14px 18px; border-radius: var(--radius-lg); background: var(--sky-wash); }
.ob-summary dt { color: var(--text-secondary); font-size: 0.85rem; }
.ob-summary dd { margin: 0; font-weight: 600; }
.ob-actions { display: flex; justify-content: space-between; align-items: center; margin-top: 28px; }
.ob-back { border: 0; background: transparent; color: var(--text-secondary); font: 500 0.9rem var(--font-text); cursor: pointer; padding: 10px 0; }
.ob-back:hover { color: var(--domain-ink); }
.ob-next { display: inline-flex; align-items: center; justify-content: center; gap: 10px; min-width: 56px; height: 56px; padding: 0 22px; border: 0; border-radius: var(--radius-pill); background: var(--domain); color: #fff; font: 600 1.1rem var(--font-text); text-decoration: none; cursor: pointer; transition: background 140ms, transform 140ms; }
.ob-next:hover { background: var(--maris-dark); transform: translateX(2px); }
.ob-next:disabled { background: var(--domain-tint); color: #fff; cursor: not-allowed; transform: none; }
.ob-go { font-size: 0.95rem; }
.ob-enter-active, .ob-leave-active { transition: opacity 180ms var(--ease-out); }
.ob-enter-active .ob-dialog, .ob-leave-active .ob-dialog { transition: transform 220ms var(--ease-out), opacity 180ms; }
.ob-enter-from, .ob-leave-to { opacity: 0; }
.ob-enter-from .ob-dialog, .ob-leave-to .ob-dialog { transform: translateY(14px) scale(0.98); opacity: 0; }
@media (max-width: 560px) {
  .ob-dialog { padding: 18px 18px 20px; border-radius: var(--radius-xl); }
  .ob-roles { grid-template-columns: minmax(0, 1fr); }
  .ob-role-text span { display: none; }
}
@media (prefers-reduced-motion: reduce) { .ob-enter-active, .ob-leave-active, .ob-enter-active .ob-dialog, .ob-leave-active .ob-dialog { transition: none; } }
</style>
