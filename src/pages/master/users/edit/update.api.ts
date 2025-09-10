import { apiRequest } from '@/utils/api'

import type { IForm } from './form'

interface IResponse {
  matched_count: string
  modified_count: string
}

export const apiUpdate = async (id: string, data: IForm): Promise<IResponse> => {
  const response = await apiRequest.patch(`/v1/users/${id}`, data)

  return response.data
}
