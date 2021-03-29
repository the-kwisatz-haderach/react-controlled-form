import { SyntheticEvent } from 'react'
import { Action } from 'lib/helpers/createChainDispatcher'
import {
  clearForm,
  updateFieldValue,
  validateField,
  validateForm
} from './actions'

export type SubmitAction = Action<SyntheticEvent<HTMLFormElement>>
export type UpdateAction = Action<{
  key: string
  value?: any
}>

export const preventDefault: SubmitAction = ({ payload }) => {
  payload.preventDefault()
}

export const validateFormAction: SubmitAction = ({ dispatch }) =>
  dispatch(validateForm())

export const clearFormAction: SubmitAction = ({ dispatch }) =>
  dispatch(clearForm())

export const updateFieldAction: UpdateAction = ({ dispatch, payload }) =>
  dispatch(updateFieldValue(payload))

export const validateFieldAction: UpdateAction = ({ dispatch, payload }) =>
  dispatch(validateField(payload))
