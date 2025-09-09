import { apiRequest } from '@/utils/api'

export function useGetUserApi() {
  const send = async (_id: string) => {
    try {
      const response = await apiRequest.get(`/v1/users/${_id}`)

      return {
        _id: response.data._id,
        username: response.data.username,
        email: response.data.email,
        name: response.data.name
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { send }
}
