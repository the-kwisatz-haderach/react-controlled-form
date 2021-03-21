import React from 'react'
import useForm from '../lib'
import { FormSchema } from '../lib/schema'
import { SubmitHandler } from '../lib/types'

export type FormProps = {
  formSchema: FormSchema<{
    name: 'text'
    age: 'number'
    isLeet: 'checkbox'
  }>
  submitHandler: SubmitHandler<{
    name: 'text'
    age: 'number'
    isLeet: 'checkbox'
  }>
}

/**
 * Simple form.
 */
export const Form: React.FC<FormProps> = ({ formSchema, submitHandler }) => {
  const { submitForm, updateValue, values, props } = useForm(
    formSchema,
    submitHandler
  )

  console.log(props)

  return (
    <form onSubmit={submitForm}>
      <input
        {...props.name}
        value={values.name}
        onChange={(e) => {
          updateValue({ key: 'name', value: e.target.value })
        }}
      />
      <input
        {...props.age}
        value={values.age}
        onChange={(e) => {
          updateValue({ key: 'age', value: +e.target.value })
        }}
      />
      <input
        {...props.isLeet}
        checked={values.isLeet}
        onChange={(e) => {
          updateValue({ key: 'isLeet' })
        }}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
