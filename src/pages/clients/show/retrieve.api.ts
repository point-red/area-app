import { apiRequest } from '@/utils/api'

interface IResponse {
  _id: string
  name: string
  client_id: string
  client_secret: string
  authorized_origins: string[]
  authorized_redirect_uris: string[]
}

export const apiRetrieve = async (_id: string): Promise<IResponse> => {
  const response = await apiRequest.get(`/v1/clients/${_id}`)

  return response.data
}
