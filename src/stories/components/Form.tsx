import React from 'react'
import useForm from '../../lib'
import { FormSchema } from '../../lib/schema'
import type { SubmitHandler } from '../../lib/types'

export type FormProps = {
  formSchema: FormSchema<{
    name: 'text'
    age: 'number'
    isLeet: 'checkbox'
  }>
  submitHandler: SubmitHandler<
    FormSchema<{
      name: 'text'
      age: 'number'
      isLeet: 'checkbox'
    }>
  >
}

/**
 * Simple form.
 */
export const Form: React.FC<FormProps> = ({ formSchema, submitHandler }) => {
  const { submitForm, updateValue, values } = useForm(formSchema, submitHandler)
  return (
    <form onSubmit={submitForm}>
      <input
        disabled={values.name.disabled}
        placeholder={values.name.placeholder}
        value={values.name.value}
        onChange={(e) => {
          updateValue({ key: 'name', value: e.target.value })
        }}
      />
      {/* <input
        type={values.age.type}
        disabled={values.age.disabled}
        value={values.age.value}
        onChange={(e) => {
          updateValue({ key: 'age', value: +e.target.value })
        }}
      /> */}
      <input
        type={values.isLeet.type}
        disabled={values.isLeet.disabled}
        checked={values.isLeet.value}
        onChange={(e) => {
          updateValue({ key: 'isLeet' })
        }}
      />
    </form>
  )
}
