import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Form, FormProps } from '../components/Form'
import { simpleSchemaCreator } from '../formSchema'

export default {
  title: 'useForm/Fields',
  component: Form
} as Meta

const Template: Story<FormProps> = (args) => <Form {...args} />

export const Defaults = Template.bind({})
Defaults.args = {
  formSchema: simpleSchemaCreator(),
  submitHandler: (arg) => console.log(arg)
}

export const WithValues = Template.bind({})
WithValues.args = {
  formSchema: simpleSchemaCreator({ name: 'hello' }),
  submitHandler: (arg) => console.log(arg)
}

export const GlobalOptions = Template.bind({})
GlobalOptions.args = {
  formSchema: simpleSchemaCreator(),
  submitHandler: (arg) => console.log(arg)
}
