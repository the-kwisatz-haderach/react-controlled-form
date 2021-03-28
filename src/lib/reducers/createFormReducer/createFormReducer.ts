import type { Reducer } from 'react'
import { initFormState } from 'lib/helpers/initFormState'
import defaultFieldValues from 'lib/schema/defaultFieldValues'
import type {
  FieldTypeSchema,
  FieldValidator,
  FormSchema,
  FormState,
  HookOptions
} from '../../schema/types'
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

type ValidatorMap<T extends FieldTypeSchema> = {
  [K in keyof T]: FieldValidator<T[K], T>[]
}

const createFormReducer = <T extends FieldTypeSchema>(
  formSchema: FormSchema<T>,
  globalValidators: Partial<HookOptions<T>['fieldTypeValidation']> = {}
): FormReducer<T> => {
  const validatorMap: ValidatorMap<T> = Object.keys(formSchema).reduce<
    ValidatorMap<T>
  >((acc, key) => {
    const fieldTypeValidation = globalValidators[formSchema[key].type] ?? []
    return {
      ...acc,
      [key]: [...fieldTypeValidation, ...formSchema[key].validators]
    }
  }, {} as ValidatorMap<T>)

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
        return Object.entries(state).reduce<FormState<T>>(
          (acc, [key, values]) => ({
            ...acc,
            [key]: {
              ...values,
              value: defaultFieldValues[formSchema[key].type].value,
              errors: []
            }
          }),
          state
        )
      }
      case VALIDATE_FORM: {
        return Object.keys(state).reduce<FormState<T>>((acc, key) => {
          return {
            ...acc,
            [key]: {
              ...acc[key],
              errors: validatorMap[key].flatMap((validator) =>
                validator(state[key].value, {
                  initialValue: formSchema[key].value,
                  formState: state
                })
              )
            }
          }
        }, state)
      }
      case VALIDATE_FIELD: {
        const { value } = formSchema[action.payload.key]
        const validators = validatorMap[action.payload.key]
        const errors = validators.flatMap((validator) =>
          validator(state[action.payload.key].value, {
            initialValue: value,
            formState: state
          })
        )
        return {
          ...state,
          [action.payload.key]: {
            ...state[action.payload.key],
            errors
          }
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
}

export default createFormReducer
