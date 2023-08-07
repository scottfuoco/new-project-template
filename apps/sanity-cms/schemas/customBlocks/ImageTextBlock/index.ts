import {defineArrayMember, defineField} from 'sanity'
import {ImageTextBlockPreview} from './imageTextBlockPreview'

export default {
  name: 'imageTextBlock',
  title: 'Image Text',
  type: 'object',
  fields: [
    defineField({
      name: 'blockImage',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'imageLabel',
      title: 'Image Label',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content editor',
      type: 'array',
      of: [
        defineArrayMember({
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        }),
      ],
    }),
    defineField({
      title: 'Image Position',
      name: 'imagePosition',
      type: 'string',
      options: {
        list: [
          {title: 'On the left', value: 'left'},
          {title: 'On the right', value: 'right'},
        ],
        layout: 'radio', // &lt;-- defaults to 'dropdown'
      },
      initialValue: 'left',
    }),
  ],
  preview: {
    select: {
      blockImage: 'blockImage',
      imageLabel: 'imageLabel',
      content: 'content', // TODO fix
      imagePosition: 'imagePosition',
    },
  },
  components: {preview: ImageTextBlockPreview},
}
