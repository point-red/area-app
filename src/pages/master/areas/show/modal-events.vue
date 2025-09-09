<script setup lang="ts">
import { ref } from 'vue'

import { useTableFilter } from '@/composables/table-filter'

const showModalEvent = defineModel<boolean>('is-open', { default: false })
const { filter, resetFilter, sort, sortObjectToString, toggleSort, pagination, resetPagination } = useTableFilter({
  initialFilter: {
    date: '',
    by: '',
    event: '',
    notes: ''
  },
  initialSortKeys: {
    date: 0,
    by: 0,
    event: 0,
    notes: 0
  }
})

const isLoading = ref(false)
const onPageUpdate = async () => {
  //
}

</script>

<template>
  <base-modal size="2xl" :is-open="showModalEvent" @on-close="showModalEvent = false">
    <div class="max-h-90vh overflow-auto p-4">
      <h1>Events</h1>
      <div class="flex flex-col gap-2 my-5">
        <base-table>
          <thead>
            <tr>
              <th>Date</th>
              <th>By</th>
              <th>Event</th>
              <th>Notes</th>
            </tr>
            <tr class="bg-slate-100 dark:bg-slate-700">
              <th><base-input v-model="filter.date" placeholder="Search..." :disabled="isLoading" border="none" /></th>
              <th><base-input v-model="filter.by" placeholder="Search..." :disabled="isLoading" border="none" /></th>
              <th><base-input v-model="filter.name" placeholder="Search..." :disabled="isLoading" border="none" /></th>
              <th><base-input v-model="filter.notes" placeholder="Search..." :disabled="isLoading" border="none" /></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 40">
              <td>21 Jun 2025, 12:14</td>
              <td>Martien</td>
              <td>Update</td>
            </tr>
            <tr>
              <td>20 Jun 2025, 12:24</td>
              <td>Martien</td>
              <td>Create</td>
            </tr>
          </tbody>
        </base-table>
        <base-pagination v-if="!isLoading" v-model="pagination.page" :page-size="pagination.page_size" :total-document="pagination.total_document" @update:model-value="onPageUpdate()" />
      </div>
    </div>
  </base-modal>
</template>

<style scoped lang="postcss"></style>
