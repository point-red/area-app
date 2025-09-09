import { apiRequest } from '@/utils/api'

import type { IForm } from './form'

export const updateEmailApi = async (_id: string, data: IForm) => {
  const response = await apiRequest.post(`/v1/users/${_id}/update-email`, data)
  if (response.status === 200) {
    return {
      matched_count: response.data.matched_count,
      modified_count: response.data.modified_count
    }
  }
}
