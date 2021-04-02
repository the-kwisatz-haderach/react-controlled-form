import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0'
import { Form, FormProps } from './Form'
import { inputSchemaTransformer } from '../lib/schema'

export default {
  title: 'useForm/Fields',
  component: Form
} as Meta

const Template: Story<FormProps> = (args) => <Form {...args} />

export const Defaults = Template.bind({})
Defaults.args = {
  formSchema: inputSchemaTransformer({
    name: 'text',
    age: 'number',
    isLeet: 'checkbox'
  }),
  submitHandler: console.log
}

export const WithValues = Template.bind({})
WithValues.args = {
  formSchema: inputSchemaTransformer({
    name: 'hello',
    age: 'number',
    isLeet: 'checkbox'
  }),
  submitHandler: console.log
}

export const GlobalOptions = Template.bind({})
GlobalOptions.args = {
  formSchema: inputSchemaTransformer({
    name: { type: 'text', placeholder: 'type something' },
    age: 'number',
    isLeet: 'checkbox'
  }),
  submitHandler: console.log
}
