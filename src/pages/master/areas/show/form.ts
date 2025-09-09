import { reactive } from 'vue'

export interface IForm {
  _id?: string
  name?: string
  age?: string
  nationality?: {
    label: string
    value: string
  }
  notes?: string
}

export interface IFormError {
  name: string[]
  age: string[]
  nationality: string[]
  notes: string[]
}

export function useForm() {
  const defaultForm: IForm = {
    _id: '',
    name: '',
    age: '',
    nationality: undefined,
    notes: ''
  }

  const defaultFormError: IFormError = {
    name: [],
    age: [],
    nationality: [],
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
