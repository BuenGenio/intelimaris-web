<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="modelValue"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        :aria-label="shot.alt"
        @click.self="close"
      >
        <div class="lightbox-bar">
          <p class="lightbox-caption t-caption">{{ caption || shot.alt }}</p>
          <button ref="closeButton" type="button" class="lightbox-close" :aria-label="t('shot.close')" @click="close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke-linecap="round" />
            </svg>
          </button>
        </div>

        <!-- Panning a 1600px dashboard is the only way it stays readable on a phone. -->
        <div class="lightbox-scroll">
          <img :src="src" :alt="shot.alt" :width="shot.width" :height="shot.height" />
        </div>

        <p class="lightbox-hint t-caption">{{ t('shot.panHint') }}</p>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue'
import { SHOTS, shotFull, type ShotId } from '@/data/shots'
import { useI18n } from '@/composables/useI18n'

const props = defineProps<{
  modelValue: boolean
  id: ShotId
  caption?: string
}>()

const emit = defineEmits<{ 'update:modelValue': [boolean] }>()

const { t } = useI18n()
const shot = SHOTS[props.id]
const src = shotFull(props.id)
const closeButton = ref<HTMLButtonElement | null>(null)

const close = () => emit('update:modelValue', false)

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') close()
}

watch(
  () => props.modelValue,
  (open) => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (open) {
      document.addEventListener('keydown', onKeydown)
      void nextTick(() => closeButton.value?.focus())
    } else {
      document.removeEventListener('keydown', onKeydown)
    }
  },
)
</script>

<style scoped>
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 9000;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4);
  background: rgba(5, 7, 13, 0.88);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}

.lightbox-bar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

.lightbox-caption {
  flex: 1;
  color: #b7bfcf;
  margin: 0;
}

.lightbox-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: var(--radius-pill);
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  cursor: pointer;
}

.lightbox-close svg {
  width: 20px;
  height: 20px;
}

.lightbox-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  border-radius: var(--radius-md);
  overscroll-behavior: contain;
  -webkit-overflow-scrolling: touch;
}

.lightbox-scroll img {
  display: block;
  width: auto;
  max-width: none;
  height: auto;
  border-radius: var(--radius-md);
}

@media (min-width: 900px) {
  .lightbox-scroll img {
    width: 100%;
    max-width: 1600px;
    margin-inline: auto;
  }
}

.lightbox-hint {
  flex-shrink: 0;
  text-align: center;
  color: #8e99af;
  margin: 0;
}

@media (min-width: 900px) {
  .lightbox-hint {
    display: none;
  }
}

.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 200ms var(--ease-out);
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>
