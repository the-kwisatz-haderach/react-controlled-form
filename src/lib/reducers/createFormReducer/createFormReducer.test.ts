import { initFormState } from 'lib/helpers/initFormState'
import { schemaCreator } from 'lib/schema'
import { createFormReducer } from '.'
import { clearForm, resetForm, updateFieldValue } from '../../actions/actions'

const simpleSchemaCreator = schemaCreator({
  name: 'text',
  age: 'number',
  isAlive: 'checkbox'
})

const setup = (...values: Parameters<typeof simpleSchemaCreator>) => {
  const formSchema = simpleSchemaCreator(...values)
  const initialState = initFormState(formSchema)
  const formReducer = createFormReducer(formSchema)
  return { formReducer, initialState }
}

describe('formReducer', () => {
  test('bad action', () => {
    const { formReducer, initialState } = setup()
    expect(formReducer(initialState, { type: 'WAZZAA' } as any)).toEqual(
      initialState
    )
  })
  test('updateFieldValue', () => {
    const { formReducer, initialState } = setup()
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
  test('resetForm', () => {
    const { formReducer, initialState } = setup({
      name: 'test',
      age: 25,
      isAlive: true
    })
    expect(formReducer(initialState, resetForm())).toEqual(initialState)
  })
  test('clearForm', () => {
    const { formReducer, initialState } = setup({
      name: 'test',
      age: 25,
      isAlive: true
    })
    expect(
      formReducer(
        {
          ...initialState,
          name: {
            ...initialState.name,
            error: 'error!'
          },
          age: {
            ...initialState.age,
            error: 'error!'
          },
          isAlive: {
            ...initialState.isAlive,
            error: 'error!'
          }
        },
        clearForm()
      )
    ).toEqual({
      ...initialState,
      name: {
        ...initialState.name,
        value: ''
      },
      age: {
        ...initialState.age,
        value: 0
      },
      isAlive: {
        ...initialState.isAlive,
        value: false
      }
    })
  })
})
