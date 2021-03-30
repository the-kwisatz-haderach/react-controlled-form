import { actionCreatorFactory } from './actionCreatorFactory'

export const UPDATE_VALUE = 'UPDATE_VALUE'

export const updateFieldValue = actionCreatorFactory<
  { key: string | number; value?: any },
  typeof UPDATE_VALUE
>(UPDATE_VALUE)

export const RESET_FORM = 'RESET_FORM'
export const CLEAR_FORM = 'CLEAR_FORM'
export const VALIDATE_FORM = 'VALIDATE_FORM'
export const VALIDATE_FIELD = 'VALIDATE_FIELD'

export const resetForm = actionCreatorFactory(RESET_FORM)
export const clearForm = actionCreatorFactory(CLEAR_FORM)
export const validateForm = actionCreatorFactory(VALIDATE_FORM)
export const validateField = actionCreatorFactory<
  {
    key: string | number
  },
  typeof VALIDATE_FIELD
>(VALIDATE_FIELD)

export type FormActions =
  | ReturnType<typeof updateFieldValue>
  | ReturnType<typeof clearForm>
  | ReturnType<typeof validateForm>
  | ReturnType<typeof validateField>
  | ReturnType<typeof resetForm>
