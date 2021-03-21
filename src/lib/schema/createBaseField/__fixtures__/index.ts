import { FieldBase } from 'lib/schema/types'

export const fieldBase: Omit<FieldBase<any>, 'type' | 'name'> = {
  label: '',
  error: '',
  disabled: false,
  required: false
}
