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
import { formHasErrors } from './helpers/formHasErrors'
import formConstantsCreator from './helpers/formConstantsCreator/formConstantsCreator'
import { initFormState } from './helpers/initFormState'
import { reduceFormValues } from './helpers/reduceFormValues'
import { createFormReducer } from './reducers'
import { FieldTypeSchema, FormSchema, schemaCreator } from './schema'
import isFieldTypeSchema from './typeGuards/isFieldTypeSchema'
import { SubmitHandler, UseFormProps } from './types'

/*
type TEST = {

}
*/

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>
): UseFormProps<T> => {
  const { formSchema, fieldProps, fieldKeys } = useMemo(() => {
    const formSchema = isFieldTypeSchema(schema)
      ? schemaCreator(schema)()
      : schema
    const formConstants = formConstantsCreator(formSchema)
    return {
      ...formConstants,
      formSchema
    }
  }, [schema])

  const [state, dispatch] = useReducer(
    createFormReducer(formSchema),
    formSchema,
    initFormState
  )

  const submitter: Action<SyntheticEvent<HTMLFormElement>> = useCallback(
    ({ payload, stopExecution }) => {
      if (formHasErrors(state)) {
        return stopExecution()
      }
      const formValues = reduceFormValues(state)
      submitHandler(formValues, payload)
    },
    [state, submitHandler]
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
    get hasErrors() {
      return formHasErrors(state)
    }
  }
}

export default useForm
