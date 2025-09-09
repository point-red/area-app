import { apiRequest } from '@/utils/api'

export const verifyEmailApiRequest = async (code: string) => {
  return await apiRequest.post('/v1/auth/verify-email', {
    code: code
  })
}
