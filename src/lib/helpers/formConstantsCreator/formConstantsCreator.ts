import {
  DynamicField,
  FieldProps,
  FieldTypeSchema,
  FormProps,
  FormSchema
} from '../../schema/types'

const excludedProps: DynamicField[] = [
  'value',
  'errors',
  'disabled',
  'required'
] // Fix strict typing

const formConstantsCreator = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormProps<T> => {
  return Object.keys(formSchema).reduce<FormProps<T>>(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        ...Object.keys(formSchema[curr])
          .filter((prop) => !excludedProps.includes(prop as DynamicField))
          .reduce<FieldProps<T[keyof T]>>(
            (acc2, current) => ({
              ...acc2,
              [current]: (formSchema as any)[curr][current]
            }),
            {} as FieldProps<T[keyof T]>
          )
      }
    }),
    {} as FormProps<T>
  )
}

export default formConstantsCreator
