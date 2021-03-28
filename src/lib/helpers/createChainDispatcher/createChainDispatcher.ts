import { Dispatch } from 'react'

export type Action<T> = (args: {
  payload: T
  stopExecution: () => void
  dispatch: Dispatch<any>
}) => void

const createChainDispatcher = <T = void>(
  actionSequence: Action<T>[],
  dispatch: Dispatch<any>
) => {
  let shouldExecute = true
  const stopExecution = () => {
    shouldExecute = !shouldExecute
  }

  return (payload: T): void => {
    shouldExecute = true
    for (const action of actionSequence) {
      if (!shouldExecute) break
      action({ payload, stopExecution, dispatch })
    }
  }
}

export default createChainDispatcher
