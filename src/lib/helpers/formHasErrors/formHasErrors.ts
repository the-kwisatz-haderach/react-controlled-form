import { FieldTypeSchema } from 'lib/schema'
import { FormState } from 'lib/schema/types'

const formHasErrors = <T extends FieldTypeSchema>(
  formState: FormState<T>
): boolean => Object.values(formState).some((field) => field.error !== '')

export default formHasErrors
