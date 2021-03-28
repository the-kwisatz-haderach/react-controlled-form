import { initFormState } from 'lib/helpers/initFormState'
import { schemaCreator } from 'lib/schema'
import { createFieldValidator } from 'lib/schema/createFieldValidator'
import { createFormReducer } from '.'
import {
  clearForm,
  resetForm,
  updateFieldValue,
  validateField,
  validateForm
} from '../../actions/actions'

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
            errors: ['error!']
          },
          age: {
            ...initialState.age,
            errors: ['error!']
          },
          isAlive: {
            ...initialState.isAlive,
            errors: ['error!']
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
  test('validateField', () => {
    const { formReducer, initialState } = setup({
      name: {
        validators: [
          createFieldValidator<'text'>(
            (value) => value === '',
            'field cant be empty!'
          )
        ]
      }
    })
    expect(
      formReducer(
        {
          ...initialState,
          name: {
            ...initialState.name,
            value: ''
          }
        },
        validateField({ key: 'name' })
      )
    ).toEqual({
      ...initialState,
      name: {
        ...initialState.name,
        errors: ['field cant be empty!']
      }
    })
  })
  test('validateForm', () => {
    const { formReducer, initialState } = setup({
      name: {
        value: '',
        validators: [
          createFieldValidator<'text'>(
            (value) => value === '',
            'field cant be empty!'
          )
        ]
      },
      age: {
        value: 0,
        validators: [
          createFieldValidator<'number'>(
            (value) => value <= 5,
            'value must exceed 5!'
          ),
          createFieldValidator<'number'>(
            (value) => value < 1,
            'value must exceed 0!'
          )
        ]
      },
      isAlive: {
        value: false,
        validators: [
          createFieldValidator<'checkbox'>(
            (value) => !value,
            'value must be true!'
          )
        ]
      }
    })
    expect(formReducer(initialState, validateForm())).toEqual({
      ...initialState,
      name: {
        ...initialState.name,
        errors: ['field cant be empty!']
      },
      age: {
        ...initialState.age,
        errors: ['value must exceed 5!', 'value must exceed 0!']
      },
      isAlive: {
        ...initialState.isAlive,
        errors: ['value must be true!']
      }
    })
  })
})
