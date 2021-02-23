import { updateFieldValue } from 'lib/reducer/actions'
import { FormSchema } from 'lib/schema'
import createValueUpdater from './createValueUpdater'

describe('createValueUpdater', () => {
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

    const valueUpdater = createValueUpdater(dispatch, schema)

    expect(valueUpdater).toEqual(expect.any(Function))

    valueUpdater({ key: 'name', value: 'hello' })

    expect(dispatch).toHaveBeenCalledTimes(1)
    expect(dispatch).toHaveBeenCalledWith(
      updateFieldValue({
        key: 'name',
        value: 'hello',
        type: 'text'
      })
    )
  })
})
