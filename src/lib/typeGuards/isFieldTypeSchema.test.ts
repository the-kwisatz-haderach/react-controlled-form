import isFieldTypeSchema from './isFieldTypeSchema'

const testCases: [any, boolean][] = [
  [
    {
      textField: 'text',
      customField: 'custom',
      numberField: 'number'
    },
    true
  ],
  [
    {
      whatever: 'text'
    },
    true
  ],
  [
    {
      textField: 25,
      customField: null,
      numberField: 'number'
    },
    false
  ],
  [
    {
      whatever: 'lol'
    },
    false
  ]
]

describe('isFieldTypeSchema', () => {
  test.each(testCases)('isFieldTypeSchema(%o)', (schema, expected) => {
    expect(isFieldTypeSchema(schema)).toBe(expected)
  })
})
