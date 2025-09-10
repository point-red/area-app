<script setup lang="ts">
import { nationalityOptions } from '../nationalities'
import { type IForm, type IFormError } from './form'

const data = defineModel<IForm>('data', {
  default: () => ({
    name: '',
    notes: ''
  })
})
const errors = defineModel<IFormError>('errors', {
  default: () => ({
    name: [],
    notes: []
  })
})
const isSaving = defineModel('is-saving', { default: false })
</script>

<template>
  <base-card>
    <template #header>Roles</template>

    <div class="flex flex-col gap-4 my-5">
      <base-input layout="horizontal" border="full" required label="Name" :errors="errors.name" :disabled="isSaving" />

      <base-table>
        <thead>
          <tr>
            <th>Permissions</th>
            <th class="text-center">Create</th>
            <th class="text-center">Read</th>
            <th class="text-center">Update</th>
            <th class="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>User</td>
            <td></td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>Role</td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
          </tr>
          <tr>
            <td>Master Area</td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
            <td>
              <div class="flex justify-center"><base-checkbox /></div>
            </td>
          </tr>
        </tbody>
      </base-table>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
