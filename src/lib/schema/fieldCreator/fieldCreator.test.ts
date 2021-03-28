import fieldTypes from 'lib/fieldTypes'
import { createBaseField } from '../createBaseField'
import defaultFieldValues from '../defaultFieldValues'
import fieldCreator from './fieldCreator'

describe('fieldCreator', () => {
  it('returns a field object containing the base fields as well as default for its FieldType', () => {
    fieldTypes.forEach((fieldType) => {
      expect(fieldCreator({ type: fieldType, name: 'test' })).toEqual({
        ...createBaseField({ type: fieldType, name: 'test' }),
        ...defaultFieldValues[fieldType],
        type: fieldType,
        name: 'test'
      })
    })
  })
})
