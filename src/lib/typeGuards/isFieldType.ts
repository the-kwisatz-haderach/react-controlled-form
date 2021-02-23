import fieldTypes from 'lib/fieldTypes'
import { FieldType } from 'lib/schema/types'

const isFieldType = (arg: any): arg is FieldType => fieldTypes.includes(arg)

export default isFieldType
