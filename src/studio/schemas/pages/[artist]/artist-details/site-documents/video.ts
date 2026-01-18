import { FaVideo } from 'react-icons/fa';
import type { DefaultPreviewProps } from 'sanity';

const video = {
  name: 'artist.video',
  title: 'Video',
  type: 'object',
  icon: FaVideo,
  fields: [
    {
      name: 'vrOrYtVideoSlider',
      title: 'VR or Youtube Video Slider',
      type: 'array',
      of: [
        {
          name: 'vr',
          title: 'VR',
          type: 'reference',
          to: [{ type: 'vr' }],
        },
        { name: 'youtube', title: 'Youtube', type: 'youtube' },
      ],
    },
  ],
  preview: {
    select: {
      videos: 'vrOrYtVideoSlider',
    },
    prepare: (props: DefaultPreviewProps & { videos?: unknown[] }) => ({
      ...props,
      title: props.videos?.length 
        ? `${props.videos.length} Video${props.videos.length > 1 ? 's' : ''}` 
        : 'No videos',
      subtitle: 'Video',
    }),
  },
};

export default video;
