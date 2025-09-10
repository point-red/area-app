import { apiRequest } from '@/utils/api'

interface IResponse {
  _id: string
  name: string
  age: string
  nationality: {
    label: string
    value: string
  }
  notes: string
}

export const apiRetrieve = async (_id: string): Promise<IResponse> => {
  const response = await apiRequest.get(`/v1/master/roles/${_id}`)

  return response.data
}
