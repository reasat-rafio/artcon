import { orderRankField } from '@sanity/orderable-document-list';
import { GrTag } from 'react-icons/gr';
import type { Rule } from 'sanity';

const publicationCategory = {
  name: 'publicationCategory',
  title: 'Tag',
  type: 'document',
  icon: GrTag,
  fields: [
    orderRankField({ type: 'publicationCategory' }),
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

export default publicationCategory;
