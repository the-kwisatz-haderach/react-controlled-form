import { SyntheticEvent, useCallback, useMemo, useReducer } from 'react'
import {
  preventDefault,
  updateFieldAction,
  validateFieldAction,
  validateFormAction
} from './actions/chainableActions'
import createChainDispatcher, {
  Action
} from './helpers/createChainDispatcher/createChainDispatcher'
import { fieldHasErrors } from './helpers/fieldHasErrors'
import formConstantsCreator from './helpers/formConstantsCreator/formConstantsCreator'
import { initFormState } from './helpers/initFormState'
import { reduceFormValues } from './helpers/reduceFormValues'
import { createFormReducer } from './reducers'
import { FieldTypeSchema, FormSchema, schemaCreator } from './schema'
import isFieldTypeSchema from './typeGuards/isFieldTypeSchema'
import { SubmitHandler, UseFormProps } from './types'

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>
): UseFormProps<T> => {
  const formSchema = useMemo(
    () => (isFieldTypeSchema(schema) ? schemaCreator(schema)() : schema),
    [schema]
  )

  const { fieldProps, fieldKeys } = useMemo(
    () => formConstantsCreator(formSchema),
    [formSchema]
  )

  const [state, dispatch] = useReducer(
    createFormReducer(formSchema),
    formSchema,
    initFormState
  )

  const hasErrors = useCallback(
    () => Object.values(state).some(fieldHasErrors),
    [state]
  )

  const submitter: Action<SyntheticEvent<HTMLFormElement>> = useCallback(
    ({ payload, stopExecution }) => {
      if (hasErrors()) {
        return stopExecution()
      }
      const formValues = reduceFormValues(state)
      submitHandler(formValues, payload)
    },
    [state, submitHandler, hasErrors]
  )

  const submitForm = useMemo(
    () =>
      createChainDispatcher(
        [preventDefault, validateFormAction, submitter],
        dispatch
      ),
    [submitter]
  )

  const updateValue = useMemo(
    () =>
      createChainDispatcher([updateFieldAction, validateFieldAction], dispatch),
    []
  )

  return {
    submitForm,
    updateValue,
    fieldKeys,
    fieldProps,
    state,
    hasErrors
  }
}

export default useForm
