import { act, renderHook } from '@testing-library/react-hooks'
import { initFormState } from './helpers/initFormState'
import { schemaCreator } from './schema'
import useForm from './useForm'

describe('useForm', () => {
  test('returned values', () => {
    const formSchema = schemaCreator({ name: 'text' })()
    const submitHandler = jest.fn()
    const { result } = renderHook(() => useForm(formSchema, submitHandler))

    expect(result.current.state).toEqual(initFormState(formSchema))
    expect(typeof result.current.submitForm).toEqual('function')
    expect(typeof result.current.updateValue).toEqual('function')
  })
  test('updateValue', () => {
    const formSchema = schemaCreator({ name: 'text' })()
    const submitHandler = jest.fn()
    const { result } = renderHook(() => useForm(formSchema, submitHandler))

    act(() => {
      result.current.updateValue({ key: 'name', value: 'hello world' })
    })

    expect(result.current.state.name.value).toEqual('hello world')
  })
  describe('submitForm', () => {
    it('runs the provided submitHandler with the formValues', () => {
      const formSchema = schemaCreator({ name: 'text' })()
      const submitHandler = jest.fn()
      const event = { preventDefault: jest.fn() } as any
      const { result } = renderHook(() => useForm(formSchema, submitHandler))

      act(() => {
        result.current.updateValue({ key: 'name', value: 'hello world' })
      })
      act(() => {
        result.current.submitForm(event)
      })

      expect(submitHandler).toHaveBeenCalledTimes(1)
      expect(submitHandler).toHaveBeenCalledWith({ name: 'hello world' }, event)
      expect(event.preventDefault).toHaveBeenCalledTimes(1)
    })
    it('doesnt run the submitHandler if there are validation errors', () => {
      const formSchema = schemaCreator({ name: 'text' })({
        name: 'hello world'
      })
      const submitHandler = jest.fn()
      const event = { preventDefault: jest.fn() } as any
      const { result } = renderHook(() =>
        useForm(
          {
            ...formSchema,
            name: {
              ...formSchema.name,
              errors: ['some error!']
            }
          },
          submitHandler
        )
      )

      act(() => {
        result.current.submitForm(event)
      })

      expect(submitHandler).toHaveBeenCalledTimes(0)
      expect(event.preventDefault).toHaveBeenCalledTimes(1)
    })
  })
})
