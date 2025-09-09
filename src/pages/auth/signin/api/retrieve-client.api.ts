import { apiRequest } from '@/utils/api'

export const apiRetrieveClient = async (client_id: string) => {
  const response = await apiRequest.get('/v1/clients', {
    params: {
      filter: {
        client_id: client_id
      }
    }
  })

  return response.data[0] ?? undefined
}
