import { mapValues } from 'lodash'
import { DeepPartial } from '../../utilityTypes'
import fieldCreator from '../fieldCreator'
import { FieldTypeSchema, FormField, FormSchema } from '../types'

type SchemaCreator<T extends FieldTypeSchema<any>> = (
  values?:
    | DeepPartial<FormSchema<T>>
    | { [K in keyof T & string]?: FormField<T[K]>['value'] }
) => FormSchema<T>

const schemaCreator = <T extends FieldTypeSchema<any>>(
  fieldSchema: T
): SchemaCreator<T> => {
  const formSchema = mapValues(fieldSchema, (fieldType, fieldKey) =>
    fieldCreator({ type: fieldType, name: fieldKey })
  )
  return (
    values:
      | DeepPartial<FormSchema<T>>
      | { [K in keyof T & string]?: FormField<T[K]>['value'] } = {}
  ): FormSchema<T> =>
    (mapValues(formSchema, (defaultFieldValues, fieldKey) => {
      if (
        !values ||
        values[fieldKey] === null ||
        values[fieldKey] === undefined
      ) {
        return defaultFieldValues
      }
      if (typeof values[fieldKey] === 'object') {
        return Object.assign(defaultFieldValues, values[fieldKey])
      }
      return { ...defaultFieldValues, value: values[fieldKey] }
    }) as unknown) as FormSchema<T>
}

export default schemaCreator
