import { MdOutlineCollections } from 'react-icons/md';
import type { Rule } from 'sanity';

const collection = {
  title: 'Collections',
  name: 'landing.collections',
  type: 'object',
  icon: MdOutlineCollections,
  fields: [
    {
      name: 'collections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'collection',
          type: 'reference',
          to: [
            { type: 'exhibition' },
            { type: 'artist' },
            { type: 'collection' },
            { type: 'event' },
            { type: 'project' },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Collections',
    }),
  },
};

export default collection;
