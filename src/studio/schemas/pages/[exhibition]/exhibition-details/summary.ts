import { FaHighlighter } from 'react-icons/fa';

const summary = {
  name: 'exhibition.summary',
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
      title: "Exhibition's VR",
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
