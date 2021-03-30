import { SyntheticEvent } from 'react'
import { FormValues } from './helpers/reduceFormValues'
import { FormProps, FormState, OutputSchema } from './schema/types'

export type SubmitHandler<T extends OutputSchema> = (
  values: FormValues<T>,
  e: React.SyntheticEvent<HTMLFormElement, Event>
) => void

export type SubmitForm = (e: SyntheticEvent<HTMLFormElement>) => void

export type ValueUpdater<T extends OutputSchema> = <P extends keyof T & string>(
  payload: T[P]['type'] extends 'checkbox'
    ? {
        key: P
        value?: T[P]['value']
      }
    : {
        key: P
        value: T[P]['value']
      }
) => void

export interface UseFormProps<T extends OutputSchema> {
  props: FormProps<T>
  state: FormState<T>
  submitForm: SubmitForm
  updateValue: ValueUpdater<T>
  hasErrors: boolean
}
