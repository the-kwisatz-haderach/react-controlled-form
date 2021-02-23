import { UpdateFieldValueAction } from './types'

export const UPDATE_VALUE = 'UPDATE_VALUE'
export const CLEAR_FORM = 'CLEAR_FORM'

export const updateFieldValue: UpdateFieldValueAction = (payload) => ({
  type: UPDATE_VALUE,
  payload
})

export type FormActions = ReturnType<typeof updateFieldValue>
