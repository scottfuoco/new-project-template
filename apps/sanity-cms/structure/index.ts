import {CogIcon} from '@sanity/icons'
import {StructureResolver} from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Homepage')
        .id('homepage-list')
        .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),

      S.divider(),

      S.listItem()
        .title('Navigation')
        .id('navigation')
        .child(S.document().schemaType('navigation').documentId('navigation')),

      S.listItem()
        .title('Footer')
        .id('footer')
        .child(S.document().schemaType('footer').documentId('footer')),

      S.documentListItem().schemaType('siteSettings').icon(CogIcon).title('Site Settings'),
    ])
