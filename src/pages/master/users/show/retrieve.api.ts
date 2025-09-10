import { apiRequest } from '@/utils/api'

interface IResponse {
  _id: string
  name: string
  username: string
  email: string
  notes: string
}

export const apiRetrieve = async (_id: string): Promise<IResponse> => {
  const response = await apiRequest.get(`/v1/users/${_id}`)

  return response.data
}
