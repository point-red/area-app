<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardTable from './card-table.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (authStore.role !== 'developer') {
    router.replace('/unauthorized')
  }
})
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs />
    <card-table />
  </div>
</template>
