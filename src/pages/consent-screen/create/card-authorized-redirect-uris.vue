<script setup lang="ts">
import { ref } from 'vue'

import { type IForm, type IFormError } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    authorized_redirect_uris: '',
  })
})
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    authorized_redirect_uris: [],
  })
})
const isSaving = defineModel('is-saving', { default: false })
const uri = ref('')
const addUri = () => {
  if (uri.value.trim() === '') {
    errors.value.authorized_redirect_uris = ['The origin field is required']
    return
  }

  if (!isValidUri(uri.value.trim())) {
    errors.value.authorized_redirect_uris = ['The origin field is not valid uri']
    return
  }

  data.value.authorized_redirect_uris.push(uri.value.trim())
  uri.value = ''
}

const removeUri = (index: number) => {
  data.value.authorized_redirect_uris.splice(index, 1)
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
    <template #header>Authorized Redirect Uris</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required v-model="uri" label="URI" :disabled="isSaving"
        placeholder="https://www.area.com" @keyup.enter="addUri"
        :helpers="['Users will be redirected to this path after they have authenticated with Pointhub. The path will be appended with the authorization code for access, and must have a protocol. It can’t contain URL fragments, relative paths, or wildcards, and can’t be a public IP address.']"
        :errors="errors.authorized_redirect_uris" />

      <base-table>
        <thead>
          <tr>
            <th>#</th>
            <th class="w-full">Authorized Redirect Uris</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(uri, index) in data.authorized_redirect_uris" :key="uri">
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
