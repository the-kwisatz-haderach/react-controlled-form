import { FieldValidator, FormState, HookOptions, OutputSchema } from '../types'

type ValidatorMap<T extends OutputSchema> = {
  [K in keyof T]: FieldValidator<T[K]['type'], T>[]
}

const createValidatorMap = <T extends OutputSchema>(
  formSchema: T,
  globalValidators: Partial<HookOptions<T>['fieldTypeValidation']>
) =>
  Object.keys(formSchema).reduce<ValidatorMap<T>>((acc, key) => {
    const fieldTypeValidation = globalValidators[formSchema[key].type] ?? []
    return {
      ...acc,
      [key]: [...fieldTypeValidation, ...formSchema[key].validators]
    }
  }, {} as ValidatorMap<T>)

const createSchemaValidator = <T extends OutputSchema>(
  formSchema: T,
  globalValidators: Partial<HookOptions<T>['fieldTypeValidation']>
) => {
  const validatorMap = createValidatorMap(formSchema, globalValidators)
  return (formState: FormState<T>) => (fieldKey: keyof FormState<T>) =>
    validatorMap[fieldKey].flatMap(
      (validator) =>
        validator(formState[fieldKey].value, {
          initialValue: formSchema[fieldKey].value,
          formState
        }) ?? []
    )
}

export default createSchemaValidator
