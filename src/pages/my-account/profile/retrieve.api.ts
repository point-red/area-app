import { apiRequest } from '@/utils/api'

export const retrieveUserApi = async (_id: string) => {
  const response = await apiRequest.get(`/v1/users/${_id}`)

  return {
    _id: response.data._id,
    name: response.data.name,
    username: response.data.username,
    email: response.data.email,
    is_email_verified: response.data.is_email_verified,
  }
}
