import { reactive } from 'vue'

export interface IForm {
  province?: string
  role_name?: string
  role_type?: {
    label: string
    value: string
  }
  notes?: string
}

export interface IFormError {
  province: string[]
  role_name: string[]
  role_type: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    province: '',
    role_name: '',
    role_type: undefined,
    notes: ''
  }

  const defaultFormError: IFormError = {
    province: [],
    role_name: [],
    role_type: [],
    notes: []
  }

  const data = reactive<IForm>(defaultForm)
  const errors = reactive<IFormError>(defaultFormError)

  const reset = () => {
    Object.assign(data, defaultForm)
    Object.assign(errors, defaultFormError)
  }

  return { data, errors, reset }
}
