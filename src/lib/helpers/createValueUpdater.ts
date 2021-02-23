import { FormSchema } from '../schema/types'
import { FormActions } from '../reducer/actions'
import { ValueUpdater, ChainDispatcher } from '../types'

type OnValueUpdateDispatcher = ChainDispatcher<
  FormActions,
  { values: FormSchema<any> },
  {
    key: keyof FormSchema<any>
    value?: FormSchema<any>[keyof FormSchema<any>]['value']
  },
  ValueUpdater<any>
>

// const createValueUpdater: LOL = <T extends FieldTypeSchema<any>>(
//   dispatch: FormActionDispatcher,
//   values: FormSchema<T>,
//   actions: FormActionCreator[]
// ): ValueUpdater<T> => (payload): void => {
//   actions.forEach((action) => {
//     dispatch(action({ payload, values }))
//   })
// }

const createValueUpdater: OnValueUpdateDispatcher = (
  dispatch,
  values,
  actionCreators
) => (payload): void => {
  actionCreators.forEach((actionCreator) => {
    dispatch(actionCreator({ ...payload, ...values }))
  })
}

export default createValueUpdater
