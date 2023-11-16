import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'publication.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  fields: [
    {
      name: 'highlightedPublication',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'publication' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Highlighted Publications',
      subtitle: 'Hero',
    }),
  },
};

export default hero;
