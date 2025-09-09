<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppMenu from '@/components/app-menu.vue'
// import { useAuthStore } from '@/stores/auth.store'

// const authStore = useAuthStore()

const breadcrumbs = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'My Account'
  }
]

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const menus = ref<any[]>([])

onMounted(() => {
  menus.value.push({
    name: 'Profile',
    path: '/my-account/profile',
    icon: 'i-far-address-card'
  })
  menus.value.push({
    name: 'Password',
    path: '/my-account/password',
    icon: 'i-far-lock'
  })
})
</script>

<template>
  <app-menu :breadcrumbs="breadcrumbs" v-model:menus="menus" />
</template>
