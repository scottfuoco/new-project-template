import { PreviewProps, type Image } from 'sanity'
import { Box } from '@sanity/ui'
import { useImageProps } from '../../../hooks/useImageProps'

type ImageTextBlockPreviewProps = PreviewProps & {
  blockImage: Image
  imageLabel?: string
  blockContent: string
  imagePosition: string
}

export function ImageTextBlockPreview(props: ImageTextBlockPreviewProps) {
  const { blockImage, imageLabel, blockContent, imagePosition } = props
  if (!blockImage) return

  const image = useImageProps({ image: blockImage, width: 384, height: 514 })

  return (
    <Box style={{
      display: "flex",
      gap: 15,
      flexDirection: imagePosition === "left" ? "row" : "row-reverse"
    }}>
      <Box style={{ width: "40%", flexShrink: 0 }}>
        <img src={image} alt="imageLabel" style={{ width: "100%", height: "auto" }} />
        <Box>{imageLabel}</Box>
      </Box>
      <Box>{blockContent}</Box>
    </Box>
  )
}