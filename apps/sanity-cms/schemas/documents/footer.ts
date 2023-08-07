import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',
  preview: {
    prepare: () => ({
      title: 'Footer Navigation',
    }),
  },
  groups: [
    {
      name: 'contacts',
      title: 'Contacts',
    },
    {
      name: 'links',
      title: 'Links',
    },
    {
      name: 'bottomBlock',
      title: 'Bottom block',
    },
  ],
  fields: [
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'object',
      group: 'contacts',
      fields: [
        {
          title: 'Group title',
          name: 'title',
          type: 'string',
        },
        {
          title: 'Subtitle',
          name: 'subtitle',
          type: 'string',
        },
        {
          title: 'Address',
          name: 'address',
          type: 'object',
          fieldsets: [
            {
              name: 'addressFieldset',
              title: ' ',
              options: {columns: 2},
            },
          ],
          fields: [
            {
              name: 'addressLineOne',
              type: 'string',
              title: 'Address Line 1',
              fieldset: 'addressFieldset',
            },
            {
              name: 'addressLineTwo',
              type: 'string',
              title: 'Address Line 2',
              fieldset: 'addressFieldset',
            },
            {
              name: 'addressLineThree',
              type: 'string',
              title: 'Address Line 3',
              fieldset: 'addressFieldset',
            },
            {
              name: 'addressLineFour',
              type: 'string',
              title: 'Address Line 4',
              fieldset: 'addressFieldset',
            },
            {
              title: 'Postal code',
              name: 'postalCode',
              type: 'string',
              validation: (Rule: Rule) =>
                Rule.required()
                  .regex(/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i)
                  .error('Invalid postal code.'),
              fieldset: 'addressFieldset',
            },
          ],
        },
      ],
    }),
    defineField({
      type: 'array',
      name: 'contactsLinks',
      title: 'Contacts links',
      group: 'contacts',
      of: [
        {
          title: 'Link',
          name: 'name',
          type: 'object',
          fields: [
            {
              title: 'Label',
              name: 'label',
              type: 'string',
            },
            {
              title: 'Value',
              name: 'value',
              type: 'string',
            },
            {
              title: 'Type',
              name: 'type',
              type: 'string',
              options: {
                list: [
                  {title: 'Phone', value: 'phone'},
                  {title: 'Email', value: 'email'},
                  {title: 'Website', value: 'website'},
                ],
                layout: 'radio', // &lt;-- defaults to 'dropdown'
              },
            },
          ],
          preview: {
            select: {
              title: 'label',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'linksGroupsList',
      title: 'Links groups list',
      type: 'array',
      group: 'links',
      validation: (Rule) => Rule.max(2),
      of: [
        {
          name: 'linksItem',
          title: 'List Item',
          type: 'object',
          fields: [
            {
              name: 'groupTitle',
              title: 'Group title',
              type: 'string',
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  name: 'link',
                  title: 'Link',
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'extraLinks',
      title: 'Extra links',
      type: 'object',
      group: 'links',

      fields: [
        {
          name: 'groupTitle',
          title: 'Group title',
          type: 'string',
        },
        {
          name: 'links',
          title: 'Links',
          type: 'array',
          of: [
            {
              name: 'link',
              title: 'Link',
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'string',
      group: 'bottomBlock',
    }),
    defineField({
      name: 'policyLinks',
      title: 'Policy links',
      type: 'array',
      group: 'bottomBlock',
      of: [
        {
          name: 'link',
          title: 'Link',
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
          ],
        },
      ],
    }),
  ],
})
