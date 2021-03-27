import React from 'react'
import { useForm } from '../lib'
import { FormSchema } from '../lib/schema'
import { SubmitHandler } from '../lib/types'

type Fields = {
  name: 'text'
  age: 'number'
  isLeet: 'checkbox'
}

export type FormProps = {
  formSchema: FormSchema<Fields>
  submitHandler: SubmitHandler<Fields>
}

/**
 * Simple form.
 */
export const Form: React.FC<FormProps> = ({ formSchema, submitHandler }) => {
  const { submitForm, updateValue, state, fieldProps } = useForm(
    formSchema,
    submitHandler
  )

  return (
    <form onSubmit={submitForm}>
      <input
        {...fieldProps.name}
        value={state.name.value}
        onChange={(e) => {
          updateValue({ key: 'name', value: e.target.value })
        }}
      />
      <input
        {...fieldProps.age}
        value={state.age.value}
        onChange={(e) => {
          updateValue({ key: 'age', value: +e.target.value })
        }}
      />
      <input
        {...fieldProps.isLeet}
        checked={state.isLeet.value}
        onChange={(e) => {
          updateValue({ key: 'isLeet' })
        }}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
