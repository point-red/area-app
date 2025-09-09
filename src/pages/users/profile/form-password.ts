import { computed, ref } from 'vue'

export interface IForm {
  password: string
  confirm_password: string
}

export interface IFormError {
  password: string[]
  confirm_password: string[]
}

export function useForm() {
  const defaultData: IForm = {
    password: '',
    confirm_password: ''
  }

  const defaultErrors: IFormError = {
    password: [],
    confirm_password: []
  }

  const data = ref<IForm>({ ...defaultData })

  const errors = ref<IFormError>({ ...defaultErrors })

  const reset = () => {
    data.value = { ...defaultData }
    errors.value = { ...defaultErrors }
  }

  const isPasswordConfirmed = computed(() => {
    confirmPasswordValidation()
    return (
      data.value.password.length > 0 &&
      data.value.confirm_password.length > 0 &&
      errors.value.password.length === 0 &&
      errors.value.confirm_password.length === 0
    )
  })

  const confirmPasswordValidation = () => {
    errors.value.confirm_password = []
    if (data.value.confirm_password.length === 0) {
      return
    }
    if (data.value.password !== data.value.confirm_password) {
      errors.value.confirm_password.push('Password do not match')
    }
  }

  const passwordValidation = () => {
    const errorPassword = []
    confirmPasswordValidation()
    if (data.value.password.length === 0) {
      return
    }
    if (data.value.password.length < 8) {
      errorPassword.push('Use at least 8 characters')
    }
    errors.value.password = errorPassword
  }

  return {
    data,
    errors,
    reset,
    isPasswordConfirmed,
    confirmPasswordValidation,
    passwordValidation
  }
}
