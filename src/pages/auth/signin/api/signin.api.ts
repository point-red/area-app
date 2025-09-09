import { apiRequest } from '@/utils/api'

import type { IForm } from '../form'

export const signinApiRequest = async (data: IForm) => {
  const response = await apiRequest.post('/v1/auth/signin', {
    username: data.username,
    password: data.password,
    remember_me: data.remember_me
  })

  return {
    _id: response.data._id,
    email: response.data.email,
    username: response.data.username,
    name: response.data.name,
    tokens: {
      token_type: response.data.tokens.token_type,
      access_token: response.data.tokens.access_token,
      refresh_token: response.data.tokens.refresh_token
    }
  }
}
