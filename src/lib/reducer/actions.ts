import { UpdateFieldValueAction } from './types'
import { actionCreatorFactory } from './actionCreatorFactory'

export const UPDATE_VALUE = 'UPDATE_VALUE'
export const CLEAR_FORM = 'CLEAR_FORM'

export const updateFieldValue: UpdateFieldValueAction = (payload) => ({
  type: UPDATE_VALUE,
  payload
})

export const clearForm = actionCreatorFactory(CLEAR_FORM)

export type FormActions =
  | ReturnType<typeof updateFieldValue>
  | ReturnType<typeof clearForm>
