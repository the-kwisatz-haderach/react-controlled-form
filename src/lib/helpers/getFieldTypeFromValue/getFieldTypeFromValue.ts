import { FieldType, FormField } from 'lib/schema'

const getFieldTypeFromValue = (
  value: FormField<FieldType>['value']
): FieldType => {
  switch (true) {
    case typeof value === 'string':
      return 'text'
    case typeof value === 'number':
      return 'number'
    case typeof value === 'boolean':
      return 'checkbox'
    default:
      return 'custom'
  }
}

export default getFieldTypeFromValue
