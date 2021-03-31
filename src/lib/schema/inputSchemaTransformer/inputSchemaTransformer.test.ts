import { inputSchemaTransformer } from '.'

describe('inputSchemaTransformer', () => {
  it('creates a formSchema with fields based on fieldTypes', () => {
    const actual = inputSchemaTransformer({
      name: 'text',
      age: 'number',
      isLeet: 'checkbox'
    })
    expect(actual).toEqual({
      name: {
        value: '',
        type: 'text',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'name'
      },
      age: {
        value: 0,
        type: 'number',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'age'
      },
      isLeet: {
        value: false,
        type: 'checkbox',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'isLeet'
      }
    })
  })
  it('creates fields based on field value types', () => {
    const actual = inputSchemaTransformer({
      name: 'some string',
      age: 33,
      isLeet: true
    })
    expect(actual).toEqual({
      name: {
        value: 'some string',
        type: 'text',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'name'
      },
      age: {
        value: 33,
        type: 'number',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'age'
      },
      isLeet: {
        value: true,
        type: 'checkbox',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'isLeet'
      }
    })
  })
  it('creates fields based on partial form field objects', () => {
    const actual = inputSchemaTransformer({
      name: {
        type: 'text',
        value: 'some string',
        label: 'some label'
      },
      age: {
        type: 'number',
        value: 33,
        step: 5
      },
      isLeet: {
        type: 'checkbox',
        value: true,
        indeterminate: true
      }
    })
    expect(actual).toEqual({
      name: {
        value: 'some string',
        type: 'text',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        label: 'some label',
        name: 'name'
      },
      age: {
        value: 33,
        type: 'number',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        step: 5,
        name: 'age'
      },
      isLeet: {
        value: true,
        type: 'checkbox',
        validators: [],
        disabled: false,
        errors: [],
        required: false,
        name: 'isLeet',
        indeterminate: true
      }
    })
  })
})
