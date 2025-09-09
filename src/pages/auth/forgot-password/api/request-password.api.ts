import { apiRequest } from '@/utils/api'

export const requestPasswordApiRequest = async (email: string) => {
  return await apiRequest.post('/v1/auth/request-password', {
    email: email
  })
}
