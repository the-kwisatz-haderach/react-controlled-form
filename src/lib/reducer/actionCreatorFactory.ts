export function actionCreatorFactory<P extends void, T extends string>(
  type: T
): (payload?: P) => { type: T }

export function actionCreatorFactory<
  P extends Record<string, unknown>,
  T extends string
>(type: T): (payload: P) => { type: T; payload: P }

export default function actionCreatorFactory<T extends string>(type: T) {
  return (payload: unknown): { type: T; payload: unknown } => ({
    type,
    payload
  })
}
