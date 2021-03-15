import { BaseFieldCreator } from '../types'

const createBaseField: BaseFieldCreator = ({ type, name }) => ({
  type,
  name,
  label: '',
  error: '',
  disabled: false,
  required: false
})

export default createBaseField
