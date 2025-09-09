<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { verifyEmailApiRequest } from './api/verify-email.api'
import VerifySuccess from './components/verify-success.vue'
import { useForm } from './form'

const route = useRoute()

const form = useForm()

form.data.value.code = route.query.code?.toString() ?? ''

const isVerifySuccess = ref<boolean>(false)
const email = ref()

const onSubmit = async () => {
  try {
    const response = await verifyEmailApiRequest(form.data.value.code)
    if (response.status === 200) {
      form.reset()
      email.value = response.data.email
      isVerifySuccess.value = true
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.code = errorResponse.errors.code || []
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
  <base-card class="max-w-xl" v-if="!isVerifySuccess">
    <form @submit.prevent="onSubmit" class="flex flex-col gap-8">
      <div class="flex flex-col gap-4">
        <base-input v-model="form.data.value.code" :errors="form.errors.value.code" label="Code" layout="vertical"
          autofocus />
      </div>
      <base-button type="submit" color="primary">Verify Email</base-button>
    </form>
  </base-card>
  <verify-success :email="email" v-else />
</template>
