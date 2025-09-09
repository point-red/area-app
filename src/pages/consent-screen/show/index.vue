<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import CardActions from './card-actions.vue'
import CardAuthorizedOrigins from './card-authorized-origins.vue'
import CardAuthorizedRedirectUris from './card-authorized-redirect-uris.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { apiRetrieve } from './retrieve.api'

const route = useRoute()
const form = useForm()

const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

onMounted(async () => {
  if (authStore.role !== 'developer') {
    router.replace('/unauthorized')
  }

  try {
    isLoading.value = true
    const response = await apiRetrieve(route.params.id as string)
    if (response) {
      form.data._id = response._id
      form.data.name = response.name
      form.data.client_id = response.client_id
      form.data.client_secret = response.client_secret
      form.data.authorized_origins = response.authorized_origins
      form.data.authorized_redirect_uris = response.authorized_redirect_uris
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <base-card v-if="isLoading"><base-loader type="classic" sample="2" /></base-card>
  <div v-else class="content-container">
    <card-breadcrumbs />
    <card-actions v-model:data="form.data" />
    <card-form v-model:data="form.data" />
    <card-authorized-origins v-model:data="form.data" />
    <card-authorized-redirect-uris v-model:data="form.data" />
  </div>
</template>
