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
        getInitialValue: () => '',
        getFormState: () => ({})
      })
    ).toEqual('')
    expect(
      textValidator('', {
        getInitialValue: () => '',
        getFormState: () => ({})
      })
    ).toEqual('Value cant be empty!')
  })
  it('can take initialValue into account when validating a field', () => {
    const textValidator = createFieldValidator<
      'text',
      { name: 'text'; age: 'number' }
    >(
      (value, { getInitialValue }) => value === getInitialValue(),
      'Value cant be same as initial value!'
    )

    expect(
      textValidator('', {
        getInitialValue: () => 'test',
        getFormState: () => ({} as any)
      })
    ).toEqual('')
    expect(
      textValidator('test', {
        getInitialValue: () => 'test',
        getFormState: () => ({} as any)
      })
    ).toEqual('Value cant be same as initial value!')
  })
  it('can take the rest of the formState into account when validating a field', () => {
    const textValidator = createFieldValidator<
      'text',
      { name: 'text'; age: 'number' }
    >(
      (value, { getFormState }) =>
        value === 'sauron' && getFormState().age.value < 54960,
      'Sauron is at least 54,960 years old!'
    )

    expect(
      textValidator('sauron', {
        getInitialValue: () => '',
        getFormState: () =>
          ({
            age: {
              value: 54960
            }
          } as any)
      })
    ).toEqual('')
    expect(
      textValidator('sauron', {
        getInitialValue: () => '',
        getFormState: () =>
          ({
            age: {
              value: 54959
            }
          } as any)
      })
    ).toEqual('Sauron is at least 54,960 years old!')
  })
})
