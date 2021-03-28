import { SyntheticEvent, useMemo, useReducer, useRef } from 'react'
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
import {
  FieldTypeSchema,
  HookOptions,
  FormSchema,
  schemaCreator
} from './schema'
import isFieldTypeSchema from './typeGuards/isFieldTypeSchema'
import { SubmitHandler, UseFormProps } from './types'

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>,
  options?: HookOptions<T>
): UseFormProps<T> => {
  const { formSchema, formProps } = useMemo(() => {
    const formSchema = isFieldTypeSchema(schema)
      ? schemaCreator(schema)()
      : schema
    const formProps = formConstantsCreator(formSchema)
    return {
      formProps,
      formSchema
    }
  }, [schema])

  const [state, dispatch] = useReducer(
    createFormReducer(formSchema),
    formSchema,
    initFormState
  )

  const submitter: Action<SyntheticEvent<HTMLFormElement>> = ({
    payload,
    stopExecution
  }) => {
    if (formHasErrors(state)) {
      return stopExecution()
    }
    const formValues = reduceFormValues(state)
    submitHandler(formValues, payload)
  }

  const submitForm = createChainDispatcher(
    [preventDefault, validateFormAction, submitter],
    dispatch
  )

  const updateValue = useRef(
    createChainDispatcher([updateFieldAction, validateFieldAction], dispatch)
  ).current

  return {
    submitForm,
    updateValue,
    props: formProps,
    state,
    get hasErrors() {
      return formHasErrors(state)
    }
  }
}

export default useForm
