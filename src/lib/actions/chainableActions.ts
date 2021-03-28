import { SyntheticEvent } from 'react'
import { Action } from 'lib/helpers/createChainDispatcher'
import { updateFieldValue, validateField, validateForm } from './actions'

type SubmitAction = Action<SyntheticEvent<HTMLFormElement>>
type UpdateAction = Action<{
  key: string
  value?: any
}>

export const preventDefault: SubmitAction = ({ payload }) => {
  payload.preventDefault()
}

export const validateFormAction: SubmitAction = ({ dispatch }) =>
  dispatch(validateForm())

export const updateFieldAction: UpdateAction = ({ dispatch, payload }) =>
  dispatch(updateFieldValue(payload))

export const validateFieldAction: UpdateAction = ({ dispatch, payload }) =>
  dispatch(validateField(payload))
