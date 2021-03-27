import { schemaCreator } from 'lib'
import { FormConstants } from 'lib/schema/types'
import { formConstantsCreator } from '.'

const formSchema = schemaCreator({
  name: 'text',
  age: 'number',
  isLeet: 'checkbox'
})()

describe('formConstantsCreator', () => {
  it('takes the constant values for a given formSchema', () => {
    const expected: FormConstants<{
      name: 'text'
      age: 'number'
      isLeet: 'checkbox'
    }> = {
      fieldKeys: ['name', 'age', 'isLeet'],
      fieldProps: {
        name: {
          pattern: '',
          placeholder: '',
          name: 'name',
          type: 'text',
          label: ''
        },
        age: {
          name: 'age',
          type: 'number',
          label: '',
          step: 1,
          decimals: 0,
          placeholder: ''
        },
        isLeet: {
          name: 'isLeet',
          type: 'checkbox',
          label: '',
          indeterminate: false
        }
      }
    }

    expect(formConstantsCreator(formSchema)).toEqual(expected)
  })
})
