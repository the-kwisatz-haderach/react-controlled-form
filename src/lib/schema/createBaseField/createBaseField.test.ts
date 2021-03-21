import fieldTypes from '../../fieldTypes'
import createBaseField from './createBaseField'
import { fieldBase } from './__fixtures__'

describe('createBaseField', () => {
  it('returns an object containing the base fields, common to all field types', () => {
    fieldTypes.forEach((fieldType) => {
      expect(createBaseField({ name: 'test', type: fieldType })).toEqual({
        ...fieldBase,
        name: 'test',
        type: fieldType
      })
    })
  })
})
