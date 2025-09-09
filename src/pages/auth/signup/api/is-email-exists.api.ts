import { apiRequest } from '@/utils/api'

export const isEmailExistsApiRequest = async (email: string) => {
  return await apiRequest.post('/v1/auth/is-email-exists', { email })
}
