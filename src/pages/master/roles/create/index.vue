<script setup lang="ts">
import { ref } from 'vue'

import router from '@/router'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { apiCreate } from './create.api'
import { useForm } from './form'

const form = useForm()

const isSaving = ref(false)

const save = async () => {
  try {
    isSaving.value = true
    const response = await apiCreate(form.data)
    if (response?.inserted_id) {
      toast('Create success', { color: 'success' })
      await router.push(`/master/roles/${response.inserted_id}`)
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
      <base-button :is-loading="isSaving" color="primary" @click="save">Save</base-button>
    </div>
  </div>
</template>
