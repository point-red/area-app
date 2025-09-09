<script setup lang="ts">
import { type IForm, type IFormError } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    age: '',
    nationality: undefined,
    notes: ''
  })
})
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    name: [],
    age: [],
    nationality: [],
    notes: []
  })
})
const isSaving = defineModel('is-saving', { default: false })
</script>

<template>
  <base-card>
    <template #header>Clients</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required v-model="data.name" label="Name" :errors="errors.name"
        :disabled="isSaving"
        :helpers="['The name of your OAuth 2.0 client. This name is only used to identify the client in the console and will not be shown to end users.']" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
