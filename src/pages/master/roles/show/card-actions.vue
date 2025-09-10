<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import deleteModal from '../components/delete/modal-delete.vue'
import type { IForm } from './form'
import ModalEvents from './modal-events.vue'

const route = useRoute()
const router = useRouter()
const showModalEvent = ref(false)
const deleteModalRef = ref()
const role = defineModel<IForm>('data')

/**
 * Opens the delete confirmation modal for a specific role.
 */
const onDeleteModal = () => {
  console.log(role.value)
  deleteModalRef.value.toggleModal(true, {
    _id: role.value?._id,
    label: role.value?.name
  })
}

/**
 * Handler called after a successful deletion.
 * Refreshes the data list.
 */
const onDelete = async () => {
  await router.push('/master/roles')
}
</script>

<template>
  <delete-modal ref="deleteModalRef" @deleted="onDelete" />
  <modal-events v-model:is-open="showModalEvent" />
  <base-card class="py-3! gap-0!">
    <div class="flex gap-2 overflow-auto">
      <base-button variant="outlined" color="primary" size="sm" @click="showModalEvent = true">
        <base-icon class="flex-0" icon="i-fal-files" /> <span>Logs</span>
      </base-button>
      <router-link :to="`/master/roles/create`">
        <base-button variant="outlined" color="primary" size="sm">
          <base-icon class="flex-0" icon="i-fal-file-plus" /> <span>Create</span>
        </base-button>
      </router-link>
      <router-link :to="`/master/roles/${route.params.id}/edit`">
        <base-button variant="outlined" color="primary" size="sm">
          <base-icon class="flex-0" icon="i-fal-file-pen" /> <span>Edit</span>
        </base-button>
      </router-link>
      <base-button @click="onDeleteModal" variant="outlined" color="danger" size="sm">
        <base-icon class="flex-0" icon="i-fal-trash-xmark" /> <span>Delete</span>
      </base-button>
      <base-button variant="outlined" color="danger" size="sm"
        v-tooltip="'Archived data cannot be retrieved in another form'">
        <base-icon class="flex-0" icon="i-fal-box-archive" /> <span>Archive</span>
      </base-button>
      <base-button variant="outlined" color="success" size="sm">
        <base-icon class="flex-0" icon="i-fal-box-open" /> <span>Restore</span>
      </base-button>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
