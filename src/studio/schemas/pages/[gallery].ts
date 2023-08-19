import { FcGallery } from 'react-icons/fc';
import type { Rule } from 'sanity';

const gallery = {
  name: 'gallery',
  type: 'document',
  icon: FcGallery,
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
};

export default gallery;
