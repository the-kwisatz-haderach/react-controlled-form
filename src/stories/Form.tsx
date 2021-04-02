import React from 'react'
import { useForm } from '../lib'
import type { OutputSchema } from '../lib/schema/types'
import type { SubmitHandler } from '../lib/types'

type Fields = {
  name: 'text'
  age: 'number'
  isLeet: 'checkbox'
}

export type FormProps = {
  formSchema: OutputSchema<Fields>
  submitHandler: SubmitHandler<OutputSchema<Fields>>
}

/**
 * Simple form.
 */
export const Form: React.FC<FormProps> = ({ formSchema, submitHandler }) => {
  const { submitForm, updateValue, state, props } = useForm(
    formSchema,
    submitHandler
  )

  return (
    <form onSubmit={submitForm}>
      <input
        {...props.name}
        value={state.name.value}
        onChange={(e) => {
          updateValue({ key: 'name', value: e.target.value })
        }}
      />
      <input
        {...props.age}
        value={state.age.value}
        onChange={(e) => {
          updateValue({ key: 'age', value: +e.target.value })
        }}
      />
      <input
        {...props.isLeet}
        checked={state.isLeet.value}
        onChange={(e) => {
          updateValue({ key: 'isLeet' })
        }}
      />
      <button type="submit">Submit</button>
    </form>
  )
}
