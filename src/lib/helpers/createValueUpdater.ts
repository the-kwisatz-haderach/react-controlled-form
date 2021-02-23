import {
  FieldTypeSchema,
  FormActionDispatcher,
  FormSchema
} from '../schema/types'
import { updateFieldValue } from '../reducer/actions'
import { ValueUpdater } from '../types'

const createValueUpdater = <T extends FieldTypeSchema<any>>(
  dispatch: FormActionDispatcher,
  values: FormSchema<T>
): ValueUpdater<T> => (payload): void => {
  dispatch(
    updateFieldValue({
      ...payload,
      type: values[payload.key].type
    })
  )
}

export default createValueUpdater
