import { Reducer } from 'react'
import { UPDATE_VALUE, CLEAR_FORM, FormActions } from '../../actions/actions'
import { FieldTypeSchema, FormState } from '../../schema/types'

export type FormReducer<T extends FieldTypeSchema> = Reducer<
  FormState<T>,
  FormActions
>

const createFormReducer = <T extends FieldTypeSchema>(
  initialState: FormState<T>
): FormReducer<T> => (state, action) => {
  switch (action.type) {
    case UPDATE_VALUE: {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value: action.payload.value
        }
      }
    }
    case CLEAR_FORM: {
      return initialState
    }
    default: {
      return state
    }
  }
}

export default createFormReducer
