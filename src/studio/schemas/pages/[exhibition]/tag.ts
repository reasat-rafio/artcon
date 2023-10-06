import { orderRankField } from '@sanity/orderable-document-list';
import { FaTag } from 'react-icons/fa';
import type { Rule } from 'sanity';

const exhibitionTag = {
  name: 'exhibitionTag',
  title: 'Tag',
  type: 'document',
  icon: FaTag,
  fields: [
    orderRankField({ type: 'exhibitionTag' }),
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

export default exhibitionTag;
