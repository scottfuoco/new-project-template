import {defineField} from 'sanity'
import {QuoteBlockPreview} from './quoteBlockPreview'

export default {
  name: 'quoteBlock',
  title: 'Quote Block',
  type: 'object',
  fields: [
    defineField({
      name: 'quoteTitle',
      title: 'Quote Title',
      type: 'string',
    }),
    defineField({
      name: 'quoteText',
      title: 'Quote Text',
      type: 'text',
    }),
    defineField({
      name: 'quoteAuthor',
      title: 'Quote Author',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      quoteTitle: 'quoteTitle',
      quoteText: 'quoteText',
      quoteAuthor: 'quoteAuthor',
    },
  },
  components: {preview: QuoteBlockPreview},
}
