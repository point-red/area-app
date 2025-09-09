import { reactive } from 'vue'

export interface IForm {
  name?: string
  authorized_origins: string[]
  authorized_redirect_uris: string[]
}

export interface IFormError {
  name: string[]
  authorized_origins: string[]
  authorized_redirect_uris: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    name: '',
    authorized_origins: [],
    authorized_redirect_uris: []
  }

  const defaultFormError: IFormError = {
    name: [],
    authorized_origins: [],
    authorized_redirect_uris: []
  }

  const data = reactive<IForm>(defaultForm)
  const errors = reactive<IFormError>(defaultFormError)

  const reset = () => {
    Object.assign(data, defaultForm)
    Object.assign(errors, defaultFormError)
  }

  return { data, errors, reset }
}
