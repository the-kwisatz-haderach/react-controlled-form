import { FormActions } from '../reducer/actions'

export type FieldType = 'text' | 'number' | 'checkbox' | 'custom'

export interface FormFieldBase<T extends FieldType> {
  type: T
  label: string
  error: string
  name: string
  disabled: boolean
  required: boolean
}

export interface CustomField extends FormFieldBase<'custom'> {
  value: string
}

export interface TextField extends FormFieldBase<'text'> {
  value: string
  placeholder: string
  pattern: string
}

export interface NumberField extends FormFieldBase<'number'> {
  value: number
  min?: number
  max?: number
  placeholder: string
  decimals: number
  step: number
}

export interface CheckboxField extends FormFieldBase<'checkbox'> {
  value: boolean
  indeterminate: boolean
}

export type FormField<T extends FieldType> = T extends 'text'
  ? TextField
  : T extends 'number'
  ? NumberField
  : T extends 'checkbox'
  ? CheckboxField
  : CustomField

export type FieldTypeSchema<T extends Record<string, unknown>> = {
  [K in keyof T & string]: FieldType
}

export type DefaultFormFields<T extends FieldType = FieldType> = {
  [K in T & string]: Omit<FormField<K>, keyof FormFieldBase<K>>
}

export type FormSchema<T extends FieldTypeSchema<T>> = {
  [P in keyof T & string]: FormFieldBase<T[P]> & DefaultFormFields<T[P]>[T[P]]
}

export type BaseFieldCreator = <T extends FieldType>(
  values: Pick<FormFieldBase<T>, 'type' | 'name'>
) => FormFieldBase<T>

export type FieldCreator = <T extends FieldType>(
  values: Pick<FormFieldBase<T>, 'type' | 'name'>
) => DefaultFormFields<FieldType>[T] & FormFieldBase<T>

export type Defaults<T extends string, U, V> = {
  [K in T & string]: Omit<U, keyof V>
}

export type FormActionDispatcher = (action: FormActions) => void
