import { fieldBase } from 'lib/schema/createBaseField/__fixtures__'
import defaultFieldValues from 'lib/schema/defaultFieldValues'
import { FormState } from 'lib/schema/types'
import { createFormReducer } from '.'
import { updateFieldValue } from '../../actions/actions'

const initialState: FormState<{
  name: 'text'
  age: 'number'
  isAlive: 'checkbox'
}> = {
  name: {
    ...defaultFieldValues.text,
    ...fieldBase,
    value: ''
  },
  age: {
    ...defaultFieldValues.number,
    ...fieldBase,
    value: 0
  },
  isAlive: {
    ...defaultFieldValues.checkbox,
    ...fieldBase,
    value: false
  }
}

const formReducer = createFormReducer(initialState)

describe('formReducer', () => {
  test('UPDATE_VALUE', () => {
    expect(
      formReducer(
        initialState,
        updateFieldValue({ key: 'name', value: 'hello' })
      )
    ).toEqual({
      ...initialState,
      name: { ...initialState.name, value: 'hello' }
    })
  })
})
