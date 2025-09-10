<script setup lang="ts">
import { watchDebounced } from '@vueuse/core'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ModalTableSetting from '@/components/modal-table-setting.vue'
import { useQueryParams } from '@/composables/query-params'
import { useTableFilter } from '@/composables/table-filter'
import { useTableSetting } from '@/composables/table-setting'
import { toast } from '@/toast'
import { handleError } from '@/utils/api'

import ModalDelete from '../components/delete/modal-delete.vue'
import { apiRetrieveAll, type IData } from './retrieve-all.api'

/**
 * Setup table columns and visibility state using the useTableSetting composable.
 * - name: visible and not selectable
 * - username and email: visible and selectable
 */
const {
  isOpen, open, close,
  columns,
  visibleColumns,
  countVisibleColumns,
  pageSize,
  pageSizeOptions,
  resetTableSetting
} = useTableSetting({
  columns: {
    name: { label: 'Name', isVisible: true, isSelectable: false },
    username: { label: 'Username', isVisible: true, isSelectable: true },
    email: { label: 'Email', isVisible: true, isSelectable: true }
  }
})

/**
 * Setup filtering, sorting, and pagination state using the useTableFilter composable.
 * - initial filters for all, name, username, email are empty
 * - initial sort keys all set to 0 (no sort)
 */
const {
  filter,
  resetFilter,
  sort,
  sortObjectToString,
  toggleSort,
  pagination,
  resetPagination
} = useTableFilter({
  initialFilter: {
    all: '',
    name: '',
    username: '',
    email: ''
  },
  initialSortKeys: {
    name: 0,
    username: 0,
    email: 0
  }
})

/**
 * Utilities for updating query parameters in the URL.
 */
const { updateQueryParams, applyQueryParams } = useQueryParams()
const route = useRoute()
const router = useRouter()

/**
 * Reactive references for:
 * - users data retrieved from API
 * - loading state
 * - control flags to prevent unnecessary watcher triggers
 */
const users = ref<IData[]>()
const isInitialSetup = ref(true)
const isLoading = ref(false)
const skipNextFilterWatch = ref(false)

/**
 * References for dynamic UI components like row menus and delete modal.
 */
const rowMenuRef = ref()
const deleteModalRef = ref()

/**
 * Function triggered when pagination page changes.
 * Fetches new data for the updated page and updates query params.
 */
const onPageUpdate = async () => {
  if (!isInitialSetup.value) {
    await getUsers(pagination.page)
    await updateQueryParams({ 'page': pagination.page.toString() })
  }
}

/**
 * Reset pagination to first page and fetch data accordingly.
 */
const resetPageAndFetch = async () => {
  pagination.page = 1
  await updateQueryParams({ page: 1 })
  await getUsers()
}

/**
 * Fetch data from API based on current filters, sorting, and pagination.
 * Manages loading state and error handling with user notifications.
 * @param page - Current page number to fetch (default 1)
 */
