import { useReducer, useCallback } from 'react'
import { FieldTypeSchema, FormSchema } from './schema'
import { formReducer, initFormState, FormReducer } from './reducer'
import { createSubmitHandler, createValueUpdater } from './helpers'
import { ValueDispatcher, UseFormProps } from './types'
import { updateFieldValue } from './reducer/actions'
import { FieldType, FormField } from './schema/types'
import { DeepPartial } from './utilityTypes'

/*
  globalFieldOptions
  validationMode: onSubmit | onChange
  sanitation
  clearForm
  take options and return actionCreators to run in sequence
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

type FieldDefaults = {
  [K in FieldType]: FormField<K>
}

export type Options = DeepPartial<{
  fieldDefaults: FieldDefaults
}>

const useForm = <T extends FieldTypeSchema<Record<string, unknown>>>(
  formSchema: FormSchema<T> | T,
  submitHandler: ValueDispatcher<FormSchema<T>>,
  options: Options = {}
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
