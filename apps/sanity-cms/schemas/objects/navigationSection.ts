import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation.section',
  type: 'object',
  title: 'Section',
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
      name: 'links',
      title: 'Links',
      of: [{type: 'navigation.link'}],
    }),
  ],
})
