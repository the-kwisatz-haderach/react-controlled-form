import formReducer from './formReducer'
import * as actions from './actions'
import schemaCreator from 'lib/schema'

const formSchema = schemaCreator({
  name: 'text',
  age: 'number',
  isAlive: 'checkbox'
})()

describe('formReducer', () => {
  test('UPDATE_VALUE', () => {
    expect(
      formReducer(
        formSchema,
        actions.updateFieldValue({ key: 'name', type: 'text', value: 'hello' })
      )
    ).toEqual({})
  })
})
