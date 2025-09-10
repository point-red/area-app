<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { apiRetrieveClient } from './api/retrieve-client.api'
import { signinApiRequest } from './api/signin.api'
import { useForm } from './form'
import { usePassword } from './password'

const form = useForm()
const password = reactive(usePassword())
const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const authorizationParams = ref<{
  response_type: string
  client_id: string
  client_secret: string
  state: string
  redirect_uri: string
}>()
const client = ref<{
  name: string
}>({
  name: ''
})

onMounted(async () => {
  authorizationParams.value = {
    response_type: route.query.response_type as string,
    client_id: route.query.client_id as string,
    client_secret: route.query.client_secret as string,
    state: route.query.state as string,
    redirect_uri: route.query.redirect_uri as string,
  }

  const response = await apiRetrieveClient(authorizationParams.value.client_id)

  if (response) {
    client.value.name = response.name
  }
})

const isLoading = ref(false)
const onSubmit = async () => {
  try {
    isLoading.value = true
    // const response = await signinApiRequest(form.data.value)
    const response = {
      name: form.data.value.username
    }
    if (response) {
      authStore.update(response)
      router.push('/')
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value.username = errorResponse.errors.username || []
      form.errors.value.password = errorResponse.errors.password || []
      return
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger',
        timer: 5000
      })
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <base-card class="max-w-xl">
    <div v-if="false">
      <h1>Invalid Request</h1>
      You can’t sign in because this app sent an invalid request. You can try again later, or
      contact the developer about this issue.
    </div>
    <form v-else @submit.prevent="onSubmit" class="flex flex-col gap-8 relative">
      <div class="flex flex-col gap-4">
        <div class="-mt-4">
          <h3 class="font-semibold">Sign in with Pointhub</h3>
          to continue to <a href="#" target="_blank" class="text-blue-600">Pointhub Auth Service</a>
        </div>

        <div class="flex flex-col gap-4">
          <base-input data-testid="input-username" required autofocus :disabled="isLoading"
            v-model="form.data.value.username" :errors="form.errors.value.username" label="Username / Email"
            layout="vertical" />
          <base-input data-testid="input-password" required :disabled="isLoading" :type="password.type"
            v-model="form.data.value.password" :errors="form.errors.value.password" label="Password" layout="vertical">
            <template #suffix>
              <BaseButton @click="password.toggle" variant="text" color="secondary">
                <BaseIcon icon="i-far-eye" />
              </BaseButton>
            </template>
          </base-input>
          <div class="flex justify-between">
            <base-checkbox v-model="form.data.value.remember_me" text="Remember Me" :disabled="isLoading" />
            <router-link to="/forgot-password">Forgot Password</router-link>
          </div>
          <div>
            <base-button data-testid="button-signin" type="submit" is-block :is-loading="isLoading" color="primary">
              Sign In
            </base-button>
          </div>
        </div>
      </div>
    </form>
  </base-card>
</template>

<style scoped lang="postcss"></style>
