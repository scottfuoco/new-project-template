import React from 'react'
import getYouTubeID from 'get-youtube-id'
import YouTube from 'react-youtube'
import { Box } from '@sanity/ui'
import './index.css'
const YOUTUBE_REGEX =
  /^(https:\/\/|http:\/\/|\/\/)?(www\.)?(youtu\.be\/|youtube(-nocookie)?.com\/(v\/|e\/|.*u\/\w+\/|embed\/|.*v=))([\w-]{11})/;


export const VideoBlockPreview = ({ url }) => {
  if (!url) return
  const isYoutube = url.match(YOUTUBE_REGEX)
  const video = isYoutube ? getYouTubeID(url) : url

  return (
    <Box className="video-preview">
      {isYoutube ? (
        <YouTube videoId={video} />
      ) : (
        <video src={video} controls={true} />
      )}
    </Box>
  )
}

