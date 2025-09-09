<script setup lang="ts">
import { type IForm } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    authorized_redirect_uris: '',
  })
})
</script>

<template>
  <base-card>
    <template #header>Authorized Redirect Uris</template>

    <div class="flex flex-col gap-4 my-5">
      <base-table>
        <thead>
          <tr>
            <th>#</th>
            <th class="w-full">Authorized Redirect Uris</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uri, index) in data.authorized_redirect_uris" :key="uri">
            <td>{{ index + 1 }}</td>
            <td>{{ uri }}</td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
