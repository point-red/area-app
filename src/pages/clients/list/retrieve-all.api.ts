import { apiRequest } from '@/utils/api'

export interface IData {
  _id: string
  name: string
  client_id: string
}

interface IResponse {
  data: IData[]
  pagination: IPagination
}

// Use a shared controller that can be replaced
let controller: AbortController | null = null

export const apiRetrieveAll = async (query: IQuery): Promise<IResponse> => {

  // Abort the previous request if it exists
  if (controller) {
    controller.abort()
  }

  // Create a new AbortController for this request
  controller = new AbortController()

  const response = await apiRequest.get('/v1/clients', { 
    params: {
      filter: query.filter,
      page: query.page || 1,
      page_size: query.page_size || 10,
      sort: query.sort || '-_id'
    },
    signal: controller.signal
  })

  return response.data
}
