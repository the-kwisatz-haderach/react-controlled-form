import {
  FieldConstants,
  FieldTypeSchema,
  FormConstants,
  FormSchema
} from '../../schema/types'

const excludedProps = ['value', 'error', 'disabled', 'required'] // Fix strict typing

const formConstantsCreator = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormConstants<T> => {
  const fieldKeys = Object.keys(formSchema)
  return {
    fieldKeys,
    fieldValidators: null,
    fieldProps: fieldKeys.reduce<FormConstants<T>['fieldProps']>(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          ...Object.keys(formSchema[curr])
            .filter((prop) => !excludedProps.includes(prop))
            .reduce<FieldConstants<T[keyof T]>>(
              (acc2, current) => ({
                ...acc2,
                [current]: (formSchema as any)[curr][current]
              }),
              {} as FieldConstants<T[keyof T]>
            )
        }
      }),
      {} as FormConstants<T>['fieldProps']
    )
  }
}

export default formConstantsCreator
