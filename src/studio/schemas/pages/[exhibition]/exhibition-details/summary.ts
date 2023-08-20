import { FaHighlighter } from 'react-icons/fa';
import type { Rule } from 'sanity';

const summary = {
  name: 'exhibition.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'vrExhibition',
      title: 'VR Preview',
      type: 'reference',
      to: [{ type: 'vrExhibition' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'quote.text',
      subtitle: 'vrExhibition.url',
    },
  },
};

export default summary;
