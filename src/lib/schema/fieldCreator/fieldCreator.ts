import createBaseField from './createBaseField'
import defaultFieldValues from './defaultFieldValues'
import { FieldCreator } from '../types'

const fieldCreator: FieldCreator = (values) => ({
  ...createBaseField(values),
  ...defaultFieldValues[values.type]
})

export default fieldCreator
