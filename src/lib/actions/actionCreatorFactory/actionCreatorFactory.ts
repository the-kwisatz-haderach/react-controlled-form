export function actionCreatorFactory<P extends void, T extends string>(
  type: T
): (payload?: P) => { type: T }

export function actionCreatorFactory<
  P extends Record<string, unknown>,
  T extends string
>(type: T): (payload: P) => { type: T; payload: P }

export default function actionCreatorFactory<
  P extends Record<string, unknown> | void,
  T extends string
>(type: T) {
  return (payload: P): { type: T; payload: P } => ({
    type,
    payload
  })
}
