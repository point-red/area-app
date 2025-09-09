<script setup lang="ts">
import { type IForm } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
  })
})
</script>

<template>
  <base-card>
    <template #header>Clients</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input layout="horizontal" label="Client ID" readonly v-model="data.client_id" border="full" />
      <base-input layout="horizontal" label="Client Secret" readonly v-model="data.client_secret" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
