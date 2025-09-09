<script setup lang="ts">
import { computed } from 'vue'

import { type IForm } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    age: '',
    nationality: undefined,
    notes: ''
  })
})

const nationalityLabel = computed(() => data.value.nationality?.label ?? '')
</script>

<template>
  <base-card>
    <template #header>Areas</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input-number layout="horizontal" label="Age" readonly v-model="data.age" align="left" border="full" />
      <base-input layout="horizontal" label="Nationality" readonly v-model="nationalityLabel" border="full" />
      <base-textarea layout="horizontal" label="Notes" readonly :min-height="128" v-model="data.notes" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
