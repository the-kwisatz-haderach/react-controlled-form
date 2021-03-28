function actionCreatorFactory<P extends void, T extends string>(
  type: T
): (payload?: P) => { type: T }

function actionCreatorFactory<
  P extends Record<string, unknown>,
  T extends string
>(type: T): (payload: P) => { type: T; payload: P }

function actionCreatorFactory<
  P extends Record<string, unknown>,
  T extends string
>(
  type: T,
  payloadPreparer?: (payload: P) => P
): (payload: P) => { type: T; payload: P }

function actionCreatorFactory(type: any, payloadPreparer?: any) {
  return (payload: any) => ({
    type,
    payload: payloadPreparer ? payloadPreparer(payload) : payload
  })
}

export default actionCreatorFactory
