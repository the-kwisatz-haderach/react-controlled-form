import { SyntheticEvent } from 'react'
import { ChainableAction } from '../helpers/createChainDispatcher'
import {
  clearForm,
  updateFieldValue,
  validateField,
  validateForm
} from './actions'

export type SubmitAction = ChainableAction<SyntheticEvent<HTMLFormElement>>
export type UpdateAction = ChainableAction<{
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
