import type { UseFormProps } from 'lib/types'
import React from 'react'

export type FormProps = UseFormProps<any> & { backgroundColor: string }

/**
 * Primary UI component for user interaction
 */
export const Form: React.FC<FormProps> = ({
  values,
  submitForm,
  updateValue,
  backgroundColor
}) => {
  return (
    <form onSubmit={submitForm} style={{ backgroundColor }}>
      <input />
    </form>
  )
}
