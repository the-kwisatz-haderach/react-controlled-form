import { FieldTypeSchema } from 'lib/schema'
import isFieldType from './isFieldType'

const isFieldTypeSchema = <T extends FieldTypeSchema<Record<string, unknown>>>(
  arg: unknown
): arg is T => {
  if (typeof arg !== 'object' || arg === null) return false
  if (!Object.values(arg).every(isFieldType)) return false
  return true
}

export default isFieldTypeSchema
