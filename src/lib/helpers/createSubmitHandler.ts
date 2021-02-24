import { FormActions } from 'lib/reducer/actions'
import { mapValues } from 'lodash'
import { FormEvent } from 'react'
import { FieldTypeSchema, FormSchema } from '../schema/types'
import { ChainDispatcher, FormSubmitHandler, ValueDispatcher } from '../types'

type OnSubmitDispatcher<T extends FieldTypeSchema<any>> = ChainDispatcher<
  FormActions,
  FormSchema<T>,
  FormEvent,
  FormSubmitHandler
>

const createSubmitHandler = <T extends FieldTypeSchema<any>>(
  submitHandler: ValueDispatcher<FormSchema<T>>
): OnSubmitDispatcher<T> => (dispatch, values, actionCreators) => (e): void => {
  e.preventDefault()
  actionCreators.forEach((actionCreator) => {
    dispatch(actionCreator({ ...values, ...e }))
  })
  submitHandler(mapValues(values, (field) => field.value))
}

export default createSubmitHandler
