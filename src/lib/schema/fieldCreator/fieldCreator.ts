import { createBaseField } from '../createBaseField'
import defaultFieldValues from '../defaultFieldValues'
import { FieldType, FieldBase, SchemaDefaults, FormField } from '../types'

type FieldCreator = <T extends FieldType>(
  values: {
    type: T
    name: FormField<T>['name']
  } & Partial<Omit<FormField<T>, 'type' | 'name'>>
) => SchemaDefaults[T] & FieldBase<T>

const fieldCreator: FieldCreator = ({ type, name, ...values }) => {
  return {
    ...createBaseField({ type, name }),
    ...defaultFieldValues[type],
    ...values
  }
}

export default fieldCreator
