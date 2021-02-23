import { FormEvent } from 'react'
import {
  FieldType,
  FieldTypeSchema,
  FormField,
  FormSchema
} from './schema/types'
import { DeepPartial } from './utilityTypes'

export type ValidationFunction<
  P extends FieldType,
  T extends FieldTypeSchema<Record<string, unknown>>
> = (
  value: FormField<P>['value'],
  states: { initialState: FormSchema<T>; currentState: FormSchema<T> }
) => string

export type ValidationSchema<T extends FieldTypeSchema<T>> = {
  [P in keyof T]: ValidationFunction<T[P], T>
}

export type ValueDispatcher<T extends FormSchema<any>> = (
  values: { [P in keyof T]: T[P]['value'] }
) => void

export interface UseFormOptions<T extends FieldTypeSchema<T>> {
  validationSchema: ValidationSchema<T>
}

export type FormSubmitHandler = (e: FormEvent) => void

export type ValueUpdater<T extends FieldTypeSchema<any>> = <
  P extends keyof T & string
>(
  payload: T[P] extends 'checkbox'
    ? {
        key: P
        value?: FormField<T[P]>['value']
      }
    : {
        key: P
        value: FormField<T[P]>['value']
      }
) => void

export interface UseFormProps<T extends FormSchema<any>> {
  values: T
  submitForm: FormSubmitHandler
  updateValue: ValueUpdater<{ [K in keyof T]: T[K]['type'] }>
}

export type ChainDispatcher<
  A extends Record<string, unknown>,
  D extends Record<string, unknown>,
  I,
  R extends (payload: I) => void
> = <U extends A & { type: string }>(
  dispatch: (action: U) => void,
  dependencies: D,
  actionCreators: ((data: I & D) => U)[]
) => R
