import formReducer from './formReducer'
import { updateFieldValue } from './actions'
import schemaCreator from '../schema'

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
        updateFieldValue({ key: 'name', type: 'text', value: 'hello' })
      )
    ).toEqual({ ...formSchema, name: { ...formSchema.name, value: 'hello' } })
  })
})
