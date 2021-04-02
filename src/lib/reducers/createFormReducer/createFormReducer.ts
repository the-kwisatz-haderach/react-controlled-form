import type { Reducer } from 'react'
import { initFormState } from '../../helpers/initFormState'
import defaultFieldValues from '../../schema/defaultFieldValues'
import { createSchemaValidator } from 'lib/schema/createSchemaValidator'
import type { FormState, HookOptions, OutputSchema } from '../../schema/types'
import {
  UPDATE_VALUE,
  CLEAR_FORM,
  VALIDATE_FIELD,
  VALIDATE_FORM,
  RESET_FORM,
  FormActions
} from '../../actions/actions'

export type FormReducer<T extends OutputSchema> = Reducer<
  FormState<T>,
  FormActions
>

const createFormReducer = <T extends OutputSchema>(
  formSchema: T,
  globalValidators: Partial<HookOptions<T>['fieldTypeValidation']> = {}
): FormReducer<T> => {
  const schemaValidator = createSchemaValidator(formSchema, globalValidators)
  const initialFormState = initFormState(formSchema)

  return (state, action) => {
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
        return Object.keys(state).reduce<FormState<T>>(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...acc[key],
              value: defaultFieldValues[formSchema[key].type].value,
              errors: []
            }
          }),
          state
        )
      }
      case VALIDATE_FORM: {
        const fieldValidator = schemaValidator(state)
        return Object.keys(state).reduce<FormState<T>>(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...acc[key],
              errors: fieldValidator(key)
            }
          }),
          state
        )
      }
      case VALIDATE_FIELD: {
        const fieldValidator = schemaValidator(state)
        return {
          ...state,
          [action.payload.key]: {
            ...state[action.payload.key],
            errors: fieldValidator(action.payload.key)
          }
        }
      }
      case RESET_FORM: {
        return initialFormState
      }
      default: {
        return state
      }
    }
  }
}

export default createFormReducer
