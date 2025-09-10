<script setup lang="ts">
import { type IForm } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    username: '',
    email: '',
    notes: ''
  })
})
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" label="Name" readonly v-model="data.name" border="full" />
      <base-input layout="horizontal" label="Username" readonly v-model="data.username" border="full" />
      <base-input layout="horizontal" label="Email" readonly v-model="email" border="full" />
      <base-textuser layout="horizontal" label="Notes" readonly :min-height="128" v-model="data.notes" border="full" />
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
