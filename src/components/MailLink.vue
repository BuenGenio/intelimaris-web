<template>
  <a
    :href="href"
    :rel="rel"
    @click="onClick"
  >
    <slot :address="address">{{ display }}</slot>
  </a>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { buildEmail, buildMailto } from '@/utils/email'

const props = defineProps<{
  subject?: string
  body?: string
  placeholder?: string
}>()

const address = ref('')
const href = ref('#')
const rel = ref('nofollow noopener')
const placeholderText = props.placeholder ?? 'email'
const display = ref(placeholderText)

onMounted(() => {
  address.value = buildEmail()
  href.value = buildMailto({ subject: props.subject, body: props.body })
  display.value = address.value
})

const onClick = (event: MouseEvent) => {
  if (href.value === '#') {
    event.preventDefault()
    address.value = buildEmail()
    href.value = buildMailto({ subject: props.subject, body: props.body })
    display.value = address.value
    window.location.href = href.value
  }
}
</script>
