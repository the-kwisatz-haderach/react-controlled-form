import { createSchemaValidator } from '.'
import { createFieldValidator } from '../createFieldValidator'
import { inputSchemaTransformer } from '../inputSchemaTransformer'
import { HookOptions } from '../types'

describe('createSchemaValidator', () => {
  const emptyTextValidator = createFieldValidator<'text'>(
    (value) => value === '',
    'Value cant be empty!'
  )
  const lowAgeValidator = createFieldValidator<'number'>(
    (value) => value < 50,
    'Value is too low!'
  )
  const simpleSchema = inputSchemaTransformer({
    name: 'text',
    age: 24,
    numberOfLives: 'number',
    nickname: ''
  })
  const globalValidators: HookOptions<any>['fieldTypeValidation'] = {
    text: [emptyTextValidator],
    number: [lowAgeValidator]
  }
  it('returns a function which validates formFields in a formState', () => {
    const schemaValidator = createSchemaValidator(
      simpleSchema,
      globalValidators
    )({
      name: {
        value: '',
        errors: [],
        required: false,
        disabled: false
      },
      nickname: {
        value: 'w00p',
        errors: [],
        required: false,
        disabled: false
      },
      age: {
        value: 25,
        errors: [],
        required: false,
        disabled: false
      },
      numberOfLives: {
        value: 0,
        errors: [],
        required: false,
        disabled: false
      }
    })
    expect(schemaValidator('age')).toEqual(['Value is too low!'])
    expect(schemaValidator('numberOfLives')).toEqual(['Value is too low!'])
    expect(schemaValidator('name')).toEqual(['Value cant be empty!'])
    expect(schemaValidator('nickname')).toEqual([])
  })
})
