import { inputSchemaTransformer } from 'lib/schema/inputSchemaTransformer'
import { FormProps } from 'lib/schema/types'
import { formConstantsCreator } from '.'

const formSchema = inputSchemaTransformer({
  name: 'text',
  age: 'number',
  isLeet: 'checkbox'
})

describe('formConstantsCreator', () => {
  it('takes the constant values for a given formSchema', () => {
    const expected: FormProps<typeof formSchema> = {
      name: {
        name: 'name',
        type: 'text',
        validators: []
      },
      age: {
        name: 'age',
        type: 'number',
        validators: []
      },
      isLeet: {
        name: 'isLeet',
        type: 'checkbox',
        validators: []
      }
    }

    expect(formConstantsCreator(formSchema)).toEqual(expected)
  })
})
