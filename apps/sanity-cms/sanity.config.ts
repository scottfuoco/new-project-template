import {schemaTypes} from './schemas'
import {structure} from './structure'
import {visionTool} from '@sanity/vision'
import {groqdPlaygroundTool} from 'groqd-playground'
import {defineConfig} from 'sanity'
import {iconPicker} from 'sanity-plugin-icon-picker'
import {deskTool} from 'sanity/desk'
import {media} from 'sanity-plugin-media'
import {workflow} from 'sanity-plugin-workflow'

export default defineConfig({
  name: 'default',
  title: 'sanity',

  // TODO: replace with shared sanity config

  plugins: [
    deskTool({structure}),
    visionTool(),
    iconPicker(),
    groqdPlaygroundTool(),
    media(),
    workflow({
      // Required, list of document type names
      // Optional, see below
      // states: [],
    }),
  ],

  schema: {
    types: schemaTypes,
  },
})
