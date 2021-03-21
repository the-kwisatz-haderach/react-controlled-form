import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Form, FormProps } from './Form'
import { simpleSchemaCreator } from './formSchema'

export default {
  title: 'useForm/Fields',
  component: Form
} as Meta

const Template: Story<FormProps> = (args) => <Form {...args} />

export const Defaults = Template.bind({})
Defaults.args = {
  formSchema: simpleSchemaCreator(),
  submitHandler: console.log
}

export const WithValues = Template.bind({})
WithValues.args = {
  formSchema: simpleSchemaCreator({ name: 'hello' }),
  submitHandler: console.log
}

export const GlobalOptions = Template.bind({})
GlobalOptions.args = {
  formSchema: simpleSchemaCreator({
    name: { placeholder: 'type something' }
  }),
  submitHandler: console.log
}
