import {defineField} from 'sanity'
import {CarouselBlockPreview} from './carouselBlockPreview'

export default {
  name: 'carouselBlock',
  title: 'Carousel Block',
  type: 'object',
  fields: [
    defineField({
      name: 'list',
      title: 'Slides List',
      type: 'array',
      of: [
        {
          name: 'item',
          title: 'Slide Item',
          type: 'object',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              validation: (Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
            },
            {
              name: 'description',
              title: 'Image Description',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      list: 'list',
      description: 'description',
    },
  },
  components: {preview: CarouselBlockPreview},
}
