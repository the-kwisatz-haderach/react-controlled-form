import type { FormActions, UPDATE_VALUE } from './actions'
import { FieldType, FieldTypeSchema, FormSchema } from '../schema/types'
import { Reducer } from 'react'

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
