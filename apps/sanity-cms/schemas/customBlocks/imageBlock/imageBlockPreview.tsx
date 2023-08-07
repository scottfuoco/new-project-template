import { PreviewProps, type Image } from 'sanity'
import { Box } from '@sanity/ui'
import { useImageProps } from '../../../hooks/useImageProps'



type ImageBlockPreviewProps = PreviewProps & {
  image?: Image
  description?: string
}

export const ImageBlockPreview = ({ image, description }: ImageBlockPreviewProps) => {
  if (!image) return
  const src = useImageProps({ image, width: 384, height: 514 })

  return (
    <Box>
      <img src={src} alt={description} style={{ width: "100%" }} />
      <Box>{description}</Box>
    </Box>
  )
}

