<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <base-card class="py-3! gap-0!">
    <div class="flex gap-2 overflow-auto">
      <base-button variant="filled" color="info" size="sm">
        <base-icon class="flex-0" icon="i-fal-rectangle-history-circle-user" /> <span>Events</span>
      </base-button>
      <router-link :to="`/master/areas/create`">
        <base-button variant="filled" color="info" size="sm">
          <base-icon class="flex-0" icon="i-fal-file-plus" /> <span>Create</span>
        </base-button>
      </router-link>
      <router-link :to="`/master/areas/${route.params.id}/edit`">
        <base-button variant="filled" color="info" size="sm">
          <base-icon class="flex-0" icon="i-fal-file-pen" /> <span>Edit</span>
        </base-button>
      </router-link>
      <base-button variant="filled" color="danger" size="sm">
        <base-icon class="flex-0" icon="i-fal-trash-xmark" /> <span>Delete</span>
      </base-button>
      <base-button variant="filled" color="danger" size="sm"
        v-tooltip="'Archived data cannot be retrieved in another form'">
        <base-icon class="flex-0" icon="i-fal-box-archive" /> <span>Archive</span>
      </base-button>
      <base-button variant="filled" color="success" size="sm">
        <base-icon class="flex-0" icon="i-fal-box-open" /> <span>Restore</span>
      </base-button>
    </div>
  </base-card>
</template>

<style scoped lang="postcss"></style>
