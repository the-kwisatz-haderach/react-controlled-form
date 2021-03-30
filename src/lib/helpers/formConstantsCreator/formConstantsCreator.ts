import {
  DynamicField,
  FieldProps,
  FormProps,
  OutputSchema
} from '../../schema/types'

const excludedProps: DynamicField[] = [
  'value',
  'errors',
  'disabled',
  'required'
] // Fix strict typing

const formConstantsCreator = <T extends OutputSchema>(
  formSchema: T
): FormProps<T> => {
  return Object.keys(formSchema).reduce<FormProps<T>>(
    (acc, curr) => ({
      ...acc,
      [curr]: {
        ...Object.keys(formSchema[curr])
          .filter((prop) => !excludedProps.includes(prop as DynamicField))
          .reduce(
            (acc2, current) => ({
              ...acc2,
              [current]: formSchema[curr][current]
            }),
            {} as FieldProps<T[keyof T]['type']>
          )
      }
    }),
    {} as FormProps<T>
  )
}

export default formConstantsCreator
