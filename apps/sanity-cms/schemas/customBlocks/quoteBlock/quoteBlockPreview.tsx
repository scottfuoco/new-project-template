import {PreviewProps} from 'sanity'
import {Box} from '@sanity/ui'

type QuoteBlockPreviewProps = PreviewProps & {
  quoteTitle?: string
  quoteText?: string
  quoteAuthor?: string
}

export function QuoteBlockPreview(props: QuoteBlockPreviewProps) {
  const {quoteTitle, quoteText, quoteAuthor} = props

  return (
    <Box>
      <Box
        // TODO: We should pull theme values here, will require the CMS repo to have access to the theme package
        style={{
          marginBottom: 10,
          fontWeight: 'bold',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
        }}
      >
        {quoteTitle}
      </Box>
      <Box
        style={{
          padding: 10,
          height: 60,
          borderLeft: '6px #E25310 solid',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box
          style={{
            textOverflow: 'ellipsis',
            fontStyle: 'italic',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {quoteText}
        </Box>
        <Box
          style={{
            textAlign: 'right',
            textOverflow: 'ellipsis',
            fontWeight: 'bold',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {quoteAuthor}
        </Box>
      </Box>
    </Box>
  )
}