const getUsers = async (page = 1) => {
  try {
    isLoading.value = true
    const response = await apiRetrieveAll({
      filter: filter,
      sort: sortObjectToString(sort),
      page,
      page_size: pagination.page_size
    })
    users.value = response.data
    Object.assign(pagination, response.pagination)
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
}

/**
 * Handler to reset all filters, sorting, pagination, and table settings.
 * Clears URL query parameters and fetches default data.
 */
const onResetFilter = async () => {
  isInitialSetup.value = true
  skipNextFilterWatch.value = true

  // Clear all query params from URL
  await router.push({ query: undefined })

  // Reset pagination, table settings, filter, and sort states
  resetPagination(pageSize.value.size)
  resetTableSetting()
  resetFilter()

  // Fetch data without any filters applied
  await getUsers()

  isInitialSetup.value = false
}

/**
 * Opens the delete confirmation modal for a specific user.
 * Also closes the row menu popover.
 * @param user - The data row to delete
 * @param index - Index of the row for UI references
 */
const onDeleteModal = (user: IData, index: number) => {
  rowMenuRef.value[index].toggle(false)
  deleteModalRef.value.toggleModal(true, {
    _id: user._id,
    label: `${user.name}`
  })
}

/**
 * Handler called after a successful deletion.
 * Refreshes the data list.
 */
const onDeleted = async () => {
  await getUsers()
}

/**
 * Lifecycle hook: runs when component is mounted.
 * Applies query params to state and fetches initial data.
 */
onMounted(async () => {
  isInitialSetup.value = true

  // Set initial page size from table setting
  pagination.page_size = pageSize.value.size

  // Apply query params from route to filter, sort, pagination, columns
  applyQueryParams(
    route.query,
    filter,
    sort,
    pagination,
    pageSize,
    pageSizeOptions,
    columns,
    skipNextFilterWatch
  )


  // Fetch initial data
  await getUsers(pagination.page)

  isInitialSetup.value = false
})

/**
 * Watcher for filter changes with debounce to reduce API calls.
 * Resets page to 1 and fetches data on filter change.
 * Skips if flagged to prevent API calls on initial setup or manual resets.
 */
watchDebounced(filter, async () => {
  if (skipNextFilterWatch.value) {
    skipNextFilterWatch.value = false
    return
  }
  if (!isInitialSetup.value) {
    await updateQueryParams({ filter: filter })
    await resetPageAndFetch()
  }
}, { debounce: 500, maxWait: 1000 })

/**
 * Watcher for page size changes.
 * Updates pagination and query params, then fetches data.
 */
watch(pageSize, async () => {
  if (!isInitialSetup.value) {
    pagination.page_size = pageSize.value.size
    await updateQueryParams({ 'page-size': pagination.page_size.toString() })
    await resetPageAndFetch()
  }
})

/**
 * Watcher for visible columns changes.
 * Updates query params to reflect visible columns.
 */
watch(visibleColumns, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ 'columns': visibleColumns.value })
  }
})

/**
 * Watcher for sort state changes.
 * Updates query params and fetches data accordingly.
 */
watch(sort, async () => {
  if (!isInitialSetup.value) {
    await updateQueryParams({ sort: sortObjectToString(sort) })
    await resetPageAndFetch()
  }
})
</script>

