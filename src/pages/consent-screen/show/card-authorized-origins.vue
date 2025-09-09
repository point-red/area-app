<script setup lang="ts">
import { type IForm } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    authorized_origins: '',
  })
})
</script>

<template>
  <base-card>
    <template #header>Authorized Origins</template>

    <div class="flex flex-col gap-4 my-5">
      <base-table>
        <thead>
          <tr>
            <th>#</th>
            <th class="w-full">Authorized Origins</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uri, index) in data.authorized_origins" :key="uri">
            <td>{{ index + 1 }}</td>
            <td>{{ uri }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
