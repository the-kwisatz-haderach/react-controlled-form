import { updateFieldValue } from 'lib/reducer/actions'
import { FormSchema } from 'lib/schema'
import createValueUpdater from './createValueUpdater'

describe('createValueUpdater', () => {
  it('runs the provided handler on an object consisting of the fields and their values', () => {
    const dispatch = jest.fn()
    const schema: FormSchema<{
      name: 'text'
      age: 'number'
      isLeet: 'checkbox'
    }> = {
      name: {
        value: 'test',
        disabled: true,
        placeholder: '',
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
      },
      isLeet: {
        value: false,
        disabled: false,
        label: 'test',
        error: 'none',
        type: 'checkbox'
      }
    }

    const valueUpdater = createValueUpdater(dispatch, schema)

    expect(valueUpdater).toEqual(expect.any(Function))

    valueUpdater({ key: 'name', value: 'hello' })
    valueUpdater({ key: 'age', value: 33 })
    valueUpdater({ key: 'isLeet' })

    expect(dispatch).toHaveBeenCalledTimes(3)
    expect(dispatch).toHaveBeenNthCalledWith(
      1,
      updateFieldValue({
        key: 'name',
        value: 'hello',
        type: 'text'
      })
    )
    expect(dispatch).toHaveBeenNthCalledWith(
      2,
      updateFieldValue({
        key: 'age',
        value: 33,
        type: 'number'
      })
    )
    expect(dispatch).toHaveBeenNthCalledWith(
      3,
      updateFieldValue({
        key: 'isLeet',
        type: 'checkbox'
      })
    )
  })
})
