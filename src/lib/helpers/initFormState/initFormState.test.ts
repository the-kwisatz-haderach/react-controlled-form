import { schemaCreator } from 'lib/schema'
import { FormState } from 'lib/schema/types'
import initFormState from './initFormState'

type SimpleFieldTypeSchema = {
  name: 'text'
  age: 'number'
}

describe('initFormState', () => {
  it('creates a formState from a default formSchema', () => {
    const formSchema = schemaCreator({
      name: 'text',
      age: 'number'
    })()

    const expected: FormState<SimpleFieldTypeSchema> = {
      name: {
        value: '',
        required: false,
        disabled: false,
        error: ''
      },
      age: {
        value: 0,
        required: false,
        disabled: false,
        error: ''
      }
    }

    expect(initFormState(formSchema)).toEqual(expected)
  })
  it('creates a formState from a formSchema with updated values', () => {
    const formSchema = schemaCreator({
      name: 'text',
      age: 'number'
    })({
      name: 'hello',
      age: 22
    })

    const expected: FormState<SimpleFieldTypeSchema> = {
      name: {
        value: 'hello',
        required: false,
        disabled: false,
        error: ''
      },
      age: {
        value: 22,
        required: false,
        disabled: false,
        error: ''
      }
    }

    expect(initFormState(formSchema)).toEqual(expected)
  })
})
