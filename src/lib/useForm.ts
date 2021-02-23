import { useReducer, useCallback } from 'react'
import { FieldTypeSchema, FormSchema } from './schema'
import { formReducer, initFormState, FormReducer } from './reducer'
import { createSubmitHandler, createValueUpdater } from './helpers'
import { ValueDispatcher, UseFormProps, ValueUpdater } from './types'
import { FormActions, updateFieldValue } from './reducer/actions'
import { FieldType } from './schema/types'
import { DeepPartial } from './utilityTypes'

/*
  globalFieldOptions
  validationMode: onSubmit | onChange
  sanitation
  clearForm
*/

const updateFieldValueAction = (
  data: {
    key: keyof FormSchema<any>
    value?: string | number | boolean | undefined
  } & {
    values: FormSchema<any>
  }
) =>
  updateFieldValue({
    ...data,
    type: data.values[data.key].type as FieldType
  })

const useForm = <T extends FieldTypeSchema<Record<string, unknown>>>(
  formSchema: FormSchema<T> | T,
  submitHandler: ValueDispatcher<FormSchema<T>>
): UseFormProps<FormSchema<T>> => {
  const [values, dispatch] = useReducer<FormReducer<T>, T | FormSchema<T>>(
    formReducer,
    formSchema,
    initFormState
  )

  const updateValue = useCallback(
    createValueUpdater(dispatch, { values }, [updateFieldValueAction]),
    [values]
  )

  const submitForm = useCallback(
    createSubmitHandler(submitHandler)(dispatch, values, []),
    [submitHandler, values]
  )

  return { values, submitForm, updateValue }
}

export default useForm
