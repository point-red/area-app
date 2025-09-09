import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IAuth {
  _id?: string
  name?: string
  username?: string
  email?: string
  permissions?: string[]
  role?: string
}

export const useAuthStore = defineStore('auth-store', () => {
  const _id = ref()
  const name = ref()
  const username = ref()
  const email = ref()
  const permissions = ref()
  const role = ref()

  const update = (auth: IAuth) => {
    if (auth._id) _id.value = auth._id
    if (auth.name) name.value = auth.name
    if (auth.username) username.value = auth.username
    if (auth.email) email.value = auth.email
    if (auth.permissions) permissions.value = auth.permissions
    if (auth.role) role.value = auth.role
  }

  return {
    _id,
    name,
    username,
    email,
    permissions,
    role,
    update
  }
})
