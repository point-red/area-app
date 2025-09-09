<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import CardAuthorizedOrigins from './card-authorized-origins.vue'
import CardAuthorizedRedirectUris from './card-authorized-redirect-uris.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { apiCreate } from './create.api'
import { useForm } from './form'

const form = useForm()
const router = useRouter()
const authStore = useAuthStore()

const isSaving = ref(false)

const save = async () => {
  try {
    isSaving.value = true
    const response = await apiCreate(form.data)
    if (response?.inserted_id) {
      toast('Create success', { color: 'success' })
      await router.push(`/clients/${response.inserted_id}`)
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.name = errorResponse.errors.name || []
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  } finally {
    isSaving.value = false
  }
}

onMounted(() => {
  if (authStore.role !== 'developer') {
    router.replace('/unauthorized')
  }
})
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs />

    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-authorized-origins v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <card-authorized-redirect-uris v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />

    <div class="flex gap-2">
      <base-button :is-loading="isSaving" color="primary" @click="save">Save</base-button>
    </div>
  </div>
</template>
