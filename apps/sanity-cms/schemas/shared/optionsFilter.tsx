import {defineField} from 'sanity'

export const optionsFilter = defineField({
  name: 'option',
  title: 'Option',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
