<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

import { useAuthStore } from '@/stores/auth.store'

import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import CardPassword from './card-password.vue'
import { useForm } from './form'
import { useGetUserApi } from './retrieve.api'

const authStore = useAuthStore()
const getUserApi = useGetUserApi()

const form = reactive(useForm())
const formId = ref()

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
</script>

<template>
  <div class="flex flex-col gap-4">
    <card-breadcrumbs />

    <card-form />

    <card-password
      :form-id="authStore._id"
      v-model:username="form.data.username"
      v-model:email="form.data.email"
      v-model:name="form.data.name"
      v-model:role="form.data.role"
      :errors="form.errors"
    />
  </div>
</template>