<template>
  <base-card>
    <template #header>Users</template>

    <div class="my-5 flex gap-2">
      <!-- Button to navigate to create new user page -->
      <base-input v-model="filter.all" :readonly="isLoading" placeholder="Search..." border="full" class="w-full" />

      <!-- Reset filters button -->
      <base-button color="info" class="gap-1" @click="onResetFilter()" :disabled="isLoading" v-tooltip="'Reset Filter'">
        <base-icon class="i-far-arrows-rotate" />
      </base-button>

      <!-- Open table settings modal -->
      <!-- <base-button color="info" class="gap-1" @click="open()" :disabled="isLoading" v-tooltip="'Table Setting'">
        <base-icon class="i-far-gear" />
      </base-button> -->
    </div>

    <div class="flex flex-col gap-4">
      <base-table>
        <thead>
          <tr>
            <th class="w-1"></th>
            <!-- Render visible column headers with sortable buttons -->
            <template v-for="(column, key) in columns">
              <th :key="key" v-if="columns[key]?.isVisible">
                <div class="flex items-center gap-2">
                  <base-button size="xs" class="p-0!" @click="toggleSort(key)">
                    <base-icon v-if="sort[key] === 0" icon="i-fas-sort" />
                    <base-icon v-if="sort[key] === 1" icon="i-fas-sort-up" />
                    <base-icon v-if="sort[key] === -1" icon="i-fas-sort-down" />
                  </base-button>
                  <span>{{ column.label }}</span>
                </div>
              </th>
            </template>
          </tr>

          <tr class="bg-slate-100 dark:bg-slate-700">
            <th class="w-1"></th>

            <!-- Render filter inputs for visible columns -->
            <th v-if="columns['name']?.isVisible">
              <base-input v-model="filter.name" placeholder="Search..." :readonly="isLoading" border="none" />
            </th>
            <th v-if="columns['username']?.isVisible">
              <base-input v-model="filter.username" placeholder="Search..." :readonly="isLoading" border="none" />
            </th>
            <th v-if="columns['email']?.isVisible">
              <base-input v-model="filter.email" placeholder="Search..." :readonly="isLoading" border="none" />
            </th>
          </tr>
        </thead>

        <tbody>
          <!-- Loading state with loader spanning all columns -->
          <tr v-if="isLoading">
            <td :colspan="countVisibleColumns + 1">
              <p class="w-full h-32 flex items-center justify-center gap-2 text-center text-xl">
                <base-loader type="classic" sample="2" />
              </p>
            </td>
          </tr>

          <!-- Show no data found message if no users and query params exist -->
          <tr v-if="!isLoading && users?.length === 0 && route.query">
            <td :colspan="countVisibleColumns + 1">
              <div class="w-full flex-col p-10 items-center justify-center gap-2 text-center">
                <p class="text-xl">Data Not Found</p>
                <base-button @click="onResetFilter" variant="filled" color="primary" size="xs" shape="pill"
                  class="my-2">
                  Reset Filter
                </base-button>
              </div>
            </td>
          </tr>

          <!-- Render rows of user data when available -->
          <template v-if="!isLoading && users && users.length > 0">
            <tr v-for="(user, index) in users" :key="index">
              <td>
                <!-- Row action menu -->
                <base-popover placement="bottom" ref="rowMenuRef">
                  <base-button size="xs" @click="rowMenuRef[index].toggle()">
                    <base-icon class="text-xl" icon="i-fal-pen-to-square" />
                  </base-button>
                  <template #content>
                    <base-card class="p-0! gap-0!">
                      <div class="flex flex-col">
                        <router-link :to="`/master/users/${user._id}`">
                          <base-button variant="text" color="info"
                            class="w-full py-1! px-3! m-0! flex items-center justify-start text-left!">
                            <base-icon class="flex-0" icon="i-fal-book-open-cover" />
                            <p class="flex-1">View</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <router-link :to="`/master/users/${user._id}/edit`">
                          <base-button variant="text" color="info"
                            class="w-full py-1! px-3! m-0! flex items-center justify-start text-left!">
                            <base-icon class="flex-0" icon="i-fal-file-pen" />
                            <p class="flex-1">Edit</p>
                          </base-button>
                        </router-link>
                        <base-divider orientation="vertical" class="my-0!" />
                        <base-button @click="onDeleteModal(user, index)" variant="text" color="danger"
                          class="w-full py-1! px-3! m-0! flex items-center justify-start text-left!">
                          <base-icon class="flex-0" icon="i-fal-trash-xmark" />
                          <p class="flex-1">Delete</p>
                        </base-button>
                      </div>
                    </base-card>
                  </template>
                </base-popover>
              </td>

              <!-- User fields rendered conditionally based on column visibility -->
              <td v-if="columns['name']?.isVisible">
                <router-link :to="`/master/users/${user._id}`" class="text-blue">{{ user.name }}</router-link>
              </td>
              <td v-if="columns['username']?.isVisible">{{ user.username }}</td>
              <td v-if="columns['email']?.isVisible">{{ user.email }}</td>
            </tr>
          </template>
        </tbody>
      </base-table>

      <!-- Pagination component with two-way binding to pagination.page -->
      <base-pagination v-if="!isLoading" v-model="pagination.page" :page-size="pagination.page_size"
        :total-document="pagination.total_document" @update:model-value="onPageUpdate()" />
    </div>

    <!-- Delete confirmation modal -->
    <modal-delete ref="deleteModalRef" @deleted="onDeleted" />
  </base-card>

  <!-- Table Setting modal -->
  <modal-table-setting :is-open="isOpen" :columns="columns" :page-size="pageSize" :page-size-options="pageSizeOptions"
    @update:close="close" @update:pageSize="val => { pageSize = val }" />
</template>

<style scoped lang="postcss"></style>
