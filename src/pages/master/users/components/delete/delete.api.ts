import { apiRequest } from '@/utils/api'

export const deleteUserApi = async (_id: string) => {
  const response = await apiRequest.delete(`/v1/users/${_id}`)
  if (response.status === 200) {
    return response
  }
}
