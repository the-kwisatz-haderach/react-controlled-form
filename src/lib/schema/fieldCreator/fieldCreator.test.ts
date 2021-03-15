import fieldTypes from 'lib/fieldTypes'
import defaultFieldValues from './defaultFieldValues'
import fieldCreator from './fieldCreator'
import { formFieldBase } from './__fixtures__'

describe('fieldCreator', () => {
  it('returns a field object containing the base fields as well as default for its FieldType', () => {
    fieldTypes.forEach((fieldType) => {
      expect(fieldCreator({ type: fieldType, name: '' })).toEqual({
        ...formFieldBase,
        ...defaultFieldValues[fieldType],
        type: fieldType
      })
    })
  })
})
