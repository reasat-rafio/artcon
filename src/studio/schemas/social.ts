import { IoShareSocial } from 'react-icons/io5';
import type { Rule } from 'sanity';

const social = {
  name: 'social',
  type: 'object',
  icon: IoShareSocial,
  fields: [
    {
      name: 'icon',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'link', type: 'url', validation: (Rule: Rule) => Rule.required() },
  ],
  preview: {
    select: {
      title: 'link',
      media: 'icon',
    },
  },
};

export default social;
