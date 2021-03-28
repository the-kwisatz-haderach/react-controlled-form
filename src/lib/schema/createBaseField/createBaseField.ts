import { FieldType, FieldBase } from '../types'

type BaseFieldCreator = <T extends FieldType>(
  values: Pick<FieldBase<T>, 'type' | 'name'>
) => FieldBase<T>

const createBaseField: BaseFieldCreator = ({ type, name }) => ({
  type,
  name,
  error: '',
  disabled: false,
  required: false
})

export default createBaseField
