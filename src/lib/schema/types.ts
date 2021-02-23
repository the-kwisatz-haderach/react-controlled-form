import { FormActions } from '../reducer/actions'

export type FieldType = 'text' | 'number' | 'checkbox' | 'custom'

export interface FormFieldBase<T extends FieldType> {
  type: T
  label: string
  error: string
  disabled: boolean
}

export interface CustomField extends FormFieldBase<'custom'> {
  value: string
}

export interface TextField extends FormFieldBase<'text'> {
  value: string
  placeholder: string
}

export interface NumberField extends FormFieldBase<'number'> {
  value: number
}

export interface CheckboxField extends FormFieldBase<'checkbox'> {
  value: boolean
}

export type FormField<T extends FieldType> = T extends 'text'
  ? TextField
  : T extends 'number'
  ? NumberField
  : T extends 'checkbox'
  ? CheckboxField
  : CustomField

export type FieldTypeSchema<T> = {
  [K in keyof T & string]: FieldType
}

export type DefaultFormFields<T extends FieldType = FieldType> = {
  [K in T & string]: Omit<FormField<K>, keyof FormFieldBase<K>>
}

export type FormSchema<T extends FieldTypeSchema<T>> = {
  [P in keyof T & string]: FormFieldBase<T[P]> & DefaultFormFields<T[P]>[T[P]]
}

export type BaseFieldCreator = <T extends FieldType>(
  type: T
) => FormFieldBase<T>

export type FieldCreator = <T extends FieldType>(
  type: T
) => DefaultFormFields<FieldType>[T] & FormFieldBase<T>

export type Defaults<T extends string, U, V> = {
  [K in T & string]: Omit<U, keyof V>
}

export type FormActionDispatcher = (action: FormActions) => void
