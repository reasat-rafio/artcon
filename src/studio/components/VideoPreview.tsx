import React from 'react';

interface VideoPreviewType {
  webm: string;
  hevc: string;
  background?: string;
}

const VideoPreview = ({ webm, hevc, background }: VideoPreviewType) => (
  <video
    muted
    playsInline
    autoPlay
    loop
    style={{
      background,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  >
    <source src={webm} type="video/webm" />
    <source src={hevc} type="video/quicktime" />
  </video>
);

export default VideoPreview;
