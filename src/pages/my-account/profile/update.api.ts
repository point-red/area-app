import { apiRequest } from '@/utils/api'

import type { IForm } from './form'

export const updateUserApi = async (_id: string, data: IForm) => {
  const response = await apiRequest.patch(`/v1/users/${_id}`, data)
  if (response.status === 200) {
    return {
      matched_count: response.data.matched_count,
      modified_count: response.data.modified_count
    }
  }
}
