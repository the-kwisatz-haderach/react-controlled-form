import { FieldType, FieldValidator, OutputSchema } from '../types'

const createFieldValidator = <
  T extends FieldType = FieldType,
  U extends OutputSchema = OutputSchema
>(
  condition: (...args: Parameters<FieldValidator<T, U>>) => boolean,
  message: string
): FieldValidator<FieldType, U> => (...args) => {
  if (condition(...args)) return message
}

export default createFieldValidator
