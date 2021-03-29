import { FieldType } from 'lib/schema'
import fieldCreator from 'lib/schema/fieldCreator'
import { FieldBase } from 'lib/schema/types'
import isFormField from './isFormField'

const formField: FieldBase<FieldType> = fieldCreator({
  type: 'text',
  name: 'test'
})

const testCases: any[] = [
  [formField, true],
  ['test', false],
  [24, false],
  [true, false],
  [{}, false],
  [null, false],
  [undefined, false]
]

describe('isFormField', () => {
  test.each(testCases)('.isFormField(%s)', (argument, expected) => {
    expect(isFormField(argument)).toEqual(expected)
  })
})
