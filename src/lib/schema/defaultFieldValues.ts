import type { SchemaDefaults } from './types'

const defaultFieldValues: SchemaDefaults = {
  number: {
    value: 0
  },
  text: {
    value: ''
  },
  checkbox: {
    value: false
  },
  custom: {
    value: ''
  }
} as const

export default defaultFieldValues
