<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { useForm } from './form'
import { retrieveUserApi } from './retrieve.api'
import { updateUserApi } from './update.api'

const authStore = useAuthStore()

const form = useForm()
const isSaving = ref(false)

onMounted(async () => {
  const response = await retrieveUserApi(authStore._id)

  if (response) {
    form.data.value._id = response._id
    form.data.value.username = response.username
    form.data.value.name = response.name
  }
})

const onUpdate = async () => {
  try {
    isSaving.value = true
    const response = await updateUserApi(form.data.value._id, form.data.value)
    if (response?.modified_count === 1) {
      toast('Update success', { color: 'success' })
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.username = errorResponse.errors.username || []
      form.errors.value.name = errorResponse.errors.name || []
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
  <base-card>
    <template #header>Profile</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input layout="horizontal" label="Username" required v-model="form.data.value.username"
        :errors="form.errors.value.username" :is-loading="isSaving" />
      <base-input layout="horizontal" label="Name" required v-model="form.data.value.name"
        :errors="form.errors.value.name" :is-loading="isSaving" />
      <div class="flex gap-2 mt-10">
        <base-button color="primary" @click="onUpdate" :is-loading="isSaving">Update</base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
