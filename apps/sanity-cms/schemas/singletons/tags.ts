import {defineField} from 'sanity'
import {optionsFilter} from '../shared/optionsFilter'

export const tags = defineField({
  title: 'Tags',
  name: 'tags',
  type: 'document',
  fields: [optionsFilter],
  preview: {
    select: {
      title: 'option.name',
    },
  },
})
