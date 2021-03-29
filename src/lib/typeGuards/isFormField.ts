import { FieldType, FormField } from 'lib/schema'
import { TextField } from 'lib/schema/types'
import isFieldType from './isFieldType'

const properties: (keyof TextField)[] = [
  'disabled',
  'errors',
  'name',
  'required',
  'type',
  'validators',
  'pattern',
  'placeholder',
  'pattern'
]

const isFormField = (arg: unknown): arg is FormField<FieldType> => {
  if (typeof arg !== 'object') return false
  if (arg === null) return false
  if (!properties.every((prop) => prop in arg)) return false
  if (!isFieldType((arg as any).type)) return false
  if (!Array.isArray((arg as any).errors)) return false
  if (!Array.isArray((arg as any).validators)) return false
  if (typeof (arg as any).name !== 'string') return false
  if (typeof (arg as any).disabled !== 'boolean') return false
  if (typeof (arg as any).required !== 'boolean') return false
  return true
}

export default isFormField
