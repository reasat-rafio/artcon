import { FaTag } from 'react-icons/fa';
import { orderRankField } from '@sanity/orderable-document-list';
import type { Rule } from 'sanity';

const artistTag = {
  name: 'artistTag',
  title: 'Tag',
  type: 'document',
  icon: FaTag,
  fields: [
    orderRankField({ type: 'artistTag' }),
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
    },
  },
};

export default artistTag;
