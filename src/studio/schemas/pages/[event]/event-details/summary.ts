import { FaHighlighter } from 'react-icons/fa';
import type { DefaultPreviewProps } from 'sanity';

const summary = {
  name: 'event.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },

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
      title: 'quote.text',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'Summary',
    }),
  },
};

export default summary;
