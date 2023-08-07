import {defineField} from 'sanity'
import {VideoBlockPreview} from './videoBlockPreview'

export default {
  name: 'videoBlock',
  title: 'Video',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'Link to the video',
      description: 'Add a Youtube link or a link from the media',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {preview: VideoBlockPreview},
}
