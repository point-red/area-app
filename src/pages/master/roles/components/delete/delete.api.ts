import { apiRequest } from '@/utils/api'

export const deleteRoleApi = async (_id: string) => {
  const response = await apiRequest.delete(`/v1/master/roles/${_id}`)
  if (response.status === 200) {
    return response
  }
}
