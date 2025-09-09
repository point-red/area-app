import { apiRequest } from '@/utils/api'

export const deleteAreaApi = async (_id: string) => {
  const response = await apiRequest.delete(`/v1/master/areas/${_id}`)
  if (response.status === 200) {
    return response
  }
}
