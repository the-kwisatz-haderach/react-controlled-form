import { BaseFieldCreator } from '../types'

const createBaseField: BaseFieldCreator = (type) => ({
  type,
  label: '',
  error: '',
  disabled: false
})

export default createBaseField
