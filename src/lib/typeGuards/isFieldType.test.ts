import fieldTypes from 'lib/fieldTypes'
import isFieldType from './isFieldType'

const testCases: any[] = [
  ...fieldTypes.map((fieldType) => [fieldType, true]),
  ['test', false],
  [null, false],
  [true, false]
]

describe('isFieldType', () => {
  test.each(testCases)('.isFieldType(%s)', (argument, expected) => {
    expect(isFieldType(argument)).toEqual(expected)
  })
})
