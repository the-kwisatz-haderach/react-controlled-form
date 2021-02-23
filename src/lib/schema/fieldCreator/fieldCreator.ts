import createBaseField from './createBaseField'
import defaultFieldValues from './defaultFieldValues'
import { FieldCreator } from '../types'

const fieldCreator: FieldCreator = (type) => ({
  ...createBaseField(type),
  ...defaultFieldValues[type]
})

export default fieldCreator
