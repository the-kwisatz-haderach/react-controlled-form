import {
  DynamicField,
  FieldTypeSchema,
  FormConstants,
  FormSchema
} from '../../schema/types'

const excludedProps = ['value', 'error', 'disabled', 'required'] // Fix strict typing

const formConstantsCreator = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormConstants<T> => {
  const fields = Object.keys(formSchema)
  return {
    fields,
    props: fields.reduce<FormConstants<T>['props']>(
      (acc, curr) => ({
        ...acc,
        [curr]: {
          ...Object.keys(formSchema[curr])
            .filter((prop) => !excludedProps.includes(prop))
            .reduce(
              (acc2, current) => ({
                ...acc2,
                [current]: formSchema[curr][current]
              }),
              {}
            )
        }
      }),
      {} as FormConstants<T>['props']
    )
  }
}

export default formConstantsCreator
