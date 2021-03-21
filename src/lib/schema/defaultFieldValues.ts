import type { SchemaDefaults } from './types'

const defaultFieldValues: SchemaDefaults = {
  number: {
    value: 0,
    placeholder: '',
    decimals: 0,
    step: 1
  },
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
  }
} as const

export default defaultFieldValues
