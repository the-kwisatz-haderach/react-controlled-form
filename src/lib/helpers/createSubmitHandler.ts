import { mapValues } from 'lodash'
import { FieldTypeSchema, FormSchema } from '../schema/types'
import { FormSubmitHandler, SubmitHandler } from '../types'

const createSubmitHandler = <T extends FieldTypeSchema<any>>(
  submitHandler: SubmitHandler<FormSchema<T>>,
  values: FormSchema<T>
): FormSubmitHandler => (e): void => {
  e.preventDefault()
  submitHandler(mapValues(values, (field) => field.value))
}

export default createSubmitHandler
