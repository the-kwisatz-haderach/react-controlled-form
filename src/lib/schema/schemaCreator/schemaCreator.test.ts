import { createBaseField } from '../createBaseField'
import defaultFieldValues from '../defaultFieldValues'
import { FormSchema } from '../types'
import schemaCreator from './schemaCreator'

describe('schemaCreator', () => {
  it('returns a formSchema creation function', () => {
    expect(schemaCreator({ name: 'text' })).toEqual(expect.any(Function))
  })
  describe('when NO values are provided to the formSchema creator', () => {
    it('returns the specified schema with default values', () => {
      const makeTestSchema = schemaCreator({
        name: 'text',
        age: 'number',
        other: 'custom'
      })

      const expected: FormSchema<{
        name: 'text'
        age: 'number'
        other: 'custom'
      }> = {
        name: {
          ...createBaseField({ name: 'name', type: 'text' }),
          ...defaultFieldValues.text
        },
        age: {
          ...createBaseField({ name: 'age', type: 'number' }),
          ...defaultFieldValues.number
        },
        other: {
          ...createBaseField({ name: 'other', type: 'custom' }),
          ...defaultFieldValues.custom
        }
      }
      expect(makeTestSchema()).toEqual(expected)
    })
  })
  describe('when values are provided to the formSchema creator using the shorthand', () => {
    it('overrides the default values with the provided field values', () => {
      const makeTestSchema = schemaCreator({
        name: 'text',
        age: 'number',
        description: 'custom'
      })

      const expected: FormSchema<{
        name: 'text'
        age: 'number'
        description: 'custom'
      }> = {
        name: {
          ...createBaseField({ name: 'name', type: 'text' }),
          ...defaultFieldValues.text,
          value: 'Jesus'
        },
        age: {
          ...createBaseField({ name: 'age', type: 'number' }),
          ...defaultFieldValues.number,
          value: 10000000
        },
        description: {
          ...createBaseField({ name: 'description', type: 'custom' }),
          ...defaultFieldValues.custom,
          value: 'child of god'
        }
      }

      expect(
        makeTestSchema({
          name: 'Jesus',
          age: 10000000,
          description: 'child of god'
        })
      ).toEqual(expected)
    })
  })
  describe('when multiple field values are provided to the formSchema creator', () => {
    it('overrides the default values with the provided field values', () => {
      const makeTestSchema = schemaCreator({
        name: 'text',
        age: 'number',
        description: 'custom'
      })

      const expected: FormSchema<{
        name: 'text'
        age: 'number'
        description: 'custom'
      }> = {
        name: {
          ...createBaseField({ name: 'name', type: 'text' }),
          ...defaultFieldValues.text,
          value: 'test',
          disabled: true
        },
        age: {
          ...createBaseField({ name: 'age', type: 'number' }),
          ...defaultFieldValues.number,
          label: 'ageLabel',
          value: 25000
        },
        description: {
          ...createBaseField({ name: 'description', type: 'custom' }),
          ...defaultFieldValues.custom,
          label: 'customLabel',
          value: 'testing'
        }
      }
      expect(
        makeTestSchema({
          name: {
            value: 'test',
            disabled: true
          },
          age: {
            label: 'ageLabel',
            value: 25000
          },
          description: {
            label: 'customLabel',
            value: 'testing'
          }
        })
      ).toEqual(expected)
    })
  })
})
