import { reactive } from 'vue'

export interface IForm {
  _id?: string
  name?: string
  client_id?: string
  client_secret?: string
  authorized_redirect_uris?: string[]
  authorized_origins?: string[]
}

export interface IFormError {
  name: string[]
  client_id: string[]
  client_secret: string[]
  authorized_redirect_uris: string[]
  authorized_origins: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    _id: '',
    name: '',
    client_id: '',
    client_secret: '',
    authorized_redirect_uris: [],
    authorized_origins: [],
  }

  const defaultFormError: IFormError = {
    name: [],
    client_id: [],
    client_secret: [],
    authorized_redirect_uris: [],
    authorized_origins: [],
  }

  const data = reactive<IForm>(defaultForm)
  const errors = reactive<IFormError>(defaultFormError)

  const reset = () => {
    Object.assign(data, defaultForm)
    Object.assign(errors, defaultFormError)
  }

  return { data, errors, reset }
}
