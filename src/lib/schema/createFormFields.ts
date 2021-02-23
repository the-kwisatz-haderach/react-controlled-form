import { mapValues } from 'lodash'
import { DeepPartial } from '../types'
import {
  BaseFieldCreator,
  DefaultFormFields,
  FieldCreator,
  FieldTypeSchema,
  FormField,
  FormSchema
} from './types'

export const createBaseField: BaseFieldCreator = (type) => ({
  type,
  label: '',
  error: '',
  disabled: false
})

const defaultValues: DefaultFormFields = {
  text: {
    value: '',
    placeholder: ''
  },
  checkbox: {
    value: false
  },
  custom: {
    value: ''
  },
  number: {
    value: 0
  }
}

const fieldCreator: FieldCreator = (type) => ({
  ...createBaseField(type),
  ...defaultValues[type]
})

const schemaCreator = <T extends FieldTypeSchema<T>>(fieldSchema: T) => {
  const formSchema = mapValues(fieldSchema, (fieldType) =>
    fieldCreator(fieldType)
  )
  return (
    values:
      | DeepPartial<FormSchema<T>>
      | { [K in keyof T]?: FormField<T[K]>['value'] } = {}
  ) =>
    (mapValues(formSchema, (defaultFieldValues, fieldKey) =>
      typeof values[fieldKey] === 'object' && values[fieldKey] !== null
        ? {
            ...defaultFieldValues,
            ...values[fieldKey]
          }
        : { ...defaultFieldValues, value: values[fieldKey] }
    ) as unknown) as FormSchema<T>
}

export default schemaCreator
