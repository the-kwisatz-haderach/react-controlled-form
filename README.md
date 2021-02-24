# react-controlled-form

Custom hook for quickly creating controlled forms in React.

## Quick usage

The easiest way to use the hook is to provide a fieldTypeSchema and a submithandler. Based on the field types, a formSchema is created with default values.

```typescript
const handleSubmit = (values: { name: string; age: number }) => {
  console.log(values)
}

const { values, submitForm, updateValue } = useForm(
  {
    name: 'text',
    age: 'number'
  },
  handleSubmit
)
```

## Creating a form schema
