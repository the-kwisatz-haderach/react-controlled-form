import {
  FieldType,
  FieldTypeSchema,
  FormField,
  FormSchema
} from './schema/types'

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

export type SubmitHandler<T extends FormSchema<any>> = (
  formValues: { [P in keyof T]: T[P]['value'] }
) => void

export interface UseFormOptions<T extends FieldTypeSchema<T>> {
  validationSchema: ValidationSchema<T>
}

export type FormSubmitHandler = () => void

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
