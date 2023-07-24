import { MdFeaturedPlayList } from 'react-icons/md';
import type { Rule } from 'sanity';

const featured = {
  title: 'Featured',
  name: 'exhibition.featured',
  icon: MdFeaturedPlayList,
  type: 'object',
  fields: [
    {
      name: 'featured',
      type: 'array',
      validation: (Rule: Rule) => Rule.length(1),
      description: 'Pleasee fill only one of the following',
      of: [
        { type: 'exhibition.featured.solo' },
        { type: 'exhibition.featured.group' },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Solo or Group Exhibition',
    }),
  },
};

export default featured;
