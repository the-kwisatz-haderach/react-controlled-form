import isFormFieldValue from './isFormFieldValue'

const testCases: any[] = [
  ['test', true],
  [24, true],
  [true, true],
  [{}, false],
  [null, false],
  [undefined, false]
]

describe('isFormFieldValue', () => {
  test.each(testCases)('.isFormFieldValue(%s)', (argument, expected) => {
    expect(isFormFieldValue(argument)).toEqual(expected)
  })
})
