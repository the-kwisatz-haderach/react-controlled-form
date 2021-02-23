import schemaCreator from '../lib/schema'

export const simpleSchemaCreator = schemaCreator({
  name: 'text',
  age: 'number',
  isLeet: 'checkbox'
})
