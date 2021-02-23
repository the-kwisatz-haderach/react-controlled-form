import fieldTypes from '../fieldTypes'
import { FieldType } from '../schema/types'

const isFieldType = (arg: any): arg is FieldType => fieldTypes.includes(arg)

export default isFieldType
