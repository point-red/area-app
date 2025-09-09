import { apiRequest } from '@/utils/api'

interface IResponse {
  name: string
  age: string
  nationality: {
    label: string
    value: string
  }
  notes: string
}

export const apiRetrieve = async (_id: string): Promise<IResponse> => {
  const response = await apiRequest.get(`/v1/master/areas/${_id}`)

  return response.data
}
