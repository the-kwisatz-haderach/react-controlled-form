import { SyntheticEvent } from 'react'
import {
  FieldTypeSchema,
  FormField,
  FormProps,
  FormState
} from './schema/types'

export type SubmitHandler<T extends FieldTypeSchema> = (
  values: { [P in keyof T]: FormField<T[P]>['value'] },
  e: React.SyntheticEvent<HTMLFormElement, Event>
) => void

export type SubmitForm = (e: SyntheticEvent<HTMLFormElement>) => void

export type ValueUpdater<T extends FieldTypeSchema> = <
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

export interface UseFormProps<T extends FieldTypeSchema> {
  props: FormProps<T>
  state: FormState<T>
  submitForm: SubmitForm
  updateValue: ValueUpdater<T>
  hasErrors: boolean
}
