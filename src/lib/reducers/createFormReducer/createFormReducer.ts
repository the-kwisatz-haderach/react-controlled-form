import type { Reducer } from 'react'
import { initFormState } from 'lib/helpers/initFormState'
import defaultFieldValues from 'lib/schema/defaultFieldValues'
import type { FieldTypeSchema, FormSchema, FormState } from '../../schema/types'
import {
  UPDATE_VALUE,
  CLEAR_FORM,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  RESET_FORM,
  FormActions
} from '../../actions/actions'

export type FormReducer<T extends FieldTypeSchema> = Reducer<
  FormState<T>,
  FormActions
>

const createFormReducer = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>
): FormReducer<T> => (state, action) => {
  switch (action.type) {
    case UPDATE_VALUE: {
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          value:
            action.payload.value === undefined &&
            formSchema[action.payload.key].type === 'checkbox'
              ? !state[action.payload.key].value
              : action.payload.value
        }
      }
    }
    case CLEAR_FORM: {
      return Object.entries(state).reduce<FormState<T>>(
        (acc, [key, values]) => ({
          ...acc,
          [key]: {
            ...values,
            value: defaultFieldValues[formSchema[key].type].value,
            error: ''
          }
        }),
        state
      )
    }
    case VALIDATE_FORM: {
      return state
    }
    case VALIDATE_FIELD: {
      return {
        ...state
      }
    }
    case RESET_FORM: {
      return initFormState(formSchema)
    }
    default: {
      return state
    }
  }
}

export default createFormReducer
