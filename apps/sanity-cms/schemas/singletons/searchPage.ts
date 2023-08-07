import {FILTERS, filterMapping} from '@package/utils-shared'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'searchPage',
  title: 'Search Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Advanced Search',
    }),
    defineField({
      name: 'searchDescription',
      title: 'Search Description',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tagsAndFilters',
      title: 'Search Tags and Filters',
      description: 'The title appears on the search page.',
      type: 'array',
      validation: (Rule) => Rule.unique(),
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'tag',
              title: 'Tag',
              type: 'string',
              options: {
                list: Object.keys(filterMapping).map((key) => ({
                  title: filterMapping[key as FILTERS].title,
                  value: filterMapping[key as FILTERS].schema,
                })),
              },
            },
            {
              name: 'isInitiallyExpanded',
              title: 'Should the Filter be expanded by default?',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              tag: 'tag',
              title: 'title',
            },
            // @ts-ignore
            prepare(selection: {title: string; tag: FILTERS}) {
              return {
                title: selection.title,
                // filterMapping[selection.tag].title,
              }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
