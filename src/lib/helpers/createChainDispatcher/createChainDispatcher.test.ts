import { createChainDispatcher } from '.'

describe('createChainDispatcher', () => {
  it('returns a function which will run the provided actions in sequence', () => {
    const action1 = jest.fn(({ payload, dispatch }) => {
      dispatch(payload)
    })
    const action2 = jest.fn()
    const action3 = jest.fn()
    const mockDispatch = jest.fn()
    const actionDispatcher = createChainDispatcher<string>(
      [action1, action2, action3],
      mockDispatch
    )

    actionDispatcher('payload')

    expect(action1).toHaveBeenCalledTimes(1)
    expect(action2).toHaveBeenCalledTimes(1)
    expect(action3).toHaveBeenCalledTimes(1)
    expect(action1).toHaveBeenCalledWith({
      payload: 'payload',
      stopExecution: expect.any(Function),
      dispatch: mockDispatch
    })
    expect(action2).toHaveBeenCalledWith({
      payload: 'payload',
      stopExecution: expect.any(Function),
      dispatch: mockDispatch
    })
    expect(action3).toHaveBeenCalledWith({
      payload: 'payload',
      stopExecution: expect.any(Function),
      dispatch: mockDispatch
    })
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch).toHaveBeenCalledWith('payload')
  })
  it('provides actions with a function for stopping execution', () => {
    const action1 = jest.fn(({ stopExecution }) => {
      stopExecution()
    })
    const action2 = jest.fn()
    const action3 = jest.fn()
    const mockDispatch = jest.fn()
    const actionDispatcher = createChainDispatcher<string>(
      [action1, action2, action3],
      mockDispatch
    )

    actionDispatcher('payload')

    expect(action1).toHaveBeenCalledTimes(1)
    expect(action2).toHaveBeenCalledTimes(0)
    expect(action3).toHaveBeenCalledTimes(0)
  })
})
