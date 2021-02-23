export function actionCreatorFactory<P extends void, T extends string>(
  type: T
): (payload?: P) => { type: T }

export function actionCreatorFactory<P extends {}, T extends string>(
  type: T
): (payload: P) => { type: T; payload: P }

export default function actionCreatorFactory(type: any) {
  return (payload: any) => ({
    type,
    payload
  })
}
