import {defineField} from 'sanity'
import {ImageBlockPreview} from './imageBlockPreview'

export default {
  name: 'imageBlock',
  title: 'Image Block',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Image Description',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      image: 'image',
      description: 'description',
    },
  },
  components: {preview: ImageBlockPreview},
}
