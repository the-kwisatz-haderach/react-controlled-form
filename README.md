# react-controlled-form

Custom hook for quickly creating controlled forms in React.

## Quick start

The easiest way to use the hook is to simply provide a **FieldTypeSchema** and a **Submithandler**. Based on the field types, a complete **FormSchema** is generated. The generated schema will be populated with default values for all fields.

```typescript
const { fields, submitForm, updateField } = useForm(
  {
    name: 'text',
    age: 'number'
  },
  (values: { name: string; age: number }) => {
    doSomethingWithValues(values)
  }
)
```

Using the hook return values is as simple as plugging them into your form.

```html
<form onSubmit="{submitForm}">
  <input
    type="{fields.name.type}"
    value="{fields.name.value}"
    onChange="{updateField}"
  />
  <input
    type="{fields.age.type}"
    value="{fields.age.value}"
    onChange="{updateField}"
  />
</form>
```

## Creating a form schema

## Field types

The following are the
