<script setup lang="ts">
import { ref } from 'vue'

import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import { deleteAreaApi } from './delete.api'
import { useForm } from './form'

const props = withDefaults(defineProps<{
  requirePassword?: boolean
}>(), {
  requirePassword: false
})

const form = useForm()

const _id = defineModel<string>('_id')
const label = defineModel<string>('label')
const emit = defineEmits(['deleted'])

interface IData {
  _id: string
  label: string
}

const showModal = ref(false)
const toggleModal = (state?: boolean, data?: IData) => {
  if (data) {
    _id.value = data._id
    label.value = data.label
  }
  let newValue = !showModal.value
  if (state === true) {
    newValue = true
    isDeleting.value = false
  }
  if (state === false) newValue = false
  showModal.value = newValue
}

const isDeleting = ref(false)
const onDelete = async () => {
  // prevent calling twice use loading state
  if (isDeleting.value) return
  // optional to require password
  if (props.requirePassword && form.data.password === '') {
    form.errors.password = ['Password is required.']
    return
  }
  try {
    // start loading state
    isDeleting.value = true
    // start api call
    const responseDelete = await deleteAreaApi(_id.value as string)
    if (!responseDelete) {
      form.data.password = ''
      return
    }
    emit('deleted')
    form.reset()
    toast(`Delete Area "${label.value}" success`, { color: 'success' })
    toggleModal(false)
  } catch (error) {
    const errorResponse = handleError(error)
    if (errorResponse.errors) {
      form.errors.password = errorResponse.errors.password || []
    }
    if (errorResponse.message) {
      toast(errorResponse.message, {
        lists: errorResponse.lists,
        color: 'danger'
      })
    }
  } finally {
    // stop loading state
    isDeleting.value = false
  }
}

defineExpose({
  showModal,
  toggleModal,
  _id,
  label,
  isDeleting
})
</script>

<template>
  <base-modal :is-open="showModal" @on-close="toggleModal(false)">
    <div class="max-h-90vh overflow-auto p-4">
      <h2 class="py-4 text-2xl font-bold">Delete Area</h2>
      <div class="space-y-8">
        <div>
          <p>Are you sure want to delete "<b>{{ label }}</b>"?</p>
          <p>You won’t be able to undo it.</p>
        </div>
        <div class="flex flex-col gap-2">
          <base-input v-if="requirePassword" label="Password" v-model="form.data.password"
            :errors="form.errors.password"
            :helpers="['Please enter your password to make sure this isn’t deleted by accident.']" border="full" />
          <base-textarea label="Reason" v-model="form.data.reason" :errors="form.errors.reason" :min-height="64"
            :helpers="['Leaving a reason helps you remember why you deleted it.']" border="full" />
        </div>
        <div class="flex gap-2">
          <base-button color="danger" size="sm" @click="onDelete()" :disabled="isDeleting"> Confirm </base-button>
          <base-button color="secondary" size="sm" @click="toggleModal(false)">Cancel</base-button>
        </div>
      </div>
    </div>
  </base-modal>
</template>
