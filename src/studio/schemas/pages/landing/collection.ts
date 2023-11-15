import { MdOutlineCollections } from 'react-icons/md';
import type { Rule } from 'sanity';

const collection = {
  title: 'Slider',
  name: 'landing.collections',
  type: 'object',
  icon: MdOutlineCollections,
  fields: [
    {
      name: 'collections',
      title: 'Slider',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().unique().min(3),
      of: [
        {
          name: 'collection',
          type: 'reference',
          to: [
            { type: 'vr' },
            { type: 'exhibition' },
            { type: 'publication' },
            { type: 'collection' },
            { type: 'event' },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Slider',
    }),
  },
};

export default collection;
