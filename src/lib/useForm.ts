import { useCallback, useMemo, useReducer } from 'react'
import { updateFieldValue } from './actions/actions'
import createChainDispatcher from './helpers/createChainDispatcher/createChainDispatcher'
import { defaultPreventer } from './helpers/createEventInterceptor/createEventInterceptor'
import formConstantsCreator from './helpers/formConstantsCreator/formConstantsCreator'
import { initFormState } from './helpers/initFormState'
import { createFormReducer } from './reducers'
import { FieldTypeSchema, FormSchema, schemaCreator } from './schema'
import { FormConstants, FormState } from './schema/types'
import isFieldTypeSchema from './typeGuards/isFieldTypeSchema'
import { SubmitForm, SubmitHandler, UseFormProps, ValueUpdater } from './types'

const submitDispatcher = createChainDispatcher([])
const valueDispatcher = createChainDispatcher([])

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>
): UseFormProps<T> => {
  const formSchema = useMemo(
    () => (isFieldTypeSchema(schema) ? schemaCreator(schema)() : schema),
    [schema]
  )

  const { props, fields }: FormConstants<T> = useMemo(
    () => formConstantsCreator(formSchema),
    [formSchema]
  )

  const [state, dispatch] = useReducer(
    createFormReducer(initFormState(formSchema)),
    formSchema,
    initFormState
  )

  const updateValue: ValueUpdater<T> = useCallback(
    (payload) => {
      let value = payload.value
      const { type } = props[payload.key]
      if (type === 'checkbox' && payload.value === undefined) {
        value = !state[payload.key].value
      }
      dispatch(
        updateFieldValue({
          ...payload,
          value
        })
      )
      valueDispatcher(dispatch)
    },
    [state, props, valueDispatcher, updateFieldValue, dispatch]
  )

  const submitForm: SubmitForm = useCallback(
    defaultPreventer((e) => {
      submitDispatcher(dispatch)
      const formValues = Object.entries(state).reduce(
        (acc, [key, values]) => ({
          ...acc,
          [key]: values.value
        }),
        {} as {
          [K in keyof FormState<T>]: FormState<T>[keyof T]['value']
        }
      )
      submitHandler(formValues, e)
    }),
    [state, submitHandler, dispatch, submitDispatcher, defaultPreventer]
  )

  const fieldHasErrors = useCallback(
    (field: FormState<T>[keyof FormState<T>]) => field.error !== '',
    []
  )

  return {
    submitForm,
    updateValue,
    state,
    fields,
    props,
    get hasErrors() {
      return Object.values(state).some(fieldHasErrors)
    }
  }
}

export default useForm
