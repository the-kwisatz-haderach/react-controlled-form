import { FieldTypeSchema, FormSchema, FormState } from '../../schema/types'

const initFormState = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormState<T> => {
  const fields = Object.keys(formSchema)
  return {
    ...fields.reduce((acc, curr) => {
      const { value, error, disabled, required } = formSchema[curr]
      return {
        ...acc,
        [curr]: {
          value,
          error,
          disabled,
          required
        }
      }
    }, {} as FormState<T>)
  }
}

export default initFormState
