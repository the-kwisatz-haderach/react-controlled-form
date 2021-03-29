import { FieldType, FormField } from 'lib/schema'

const isFormFieldValue = (
  arg: unknown
): arg is FormField<FieldType>['value'] => {
  if (typeof arg === 'string') return true
  if (typeof arg === 'boolean') return true
  if (typeof arg === 'number') return true
  return false
}

export default isFormFieldValue
