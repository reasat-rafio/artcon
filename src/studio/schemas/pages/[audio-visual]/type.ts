import { orderRankField } from '@sanity/orderable-document-list';
import { GrTag } from 'react-icons/gr';
import type { Rule } from 'sanity';

const audioVisualType = {
  name: 'audioVisualType',
  title: 'Type',
  type: 'document',
  icon: GrTag,
  fields: [
    orderRankField({ type: 'audioVisualType' }),

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

export default audioVisualType;
