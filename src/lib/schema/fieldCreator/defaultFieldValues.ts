import { DefaultFormFields } from '../types'

const defaultFieldValues: DefaultFormFields = {
  text: {
    value: '',
    placeholder: '',
    pattern: ''
  },
  checkbox: {
    value: false,
    indeterminate: false
  },
  custom: {
    value: ''
  },
  number: {
    value: 0,
    placeholder: '',
    decimals: 0,
    step: 1
  }
}

export default defaultFieldValues
