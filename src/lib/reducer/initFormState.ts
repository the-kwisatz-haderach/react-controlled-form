import isFieldTypeSchema from '../typeGuards/isFieldTypeSchema'
import schemaCreator from '../schema'
import { FieldTypeSchema, FormSchema } from '../schema/types'

const initFormState = <T extends FieldTypeSchema<any>>(
  initialState: FormSchema<T> | T
): FormSchema<T> =>
  isFieldTypeSchema(initialState) ? schemaCreator(initialState)() : initialState

export default initFormState
