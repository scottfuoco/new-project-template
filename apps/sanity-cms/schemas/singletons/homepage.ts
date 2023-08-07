import {defineType} from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [],

  preview: {
    select: {
      title: 'title',
    },
  },
})
