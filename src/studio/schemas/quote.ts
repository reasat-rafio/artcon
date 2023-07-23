import { FaQuoteLeft } from 'react-icons/fa';
import type { Rule } from 'sanity';

const quote = {
  name: 'quote',
  type: 'object',
  title: 'Quote',
  icon: FaQuoteLeft,
  fields: [
    {
      name: 'text',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'author',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      description: 'Source on the web',
    },
  ],
  preview: {
    select: {
      title: 'text',
      subtitle: 'author',
    },
  },
};

export default quote;
