import { FormSchema } from 'lib/schema'
import { updateFieldValue } from './actions'

const reduceFieldValue = (
  state: FormSchema<any>,
  { payload }: ReturnType<typeof updateFieldValue>
): string | boolean | number => {
  if (payload.type === 'checkbox' && payload.value === undefined) {
    return !state[payload.key].value
  }
  return payload.value
}

export default reduceFieldValue
