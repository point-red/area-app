<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  menus.value.push({ name: 'Area', path: '/master/area', icon: 'i-far-map-location' })
})
</script>

<template>
  <app-menu v-model:menus="menus" />
</template>
