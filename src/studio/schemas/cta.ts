import { FcLink } from 'react-icons/fc';
import type { Rule } from 'sanity';

const cta = {
  name: 'cta',
  title: 'CTA',
  type: 'object',
  icon: FcLink,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'href',
      title: 'URL',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
    },
  },
};

export default cta;
