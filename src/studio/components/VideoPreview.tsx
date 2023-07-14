import React from 'react';

interface VideoPreviewType {
  webm: string;
  hevc: string;
  background?: string;
  shape?: string;
}

const VideoPreview = ({ webm, hevc, background, shape }: VideoPreviewType) => (
  <video
    muted
    playsInline
    autoPlay
    loop
    style={{
      background,
      borderRadius: shape === 'circle' ? '100%' : '8px',
      width: '100%',
      height: '100%',
    }}
  >
    <source src={webm} type="video/webm" />
    <source src={hevc} type="video/quicktime" />
  </video>
);

export default VideoPreview;
