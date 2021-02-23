import { FieldType, FieldTypeSchema } from './schema/types'

const fieldTypes: FieldType[] = ['text', 'number', 'custom', 'checkbox']

const isFieldType = (arg: any): arg is FieldType => fieldTypes.includes(arg)

export const isFieldTypeSchema = <
  T extends FieldTypeSchema<Record<string, unknown>>
>(
  arg: any
): arg is T => {
  if (typeof arg !== 'object' || arg === null) return false
  if (!Object.values(arg).every(isFieldType)) return false
  return true
}
