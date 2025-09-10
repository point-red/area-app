<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  menus.value.push({ name: 'User', path: '/master/users', icon: 'i-far-users' })
  menus.value.push({ name: 'Area', path: '/master/areas', icon: 'i-far-map-location' })
})
</script>

<template>
  <app-menu v-model:menus="menus" />
</template>
