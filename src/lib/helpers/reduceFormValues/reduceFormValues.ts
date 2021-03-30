import { FormState, OutputSchema } from 'lib/schema/types'

export type FormValues<T extends OutputSchema> = {
  [K in keyof FormState<T>]: FormState<T>[keyof T]['value']
}

const reduceFormValues = <T extends OutputSchema>(
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
