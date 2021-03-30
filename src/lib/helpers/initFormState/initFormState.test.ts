import { schemaCreator } from 'lib/schema'
import { inputSchemaTransformer } from 'lib/schema/inputSchemaTransformer'
import { FormState } from 'lib/schema/types'
import initFormState from './initFormState'

describe('initFormState', () => {
  it('creates a formState from a default formSchema', () => {
    const formSchema = inputSchemaTransformer({
      name: 'text',
      age: 'number'
    })

    const expected: FormState<typeof formSchema> = {
      name: {
        value: '',
        required: false,
        disabled: false,
        errors: []
      },
      age: {
        value: 0,
        required: false,
        disabled: false,
        errors: []
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

    const expected: FormState<typeof formSchema> = {
      name: {
        value: 'hello',
        required: false,
        disabled: false,
        errors: []
      },
      age: {
        value: 22,
        required: false,
        disabled: false,
        errors: []
      }
    }

    expect(initFormState(formSchema)).toEqual(expected)
  })
})
