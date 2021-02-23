import { UPDATE_VALUE, FormActions } from './actions'
import { FieldTypeSchema, FormSchema } from '../schema/types'
import reduceFieldValue from './reduceFieldValue'

const formReducer = <T extends FieldTypeSchema<Record<string, unknown>>>(
  state: FormSchema<T>,
  action: FormActions
): FormSchema<T> => {
  switch (action.type) {
    case UPDATE_VALUE: {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: reduceFieldValue(state, action)
        }
      }
    }
    default: {
      return state
    }
  }
}

export default formReducer
