import { apiRequest } from '@/utils/api'

export const resetPasswordApiRequest = async (data: { code: string; password: string }) => {
  const response = await apiRequest.post('/v1/auth/reset-password', {
    code: data.code,
    password: data.password
  })

  if (response.status === 200) {
    return {
      matched_count: response.data.matched_count,
      modified_count: response.data.modified_count
    }
  }
}
