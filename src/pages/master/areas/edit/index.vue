<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import router from '@/router'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import CardForm from '../create/card-form.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import { useForm } from './form'
import { apiRetrieve } from './retrieve.api'
import { apiUpdate } from './update.api'

const form = useForm()
const route = useRoute()

const isLoading = ref(false)
const isSaving = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await apiRetrieve(route.params.id as string)
    if (response) {
      form.data.name = response.name
      form.data.age = response.age
      form.data.nationality = response.nationality
      form.data.notes = response.notes
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

const update = async () => {
  try {
    isSaving.value = true
    const response = await apiUpdate(route.params.id as string, form.data)
    if (response?.matched_count) {
      toast('Update success', { color: 'success' })
      await router.push(`/master/areas/${route.params.id}`)
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.name = errorResponse.errors.name || []
      form.errors.age = errorResponse.errors.age || []
      form.errors.nationality = errorResponse.errors.nationality || []
      form.errors.notes = errorResponse.errors.notes || []
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
</script>

<template>
  <div class="content-container">
    <card-breadcrumbs />

    <card-form v-model:data="form.data" v-model:errors="form.errors" v-model:is-saving="isSaving" />
    <div class="flex gap-2">
      <base-button :is-loading="isSaving" color="primary" @click="update">Update</base-button>
    </div>
  </div>
</template>
