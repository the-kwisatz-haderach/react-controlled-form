import fieldTypes from '../../fieldTypes'
import createBaseField from './createBaseField'

describe('createBaseField', () => {
  it('returns an object containing the base fields, common to all field types', () => {
    fieldTypes.forEach((fieldType) => {
      expect(createBaseField({ name: 'test', type: fieldType })).toEqual({
        name: 'test',
        type: fieldType,
        error: '',
        disabled: false,
        required: false,
        validators: []
      })
    })
  })
})
