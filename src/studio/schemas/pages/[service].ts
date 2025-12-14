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
      name: 'descriptionMedia',
      type: 'asset',
      title: 'Description Image / Video (Optional)',
      description: 'Optional image or video to show before the description',
    },
    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'descriptionMedia.image',
    },
  },
};

export default service;
