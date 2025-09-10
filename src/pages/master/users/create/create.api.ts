import { apiRequest } from '@/utils/api'

import type { IForm } from './form'

interface IResponse {
  inserted_id: string
}

export const apiCreate = async (data: IForm): Promise<IResponse> => {
  const response = await apiRequest.post('/v1/users', data)

  return response.data
}
