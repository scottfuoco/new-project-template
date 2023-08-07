export default {
  name: 'socials',
  title: 'Socials',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'platform',
          title: 'Platform',
          type: 'string',
        },
        {
          name: 'url',
          title: 'URL',
          type: 'url',
        },
        {
          name: 'icon',
          title: 'Icon',
          type: 'iconPicker',
          options: {
            providers: ['fa'],
            outputFormat: 'react',
          },
        },
      ],
    },
  ],
}
