import { FieldTypeSchema, FormSchema } from 'lib/schema/types'
import { actionCreatorFactory } from './actionCreatorFactory'

export const UPDATE_VALUE = 'UPDATE_VALUE'

export const CLEAR_FORM = 'CLEAR_FORM'

export const clearForm = actionCreatorFactory(CLEAR_FORM)

export const updateFieldValue = actionCreatorFactory<
  { key: keyof FormSchema<FieldTypeSchema>; value?: any },
  typeof UPDATE_VALUE
>(UPDATE_VALUE)

export type FormActionCreators = typeof updateFieldValue | typeof clearForm

export type FormActions =
  | ReturnType<typeof updateFieldValue>
  | ReturnType<typeof clearForm>
