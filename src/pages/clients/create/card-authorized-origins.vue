<script setup lang="ts">
import { ref } from 'vue'

import { type IForm, type IFormError } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    authorized_origins: '',
  })
})
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    authorized_origins: [],
  })
})
const isSaving = defineModel('is-saving', { default: false })
const uri = ref('')
const addUri = () => {
  if (uri.value.trim() === '') {
    errors.value.authorized_origins = ['The origin field is required']
    return
  }

  if (!isValidUri(uri.value.trim())) {
    errors.value.authorized_origins = ['The origin field is not valid uri']
    return
  }

  data.value.authorized_origins.push(uri.value.trim())
  uri.value = ''
}

const removeUri = (index: number) => {
  data.value.authorized_origins.splice(index, 1)
}

const isValidUri = (uri: string) => {
  try {
    new URL(uri)
    return true
  } catch {
    return false
  }
}
</script>

<template>
  <base-card>
    <template #header>Authorized Origins</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required v-model="uri" label="URI" :disabled="isSaving"
        placeholder="https://www.area.com" @keyup.enter="addUri"
        :helpers="['The HTTP origins that host your web application. This value can\'t contain wildcards or paths. If you use a port other than 80, you must specify it.For area: https://area.com:8080']"
        :errors="errors.authorized_origins" />

      <base-table>
        <thead>
          <tr>
            <th>#</th>
            <th class="w-full">Authorized Origins</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uri, index) in data.authorized_origins" :key="uri">
            <td>{{ index + 1 }}</td>
            <td>{{ uri }}</td>
            <td><base-button @click="removeUri(index)" size="none">x</base-button></td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
