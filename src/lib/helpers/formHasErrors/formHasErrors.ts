import { FormState, OutputSchema } from 'lib/schema/types'

const formHasErrors = <T extends OutputSchema>(
  formState: FormState<T>
): boolean =>
  Object.values(formState).some(
    (field: FormState<T>[string]) => field.errors.length > 0
  )

export default formHasErrors
