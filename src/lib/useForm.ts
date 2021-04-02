import { SyntheticEvent, useMemo, useReducer } from 'react'
import {
  preventDefault,
  updateFieldAction,
  validateFieldAction,
  validateFormAction,
  clearFormAction,
  SubmitAction
} from './actions/chainableActions'
import createChainDispatcher, {
  ChainableAction
} from './helpers/createChainDispatcher/createChainDispatcher'
import { formHasErrors } from './helpers/formHasErrors'
import formConstantsCreator from './helpers/formConstantsCreator/formConstantsCreator'
import { initFormState } from './helpers/initFormState'
import { reduceFormValues } from './helpers/reduceFormValues'
import { createFormReducer } from './reducers'
import { HookOptions, inputSchemaTransformer } from './schema'
import { SubmitHandler, UseFormProps } from './types'
import { InputSchema, OutputSchema } from './schema/types'
import { clearForm } from './actions/actions'

const createSubmitSequence = <T extends OutputSchema>(
  submitHandler: ChainableAction<SyntheticEvent<HTMLFormElement>>,
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

const createHookOptions = <T extends OutputSchema>(
  options: Partial<HookOptions<T>> = {}
): HookOptions<T> => ({
  fieldTypeValidation: {},
  clearOnSubmit: false,
  validateOn: 'submit',
  ...options
})

const useForm = <T extends InputSchema>(
  schema: T,
  submitHandler: SubmitHandler<OutputSchema<T>>,
  options?: Partial<HookOptions<OutputSchema<T>>>
): UseFormProps<OutputSchema<T>> => {
  const { formSchema, formProps, reducer, activeOptions } = useMemo(() => {
    const activeOptions = createHookOptions(options)
    const formSchema = inputSchemaTransformer(schema)
    const formProps = formConstantsCreator(formSchema)
    const reducer = createFormReducer(
      formSchema,
      activeOptions.fieldTypeValidation
    )
    return {
      formProps,
      formSchema,
      reducer,
      activeOptions
    }
  }, [schema, options])

  const [state, dispatch] = useReducer(reducer, formSchema, initFormState)

  const submitSequence = useMemo(
    () => createChainDispatcher([preventDefault, validateFormAction], dispatch),
    []
  )

  const updateValue = useMemo(
    () =>
      createChainDispatcher([updateFieldAction, validateFieldAction], dispatch),
    []
  )

  const submitForm = (e: SyntheticEvent<HTMLFormElement>) => {
    submitSequence(e)
    if (formHasErrors(state)) {
      return
    }
    const formValues = reduceFormValues(state)
    submitHandler(formValues, e)
    if (activeOptions.clearOnSubmit) {
      dispatch(clearForm())
    }
  }

  return {
    state,
    submitForm,
    updateValue,
    props: formProps,
    get hasErrors() {
      return formHasErrors(state)
    }
  }
}

export default useForm
