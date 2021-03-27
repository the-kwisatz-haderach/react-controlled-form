import { FieldTypeSchema } from 'lib/schema'
import { FormState } from 'lib/schema/types'

const fieldHasErrors = <T extends FieldTypeSchema>(
  field: FormState<T>[keyof FormState<T>]
): boolean => field.error !== ''

export default fieldHasErrors
