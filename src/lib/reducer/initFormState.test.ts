import * as schemaCreator from 'lib/schema'
import initFormState from './initFormState'

const schemaCreatorSpy = jest.spyOn(schemaCreator, 'default')

describe('initFormState', () => {
  describe('when the supplied argument is a FieldTypeSchema', () => {
    it('runs the schemaCreator and returns a schema based on the FieldTypeSchema', () => {
      const formSchema = initFormState({ name: 'text', age: 'number' })

      expect(schemaCreatorSpy).toHaveBeenCalledTimes(1)
      expect(schemaCreatorSpy).toHaveBeenCalledWith({
        name: 'text',
        age: 'number'
      })
      expect(formSchema).toEqual({
        name: {
          value: '',
          disabled: false,
          label: '',
          error: '',
          placeholder: '',
          type: 'text'
        },
        age: {
          value: 0,
          disabled: false,
          label: '',
          error: '',
          type: 'number'
        }
      })
    })
  })
  describe('when the supplied argument is a FormSchema', () => {
    it('returns the schema', () => {
      const formSchema: schemaCreator.FormSchema<{
        name: 'text'
        age: 'number'
      }> = {
        name: {
          value: '',
          disabled: false,
          label: '',
          error: '',
          placeholder: '',
          type: 'text'
        },
        age: {
          value: 0,
          disabled: false,
          label: '',
          error: '',
          type: 'number'
        }
      }

      expect(initFormState(formSchema)).toEqual(formSchema)
    })
  })
})
