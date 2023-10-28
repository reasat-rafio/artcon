import { FaHighlighter } from 'react-icons/fa';
import type { Rule } from 'sanity';

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
      validation: (Rule: Rule) => Rule.required(),
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
