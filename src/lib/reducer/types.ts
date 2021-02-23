import type { Reducer } from 'react'
import type { FormActions, UPDATE_VALUE } from './actions'
import type { FieldType, FieldTypeSchema, FormSchema } from '../schema/types'

export type UpdateFieldValueAction = <
  T extends { key: keyof FormSchema<FieldTypeSchema<any>>; value?: any }
>(
  payload: T & { type: FieldType }
) => {
  type: typeof UPDATE_VALUE
  payload: T & { type: FieldType }
}

export type FormReducer<T extends FieldTypeSchema<any>> = Reducer<
  FormSchema<T>,
  FormActions
>
