import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'collection.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  fields: [
    {
      name: 'highlightedCollections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Hero',
    }),
  },
};

export default hero;
