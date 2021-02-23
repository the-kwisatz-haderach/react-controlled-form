import schemaCreator from 'lib/schema'
import { updateFieldValue } from './actions'
import reduceFieldValue from './reduceFieldValue'

const schema = schemaCreator({ isBool: 'checkbox', test: 'text' })({
  isBool: true
})

describe('reduceFieldValue', () => {
  it('returns the value in the action payload', () => {
    expect(
      reduceFieldValue(
        schema,
        updateFieldValue({ key: 'test', type: 'text', value: 'hello' })
      )
    ).toEqual('hello')
  })
  describe('if the field type = checkbox and no value is provided', () => {
    it('flips the current value', () => {
      expect(
        reduceFieldValue(
          schema,
          updateFieldValue({ key: 'isBool', type: 'checkbox' })
        )
      ).toEqual(false)
    })
  })
})
