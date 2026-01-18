import { orderRankField } from '@sanity/orderable-document-list';
import { GrTag } from 'react-icons/gr';
import type { Rule } from 'sanity';

const eventTag = {
  name: 'eventTag',
  title: 'Event Category',
  type: 'document',
  icon: GrTag,
  fields: [
    orderRankField({ type: 'eventTag' }),
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Auction', value: 'Auction' },
          { title: 'Book launch', value: 'Book launch' },
          { title: 'Film Screening', value: 'Film Screening' },
          { title: 'Celebration', value: 'Celebration' },
        ],
      },
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

export default eventTag;
