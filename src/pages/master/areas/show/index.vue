<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import CardActions from './card-actions.vue'
import CardBreadcrumbs from './card-breadcrumbs.vue'
import CardForm from './card-form.vue'
import { useForm } from './form'
import { apiRetrieve } from './retrieve.api'

const route = useRoute()
const form = useForm()

const isLoading = ref(false)

onMounted(async () => {
  try {
    isLoading.value = true
    const response = await apiRetrieve(route.params.id as string)
    if (response) {
      form.data._id = response._id
      form.data.name = response.name
      form.data.age = response.age
      form.data.nationality = response.nationality
      form.data.notes = response.notes
    }
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <base-card v-if="isLoading"><base-loader type="classic" sample="2" /></base-card>
  <div v-else class="content-container">
    <card-breadcrumbs />
    <card-actions v-model:data="form.data" />
    <card-form v-model:data="form.data" />
  </div>
</template>
