export type FieldType = 'text' | 'number' | 'checkbox' | 'custom'

export type DynamicField = 'value' | 'error' | 'disabled' | 'required'

/* eslint-disable no-use-before-define */
export type FieldValidator<
  T extends FieldType,
  U extends FieldTypeSchema = FieldTypeSchema
> = (
  value: FormField<T>['value'],
  options: {
    getInitialValue: () => FormField<T>['value']
    getFormState: () => FormState<U>
  }
) => string

export interface FieldBase<T extends FieldType> {
  type: T
  label?: string
  error: string
  name: string
  disabled: boolean
  required: boolean
  validators: FieldValidator<T>[]
}

export interface CustomField extends FieldBase<'custom'> {
  value: string
}

export interface TextField extends FieldBase<'text'> {
  value: string
  placeholder?: string
  pattern?: string
}

export interface NumberField extends FieldBase<'number'> {
  value: number
  min?: number
  max?: number
  placeholder?: string
  decimals: number
  step: number
}

export interface CheckboxField extends FieldBase<'checkbox'> {
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

export type FieldTypeSchema<T extends Record<string, FieldType> = any> = {
  [K in keyof T]: FieldType
}

export type FieldDefaults<T extends FieldType> = Omit<
  FormField<T>,
  keyof FieldBase<T>
>

export type SchemaDefaults = {
  [K in FieldType]: FieldDefaults<K>
}

export type FormState<T extends FieldTypeSchema> = {
  [K in keyof T]: {
    [U in DynamicField]: FormField<T[K]>[U]
  }
}

export type FieldConstants<T extends FieldType> = Omit<
  FormField<T>,
  DynamicField
>

export type FormConstants<T extends FieldTypeSchema> = {
  fieldKeys: (keyof T)[]
  fieldValidators: any
  fieldProps: {
    [K in keyof T & string]: FieldConstants<T[K]>
  }
}

export type FormSchema<T extends FieldTypeSchema> = {
  [K in keyof T & string]: FieldBase<T[K]> & FieldDefaults<T[K]>
}
