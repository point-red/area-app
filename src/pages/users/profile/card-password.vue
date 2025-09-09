<script setup lang="ts">
import { reactive } from 'vue'

import { useAuthStore } from '@/stores/auth.store.ts'
import { toast } from '@/toast.ts'
import { handleError } from '@/utils/api.ts'

import { useForm } from './form-password.ts'
import { usePassword } from './password.ts'
import { useUpdatePasswordApi } from './update-password.api.ts'

const form = useForm()
const passwordStore = reactive(usePassword())

const updatePasswordApi = useUpdatePasswordApi()
const authStore = useAuthStore()

const onUpdate = async () => {
  if ((form.errors.value.password?.length ?? 0) > 0) {
    return toast('Please use strong password', { color: 'danger' })
  }
  if (form.data.value.password !== form.data.value.confirm_password) {
    form.errors.value.confirm_password = []
    form.errors.value.confirm_password.push('Password do not match')
    return toast('Password confirmation not match', { color: 'danger' })
  }

  try {
    const response = await updatePasswordApi.send(authStore._id, form.data.value)
    if (response?.modified_count === 1) {
      form.reset()
      toast('Update success', { color: 'success' })
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.value = {
        password: errorResponse.errors.password || [],
        confirm_password: errorResponse.errors.confirm_password || []
      }
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
    <template #header>Update Password</template>

    <div class="flex flex-col gap-4 mt-5">
      <base-input required :type="passwordStore.type" v-model="form.data.value.password"
        :errors="form.errors?.value.password" label="Password" layout="horizontal" @keyup="form.passwordValidation()"
        :reset-errors-on-update="false">
        <template #suffix>
          <BaseButton @click="passwordStore.toggle" variant="text" color="secondary">
            <BaseIcon icon="i-far-eye" />
          </BaseButton>
        </template>
      </base-input>
      <base-input required :type="passwordStore.type" v-model="form.data.value.confirm_password"
        :errors="form.errors?.value.confirm_password" label="Password Confirmation" layout="horizontal">
        <template #suffix>
          <BaseButton @click="passwordStore.toggle" variant="text" color="secondary">
            <BaseIcon icon="i-far-eye" />
          </BaseButton>
        </template>
      </base-input>

      <div class="flex gap-2">
        <base-button size="xs" color="primary" @click="onUpdate">Update Password</base-button>
      </div>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
