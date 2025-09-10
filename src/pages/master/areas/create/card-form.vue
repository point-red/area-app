<script setup lang="ts">
import { nationalityOptions } from '../nationalities'
import { type IForm, type IFormError } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    province: '',
    area_type: undefined,
    area_name: '',
    district: '',
    subdistrict: '',
    target_value: '',
    target_outlet: '',
    notes: ''
  })
})
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    province: [],
    area_type: [],
    area_name: [],
    district: [],
    subdistrict: [],
    target_value: [],
    target_outlet: [],
    notes: []
  })
})
const isSaving = defineModel('is-saving', { default: false })
</script>

<template>
  <base-card>
    <template #header>Areas</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required v-model="data.province" label="Province"
        :errors="errors.province" :disabled="isSaving" />
      <base-select layout="horizontal" border="full" label="Type of Area" required v-model="data.area_type"
        :options="nationalityOptions" :errors="errors.area_type" :disabled="isSaving" placeholder="Select" />
      <base-input layout="horizontal" border="full" required v-model="data.area_name" label="Name of Area"
        :errors="errors.area_name" :disabled="isSaving" />
      <base-input layout="horizontal" border="full" required v-model="data.district" label="District"
        :errors="errors.district" :disabled="isSaving" />
      <base-input layout="horizontal" border="full" required v-model="data.district" label="Subdistrict"
        :errors="errors.subdistrict" :disabled="isSaving" />
      <base-input layout="horizontal" border="full" required v-model="data.district" label="Target Value"
        :errors="errors.target_value" :disabled="isSaving" />
      <base-input layout="horizontal" border="full" required v-model="data.district" label="Target Outlet"
        :errors="errors.target_outlet" :disabled="isSaving" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
