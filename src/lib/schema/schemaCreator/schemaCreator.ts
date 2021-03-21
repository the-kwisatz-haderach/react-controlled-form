import { mapValues } from 'lodash'
import { DeepPartial } from '../../utilityTypes'
import fieldCreator from '../fieldCreator'
import { FieldTypeSchema, FormField, FormSchema } from '../types'

type SchemaCreator<T extends FieldTypeSchema> = (
  values?:
    | DeepPartial<FormSchema<T>>
    | { [K in keyof T]?: FormField<T[K]>['value'] }
) => FormSchema<T>

const schemaCreator = <T extends FieldTypeSchema>(
  fieldSchema: T
): SchemaCreator<T> => {
  const fields = Object.keys(fieldSchema)
  const formSchema = {
    ...mapValues(fieldSchema, (fieldType, fieldKey) =>
      fieldCreator({ type: fieldType, name: fieldKey })
    )
  }

  return (values = {}) => {
    return fields.reduce((acc, fieldKey) => {
      if (
        !values ||
        values[fieldKey] === null ||
        values[fieldKey] === undefined
      ) {
        return acc
      }
      if (typeof values[fieldKey] === 'object') {
        return { ...acc, [fieldKey]: { ...acc[fieldKey], ...values[fieldKey] } }
      }
      return {
        ...acc,
        [fieldKey]: {
          ...acc[fieldKey],
          value: values[fieldKey]
        }
      }
    }, (formSchema as unknown) as FormSchema<T>)
  }
}

export default schemaCreator
