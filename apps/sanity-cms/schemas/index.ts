import blockContent from './blocks/blockContent'
import socials from './blocks/socials'
import footer from './documents/footer'
import headerNavigation from './documents/navigation'
import author from './objects/author'
import navigationLink from './objects/navigationLink'
import navigationSection from './objects/navigationSection'
import homepage from './singletons/homepage'
import searchPage from './singletons/searchPage'
import siteSettings from './singletons/siteSettings'
import quoteBlock from './customBlocks/quoteBlock'
import powerBIBlock from './customBlocks/powerBIBlock'
import imageTextBlock from './customBlocks/ImageTextBlock'
import videoBlock from './customBlocks/videoBlock'
import imageBlock from './customBlocks/imageBlock'
import carouselBlock from './customBlocks/carouselBlock'
import {tags} from './singletons/tags'

export const schemaTypes = [
  // documents

  // singletons
  homepage,
  searchPage,
  siteSettings,
  headerNavigation,
  footer,

  // objects
  author,
  navigationLink,
  navigationSection,

  // blocks
  blockContent,
  socials,
  quoteBlock,
  imageTextBlock,
  videoBlock,
  imageBlock,
  carouselBlock,
  powerBIBlock,

  tags,
]
