<script setup lang="ts">
import { nationalityOptions } from '../nationalities'
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
    <template #header>Areas</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required v-model="data.name" label="Name" :errors="errors.name"
        :disabled="isSaving" />
      <base-input-number layout="horizontal" border="full" align="left" required v-model="data.age" label="Age"
        :errors="errors.age" :disabled="isSaving" />
      <base-select layout="horizontal" border="full" label="Nationality" required v-model="data.nationality"
        :options="nationalityOptions" :errors="errors.nationality" :disabled="isSaving" placeholder="Select" />
      <base-textarea layout="horizontal" border="full" :min-height="128" v-model="data.notes" label="Notes"
        :errors="errors.notes" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
