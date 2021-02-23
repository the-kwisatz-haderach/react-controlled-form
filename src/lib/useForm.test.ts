import { act, renderHook } from '@testing-library/react-hooks'
import schemaCreator from './schema'
import useForm from './useForm'

describe('useForm', () => {
  describe('without options', () => {
    test('returned values', () => {
      const formSchema = schemaCreator({ name: 'text' })()
      const submitHandler = jest.fn()
      const { result } = renderHook(() => useForm(formSchema, submitHandler))

      expect(result.current.values).toEqual(formSchema)
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

      expect(result.current.values.name.value).toEqual('hello world')
    })
    test('submitForm', () => {
      const formSchema = schemaCreator({ name: 'text' })()
      const submitHandler = jest.fn()
      const { result } = renderHook(() => useForm(formSchema, submitHandler))

      act(() => {
        result.current.updateValue({ key: 'name', value: 'hello world' })
      })
      act(() => {
        result.current.submitForm({ preventDefault: () => ({}) } as any)
      })

      expect(submitHandler).toHaveBeenCalledTimes(1)
      expect(submitHandler).toHaveBeenCalledWith({ name: 'hello world' })
    })
  })
})
