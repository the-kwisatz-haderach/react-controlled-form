import { FieldTypeSchema, FormSchema, FormState } from '../../schema/types'

const initFormState = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormState<T> => {
  const fields = Object.keys(formSchema)
  return {
    ...fields.reduce((acc, curr) => {
      const { value, errors, disabled, required } = formSchema[curr]
      return {
        ...acc,
        [curr]: {
          value,
          errors,
          disabled,
          required
        }
      }
    }, {} as FormState<T>)
  }
}

export default initFormState
