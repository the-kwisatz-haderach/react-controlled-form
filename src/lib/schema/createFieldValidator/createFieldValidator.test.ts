import { createFieldValidator } from '.'

describe('createFieldValidator', () => {
  it('returns a validator function compatible with a particular field type', () => {
    const textValidator = createFieldValidator<'text'>(
      (value) => value === '',
      'Value cant be empty!'
    )
    expect(textValidator).toEqual(expect.any(Function))
  })
  it('validates fields based on their current value', () => {
    const textValidator = createFieldValidator<'text'>(
      (value) => value === '',
      'Value cant be empty!'
    )
    expect(
      textValidator('test', {
        initialValue: '',
        formState: {}
      })
    ).toBeUndefined()
    expect(
      textValidator('', {
        initialValue: '',
        formState: {}
      })
    ).toEqual('Value cant be empty!')
  })
  it('can take initialValue into account when validating a field', () => {
    const textValidator = createFieldValidator(
      (value, { initialValue }) => value === initialValue,
      'Value cant be same as initial value!'
    )

    expect(
      textValidator('', {
        initialValue: 'test',
        formState: {} as any
      })
    ).toBeUndefined()
    expect(
      textValidator('test', {
        initialValue: 'test',
        formState: {} as any
      })
    ).toEqual('Value cant be same as initial value!')
  })
  it('can take the rest of the formState into account when validating a field', () => {
    const textValidator = createFieldValidator<'text'>(
      (value, { formState }) =>
        value === 'sauron' && formState.age.value < 54960,
      'Sauron is at least 54,960 years old!'
    )

    expect(
      textValidator('sauron', {
        initialValue: '',
        formState: {
          age: {
            value: 54960
          }
        } as any
      })
    ).toBeUndefined()
    expect(
      textValidator('sauron', {
        initialValue: '',
        formState: {
          age: {
            value: 54959
          }
        } as any
      })
    ).toEqual('Sauron is at least 54,960 years old!')
  })
})
