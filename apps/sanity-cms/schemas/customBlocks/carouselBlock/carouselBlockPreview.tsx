import { Box } from '@sanity/ui'
import React from 'react'
import { useImageProps } from '../../../hooks/useImageProps'

type SlideProps = {
  description?: string;
  image: object;
}

type PreviewProps = {
  list: SlideProps[];
}

const Slide = ({ image, description }: SlideProps) => {
  const src = useImageProps({ image, width: 384, height: 210 })

  return (
    <img src={src} alt={description} style={{ width: "100%" }} />
  )
}

export const CarouselBlockPreview = ({ list }: PreviewProps) => {
  if (!list?.length) {
    return null
  }
  const images = list
    .filter((item) => item?.image?.asset)
    .map((item) => {
      if (!item.image) return

      return (
        <Box>
          <Slide image={item.image} description={item.description} />
          <Box style={{ textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: 'hidden' }}>{item.description}</Box>
        </Box>
      )
    })

  return (
    <Box>
      <Box style={{
        display: "grid",
        gridTemplateColumns: "auto auto",
        gap: 10
      }}>
        {images}
      </Box>
    </Box>
  )
}

