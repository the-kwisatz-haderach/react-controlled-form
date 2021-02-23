import { FormSchema } from 'lib/schema'
import createSubmitHandler from './createSubmitHandler'

describe('createSubmitHandler', () => {
  it('runs the provided handler on an object consisting of the fields and their values', () => {
    const dispatch = jest.fn()
    const schema: FormSchema<any> = {
      name: {
        value: 'test',
        disabled: true,
        label: '',
        error: '',
        type: 'text'
      },
      age: {
        value: 25,
        disabled: false,
        label: 'test',
        error: 'none',
        type: 'number'
      }
    }
    const submitHandler = createSubmitHandler(dispatch, schema)

    expect(submitHandler).toEqual(expect.any(Function))

    submitHandler({ preventDefault: () => {} } as any)

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith({ name: 'test', age: 25 })
  })
})
