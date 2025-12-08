import { orderRankField } from '@sanity/orderable-document-list';
import { FcServices } from 'react-icons/fc';
import type { Rule } from 'sanity';

const service = {
  name: 'service',
  type: 'document',
  icon: FcServices,
  fields: [
    orderRankField({ type: 'team' }),
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
};

export default service;
