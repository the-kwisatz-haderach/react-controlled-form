import fieldTypes from '../../fieldTypes'
import createBaseField from './createBaseField'
import { formFieldBase } from './__fixtures__'

describe('createBaseField', () => {
  it('returns an object containing the base fields, common to all field types', () => {
    fieldTypes.forEach((fieldType) => {
      expect(createBaseField(fieldType)).toEqual({
        ...formFieldBase,
        type: fieldType
      })
    })
  })
})
