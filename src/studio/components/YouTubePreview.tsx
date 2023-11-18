import type { PreviewProps } from 'sanity';
import { Flex, Text } from '@sanity/ui';
import YouTubePlayer from 'react-player/youtube';
import React from 'react';

interface PreviewYouTubeProps extends PreviewProps {
  url?: string;
}

export default function YouTubePreview(props: PreviewYouTubeProps) {
  const { url } = props;
  return (
    <Flex padding={4} justify={'center'}>
      {url ? (
        <div className="!h-[20px] !w-[20px] overflow-hidden object-cover">
          <YouTubePlayer
            className="!h-[20px] !w-[20px] object-cover"
            url={url}
          />
        </div>
      ) : (
        <Text>Add a YouTube URL</Text>
      )}
    </Flex>
  );
}
