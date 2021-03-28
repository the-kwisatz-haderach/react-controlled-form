import { mapValues } from 'lodash'
import fieldCreator from '../fieldCreator'
import { FieldTypeSchema, FormField, FormSchema } from '../types'

type SchemaCreator<T extends FieldTypeSchema> = (
  values?: {
    [K in keyof T]?: FormField<T[K]>['value'] | Partial<FormField<T[K]>>
  }
) => FormSchema<T>

const schemaCreator = <T extends FieldTypeSchema>(
  fieldSchema: T
): SchemaCreator<T> => {
  const formSchema = {
    ...mapValues(fieldSchema, (fieldType, fieldKey) =>
      fieldCreator({ type: fieldType, name: fieldKey })
    )
  }

  return (overrides = {}) =>
    Object.keys(overrides).reduce<FormSchema<T>>((acc, fieldKey) => {
      if (
        !overrides ||
        overrides[fieldKey] === null ||
        overrides[fieldKey] === undefined
      ) {
        return acc
      }
      if (typeof overrides[fieldKey] === 'object') {
        return {
          ...acc,
          [fieldKey]: Object.assign({}, acc[fieldKey], overrides[fieldKey])
        }
      }
      return {
        ...acc,
        [fieldKey]: {
          ...acc[fieldKey],
          value: overrides[fieldKey]
        }
      }
    }, (formSchema as unknown) as FormSchema<T>)
}

export default schemaCreator
