import { apiRequest } from '@/utils/api'

export const deleteClientApi = async (_id: string) => {
  const response = await apiRequest.delete(`/v1/clients/${_id}`)
  if (response.status === 200) {
    return response
  }
}
