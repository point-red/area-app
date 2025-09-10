import { reactive  } from 'vue'

export interface IForm {
  password?: string
  reason?: string
}


export interface IFormError {
  password: string[]
  reason: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    password: '',
    reason: ''
  }
    
  const defaultFormError: IFormError = {
    password: [],
    reason: []
  }
  const data = reactive<IForm>(defaultForm)
  const errors = reactive<IFormError>(defaultFormError)

  const reset = () => {
    Object.assign(data, defaultForm)
    Object.assign(errors, defaultFormError)
  }

  return { data, errors, reset }
}
