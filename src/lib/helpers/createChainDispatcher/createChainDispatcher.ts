import { Dispatch } from 'react'

export type ChainableAction<T> = (args: {
  payload: T
  stopExecution: () => void
  dispatch: Dispatch<any>
}) => void

type ChainDispatcherCreator = <T = void>(
  actionSequence: ChainableAction<T>[],
  dispatch: Dispatch<any>
) => (payload: T) => void

const createChainDispatcher: ChainDispatcherCreator = (
  actionSequence,
  dispatch
) => {
  let shouldExecute = true
  const stopExecution = () => {
    shouldExecute = !shouldExecute
  }

  return (payload): void => {
    shouldExecute = true
    for (const action of actionSequence) {
      if (!shouldExecute) break
      action({ payload, stopExecution, dispatch })
    }
  }
}

export default createChainDispatcher
