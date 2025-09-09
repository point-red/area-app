import { ref } from 'vue'

export interface IForm {
  _id: string
  name: string
  username: string
  email: string
  is_email_verified: boolean
}

export interface IFormError {
  _id: string[]
  name: string[]
  username: string[]
  email: string[]
  is_email_verified: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    _id: '',
    name: '',
    username: '',
    email: '',
    is_email_verified: false
  }

  const defaultFormError: IFormError = {
    _id: [],
    name: [],
    username: [],
    email: [],
    is_email_verified: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
