import sanityImageUrlBuilder from '@sanity/image-url'

type Props = {
  image: object
  width: number
  height: number
}

const imageUrlBuilder =
  sanityImageUrlBuilder()
  // TODO: add shared sanity config

export const useImageProps = ({image, width, height}: Props) => {
  if (!image) return
  return imageUrlBuilder.image(image)?.width(width).height(height)?.url()
}
