<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { useForm } from './form'
import { retrieveUserApi } from './retrieve.api'
import { updateEmailApi } from './update-email.api'
import { verifyEmailApi } from './verify-email.api'

const authStore = useAuthStore()

const form = useForm()

const existingEmail = ref()

const retrieveUser = async () => {
  const response = await retrieveUserApi(authStore._id)

  if (response) {
    form.data.value._id = response._id
    form.data.value.email = response.email
    form.data.value.is_email_verified = response.is_email_verified

    existingEmail.value = response.email
  }
}

onMounted(async () => {
  await retrieveUser()
})

const onUpdate = async () => {
  if (existingEmail.value === form.data.value.email) {
    return
  }

  try {
    const response = await updateEmailApi(form.data.value._id, form.data.value)
    if (response?.modified_count === 1) {
      toast('Update success', { color: 'success' })
      await retrieveUser()
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.name = errorResponse.errors.name || []
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  }
}

const SendEmailVerification = async () => {
  try {
    const response = await verifyEmailApi(form.data.value._id, form.data.value)
    if (response?.modified_count === 1) {
      toast('Send email verification success', { color: 'success' })
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.name = errorResponse.errors.name || []
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
    <template #header>Email Account</template>

    <base-input layout="horizontal" label="Email" v-model="form.data.value.email" :errors="form.errors.value.email"
      placeholder="youremail@area.com" :helpers="[
        'Email verification needed to confirming that an email address provided is valid, active, and actually belongs to you.'
      ]">
      <template #suffix>
        <div class="m-1">
          <base-button v-if="form.data.value.is_email_verified" size="xs" variant="light" color="success">
            Verified
          </base-button>
          <base-button v-else size="xs" variant="light" color="danger">
            Not Verified
          </base-button>
        </div>
      </template>
    </base-input>

    <div class="flex gap-2 mt-10">
      <base-button color="primary" @click="onUpdate">Update</base-button>
      <base-button v-if="!form.data.value.is_email_verified" variant="filled" color="info"
        @click="SendEmailVerification">
        <base-icon icon="i-far-envelope" />
        Send Email Verification
      </base-button>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
