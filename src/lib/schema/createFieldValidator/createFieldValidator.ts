import { FieldType, FieldTypeSchema, FieldValidator } from '../types'

const createFieldValidator = <
  T extends FieldType,
  U extends FieldTypeSchema = FieldTypeSchema
>(
  condition: (...args: Parameters<FieldValidator<T, U>>) => boolean,
  message: string
): FieldValidator<FieldType, U> => (...args) =>
  condition(...args) ? message : ''

export default createFieldValidator
