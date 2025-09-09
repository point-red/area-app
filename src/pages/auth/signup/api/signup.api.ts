import { apiRequest } from '@/utils/api'

import type { IForm } from '../form'

export const signupApiRequest = async (data: IForm) => {
  return await apiRequest.post('/v1/auth/signup', {
    name: data.name,
    username: data.username,
    email: data.email,
    password: data.password
  })
}
