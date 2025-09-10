<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'
// import { useAuthStore } from '@/stores/auth.store'

// const authStore = useAuthStore()

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  menus.value.push({
    name: 'Master',
    path: '/master',
    icon: 'i-fad-address-card'
  })
})
</script>

<template>
  <app-menu v-model:menus="menus" />
</template>
