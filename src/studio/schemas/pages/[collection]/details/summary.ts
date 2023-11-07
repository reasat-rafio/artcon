import { FaHighlighter } from 'react-icons/fa';

const summary = {
  name: 'collection.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },

    {
      name: 'vr',
      title: 'VR',
      type: 'reference',
      to: [{ type: 'vr' }],
    },
  ],
  preview: {
    select: {
      title: 'quote.text',
      subtitle: 'vr.url',
    },
  },
};

export default summary;
