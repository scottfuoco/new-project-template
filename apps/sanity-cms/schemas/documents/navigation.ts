import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  preview: {
    prepare: () => ({
      title: 'Header Navigation',
    }),
  },
  fields: [
    defineField({
      type: 'array',
      name: 'links',
      title: 'Links',
      of: [{type: 'navigation.section'}],
    }),
  ],
})
