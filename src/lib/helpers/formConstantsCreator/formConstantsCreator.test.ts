import { schemaCreator } from 'lib'
import { FormProps } from 'lib/schema/types'
import { formConstantsCreator } from '.'

const formSchema = schemaCreator({
  name: 'text',
  age: 'number',
  isLeet: 'checkbox'
})()

describe('formConstantsCreator', () => {
  it('takes the constant values for a given formSchema', () => {
    const expected: FormProps<{
      name: 'text'
      age: 'number'
      isLeet: 'checkbox'
    }> = {
      name: {
        pattern: '',
        placeholder: '',
        name: 'name',
        type: 'text',
        validators: []
      },
      age: {
        name: 'age',
        type: 'number',
        step: 1,
        decimals: 0,
        placeholder: '',
        validators: []
      },
      isLeet: {
        name: 'isLeet',
        type: 'checkbox',
        indeterminate: false,
        validators: []
      }
    }

    expect(formConstantsCreator(formSchema)).toEqual(expected)
  })
})
