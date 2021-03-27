import { FieldTypeSchema, FormState } from 'lib/schema/types'

type FormValues<T extends FieldTypeSchema> = {
  [K in keyof FormState<T>]: FormState<T>[keyof T]['value']
}

const reduceFormValues = <T extends FieldTypeSchema>(
  formState: FormState<T>
): FormValues<T> =>
  Object.entries(formState).reduce<FormValues<T>>(
    (formValues, [key, values]) => ({
      ...formValues,
      [key]: values.value
    }),
    {} as FormValues<T>
  )

export default reduceFormValues
