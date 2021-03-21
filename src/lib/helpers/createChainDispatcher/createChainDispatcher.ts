import { Dispatch } from 'react'

type Action<
  T extends string = string,
  P extends Record<string, unknown> | void = void
> = P extends void
  ? {
      type: T
      payload?: P
    }
  : {
      type: T
      payload: P
    }

type ActionCreator<A extends Action> = (payload?: A['payload']) => A

const createChainDispatcher = (actionCreators: ActionCreator<any>[]) => (
  dispatch: Dispatch<any>
): void => {
  actionCreators.forEach((action) => {
    dispatch(action())
  })
}

export default createChainDispatcher
