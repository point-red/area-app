import { ref } from 'vue'

export interface IForm {
  username: string
  email: string
  name: string
  role: string
}

export interface IFormError {
  [key: string]: string[]
  name: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    username: '',
    email: '',
    name: '',
    role: ''
  }

  const defaultFormError: IFormError = {
    name: []
  }

  const data = ref<IForm>(defaultForm)

  const errors = ref<IFormError>(defaultFormError)

  const reset = () => {
    data.value = defaultForm
    errors.value = defaultFormError
  }

  return { data, errors, reset }
}
