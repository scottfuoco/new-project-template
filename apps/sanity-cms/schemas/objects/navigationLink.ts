import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation.link',
  type: 'object',
  title: 'Link',
  preview: {
    select: {
      title: 'name',
    },
    prepare: ({title}: {title: string}) => ({
      title: title,
    }),
  },
  fields: [
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Href',
      name: 'href',
      type: 'string',
    }),
    defineField({
      type: 'array',
      name: 'children',
      title: 'Children',
      of: [{type: 'navigation.link'}],
    }),
  ],
})
