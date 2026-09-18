<template><ProductCatalog :product-id="id" /></template>
<script setup lang="ts">
import ProductCatalog from '@/components/ProductCatalog.vue'
defineProps<{ id: string }>()
</script>
