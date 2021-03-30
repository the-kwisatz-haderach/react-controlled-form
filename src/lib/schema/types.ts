export type FieldType = 'text' | 'number' | 'checkbox' | 'custom'

export type DynamicField = 'value' | 'errors' | 'disabled' | 'required'

/* eslint-disable no-use-before-define */
export type FieldValidator<
  V extends FieldType,
  U extends OutputSchema = OutputSchema
> = (
  value: FormField<V>['value'],
  options: {
    initialValue: FormField<V>['value']
    formState: FormState<U>
  }
) => string | undefined

export interface FieldBase<T extends FieldType> extends Record<string, any> {
  type: T
  label?: string
  errors: string[]
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

export type FieldDefaults<T extends FieldType> = Omit<
  FormField<T>,
  keyof FieldBase<T>
>

export type SchemaDefaults = {
  [K in FieldType]: FieldDefaults<K>
}

export type FormState<T extends OutputSchema> = {
  [K in keyof T]: {
    [U in DynamicField]: T[K][U]
  }
}

export type FieldProps<T extends FieldType> = Omit<FormField<T>, DynamicField>

export type FormProps<T extends OutputSchema> = {
  [K in keyof T & string]: FieldProps<T[K]['type']>
}

export type InputSchema<T extends Record<string, unknown> = any> = {
  [K in keyof T]: T[K] extends FieldType
    ? FieldType
    : T[K] extends FormField<infer U>
    ? Pick<FormField<U>, 'type'> & Partial<FormField<U>>
    : T[K] extends FormField<FieldType>['value']
    ? FormField<FieldType>['value']
    : Pick<FormField<FieldType>, 'type'> & Partial<FormField<FieldType>>
}

type FormFieldFromValue<
  T extends FormField<FieldType>['value']
> = T extends string
  ? FormField<'text'>
  : T extends number
  ? FormField<'number'>
  : T extends boolean
  ? FormField<'checkbox'>
  : FormField<'custom'>

export type OutputSchema<T extends InputSchema = any> = {
  [K in keyof T]: T[K] extends FieldType
    ? FormField<T[K]>
    : T[K] extends { type: FieldType }
    ? FormField<T[K]['type']>
    : T[K] extends FormField<FieldType>['value']
    ? FormFieldFromValue<T[K]>
    : FormFieldFromValue<FieldType>
}

export type HookOptions<T extends OutputSchema> = {
  validateOn: 'submit' | 'valueChange'
  clearOnSubmit: boolean
  fieldTypeValidation: {
    [K in keyof T]?: T[K]['validators'][]
  }
}
