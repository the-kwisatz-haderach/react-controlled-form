import { createBaseField } from '../createBaseField'
import defaultFieldValues from '../defaultFieldValues'
import { FieldType, FieldBase, SchemaDefaults } from '../types'

type FieldCreator = <T extends FieldType>(
  values: Pick<FieldBase<T>, 'type' | 'name'>
) => SchemaDefaults[T] & FieldBase<T>

const fieldCreator: FieldCreator = (values) => ({
  ...createBaseField(values),
  ...defaultFieldValues[values.type]
})

export default fieldCreator
