import { useCallback, useReducer, useRef } from 'react'
import { updateFieldValue } from './actions/actions'
import createChainDispatcher from './helpers/createChainDispatcher/createChainDispatcher'
import { defaultPreventer } from './helpers/createEventInterceptor/createEventInterceptor'
import { fieldHasErrors } from './helpers/fieldHasErrors'
import formConstantsCreator from './helpers/formConstantsCreator/formConstantsCreator'
import { initFormState } from './helpers/initFormState'
import { reduceFormValues } from './helpers/reduceFormValues'
import { createFormReducer } from './reducers'
import { FieldTypeSchema, FormSchema, schemaCreator } from './schema'
import { FormConstants } from './schema/types'
import isFieldTypeSchema from './typeGuards/isFieldTypeSchema'
import { SubmitForm, SubmitHandler, UseFormProps, ValueUpdater } from './types'

const submitDispatcher = createChainDispatcher([])
const valueDispatcher = createChainDispatcher([])

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>
): UseFormProps<T> => {
  const formSchema = useRef(
    isFieldTypeSchema(schema) ? schemaCreator(schema)() : schema
  ).current

  const { fieldProps, fieldKeys }: FormConstants<T> = useRef(
    formConstantsCreator(formSchema)
  ).current

  const [state, dispatch] = useReducer(
    createFormReducer(initFormState(formSchema)),
    formSchema,
    initFormState
  )

  const updateValue: ValueUpdater<T> = useCallback(
    (payload) => {
      let value = payload.value
      const { type } = fieldProps[payload.key]
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
    [state, fieldProps]
  )

  const submitForm: SubmitForm = useCallback(
    defaultPreventer((e) => {
      submitDispatcher(dispatch)
      const formValues = reduceFormValues(state)
      submitHandler(formValues, e)
    }),
    [state, submitHandler]
  )

  return {
    submitForm,
    updateValue,
    fieldKeys,
    fieldProps,
    state,
    get hasErrors() {
      return Object.values(state).some(fieldHasErrors)
    }
  }
}

export default useForm
