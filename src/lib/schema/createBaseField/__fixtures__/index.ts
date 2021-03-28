import { FieldBase } from 'lib/schema/types'

export const fieldBase: Omit<FieldBase<any>, 'type' | 'name'> = {
  error: '',
  disabled: false,
  required: false
}
