<script setup lang="ts">
import { onMounted, reactive } from 'vue'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { useForm } from './form'
import { useGetUserApi } from './retrieve.api'
import { useUpdateUserApi } from './update.api'

const formId = defineModel<string>('form-id')

const getUserApi = useGetUserApi()
const authStore = useAuthStore()

const updateUserApi = useUpdateUserApi()
const form = reactive(useForm())

onMounted(async () => {
  const response = await getUserApi.send(authStore._id)

  if (response) {
    formId.value = response._id
    form.data.username = response.username
    form.data.email = response.email
    form.data.name = response.name
    form.data.role = response.role
  }
})

const onUpdate = async () => {
  try {
    const response = await updateUserApi.send(formId.value ?? '', form.data, form.errors)
    if (response?.modified_count === 1) {
      toast('Update success', { color: 'success' })
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
  }
}
</script>

<template>
  <base-card>
    <template #header>Profile</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required disabled layout="horizontal" v-model="form.data.username" label="Username"
        :errors="form.errors?.username" />
      <base-input required layout="horizontal" disabled v-model="form.data.email" label="Email"
        :errors="form.errors?.email" />
      <base-input required layout="horizontal" v-model="form.data.name" label="Name" :errors="form.errors?.name" />
      <div class="flex gap-2">
        <base-button size="xs" color="primary" @click="onUpdate">Update</base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
