import { getFieldTypeFromValue } from 'lib/helpers/getFieldTypeFromValue'
import isFieldType from 'lib/typeGuards/isFieldType'
import isFormFieldValue from 'lib/typeGuards/isFormFieldValue'
import fieldCreator from '../fieldCreator'
import { InputSchema, OutputSchema } from '../types'

const inputSchemaTransformer = <T extends InputSchema<T>>(
  inputSchema: T
): OutputSchema<T> =>
  Object.keys(inputSchema).reduce((acc, name) => {
    const value = (inputSchema as any)[name]
    if (isFieldType(value)) {
      return {
        ...acc,
        [name]: fieldCreator({ type: value, name })
      }
    }
    if (isFormFieldValue(value)) {
      const type = getFieldTypeFromValue(value)
      return {
        ...acc,
        [name]: fieldCreator({ type, name, value })
      }
    }
    return {
      ...acc,
      [name]: fieldCreator({ name, ...value })
    }
  }, {} as OutputSchema<T>)

export default inputSchemaTransformer
