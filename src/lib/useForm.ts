import { SyntheticEvent, useMemo, useReducer, useRef } from 'react'
import {
  preventDefault,
  updateFieldAction,
  validateFieldAction,
  validateFormAction,
  clearFormAction,
  SubmitAction
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

const createSubmitSequence = <T extends FieldTypeSchema>(
  submitHandler: Action<SyntheticEvent<HTMLFormElement>>,
  options: HookOptions<T>
): SubmitAction[] => {
  const actionSequence: SubmitAction[] = [
    preventDefault,
    validateFormAction,
    submitHandler
  ]

  if (options.clearOnSubmit) actionSequence.push(clearFormAction)

  return actionSequence
}

const createHookOptions = <T extends FieldTypeSchema>(
  options: Partial<HookOptions<T>> = {}
): HookOptions<T> => ({
  fieldTypeValidation: {},
  clearOnSubmit: false,
  validateOn: 'submit',
  ...options
})

const useForm = <T extends FieldTypeSchema>(
  schema: FormSchema<T> | T,
  submitHandler: SubmitHandler<T>,
  options?: Partial<HookOptions<T>>
): UseFormProps<T> => {
  const activeOptions = createHookOptions(options)

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
    createFormReducer(formSchema, activeOptions.fieldTypeValidation),
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
