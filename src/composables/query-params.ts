import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'


export function useQueryParams() {
  const route = useRoute()
  const router = useRouter()

  const flattenQuery = (query: Record<string, string | number | Record<string, unknown>>) => {
    const result: Record<string, string> = {}

    for (const key in query) {
      const value = query[key]

      if (value && typeof value === 'object' && !Array.isArray(value)) {
        for (const nestedKey in value) {
          result[`${key}[${nestedKey}]`] = String(value[nestedKey])
        }
      } else {
        result[key] = value !== '' ? String(value) : ''
      }
    }

    return result
  }  

  const updateQueryParams = async (query: Record<string, string | number | Record<string, unknown>>) => {
    const newQuery = flattenQuery(query)

    const mergedQuery = {
      ...route.query,
      ...newQuery
    }

    const cleanedQuery = Object.fromEntries(
      Object.entries(mergedQuery).filter(([key, value]) =>
        value !== '' && !(key === 'page' && value === '1')
      )
    )
  
    await router.push({ query: cleanedQuery })
  }
  
  function applyQueryParams(
    query: Record<string, unknown>,
    filter: Record<string, string>,
    sort: Record<string, 1 | 0 | -1>,
    pagination: IPagination,
    pageSize: Ref<{ size: number; label: string }>,
    pageSizeOptions: { size: number; label: string }[],
    columns: Record<string, { isVisible: boolean; isSelectable: boolean }>,
    skipNextFilterWatch: Ref<boolean>
  ) {
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value !== 'string') return

      if (key.startsWith('filter[') && key.endsWith(']')) {
        const field = key.slice(7, -1).trim()
        if (field) {
          skipNextFilterWatch.value = true
          filter[field] = value
        }
        return
      }

      switch (key) {
      case 'sort':
        value.split(',').forEach(entry => {
          const direction = entry.startsWith('-') ? -1 : 1
          const fieldName = entry.replace(/^[-+]/, '')
          sort[fieldName] = direction
        })
        break

      case 'page':
        pagination.page = parseInt(value) || 1
        break

      case 'page-size':
        pagination.page_size = parseInt(value) || 10
        pageSize.value = pageSizeOptions.find(option => option.size === pagination.page_size) ?? pageSizeOptions[0]
        break

      case 'columns':
        const visible = value.split(',').map(col => col.trim())
        Object.entries(columns).forEach(([colKey, colVal]) => {
          if (colVal.isSelectable) {
            colVal.isVisible = visible.includes(colKey)
          }
        })
        break
      }
    })
  }

  return { updateQueryParams, applyQueryParams }
}
