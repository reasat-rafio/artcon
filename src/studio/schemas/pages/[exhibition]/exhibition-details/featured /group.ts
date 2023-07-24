import { FaUsers } from 'react-icons/fa';
import type { Rule } from 'sanity';

const featuredGroup = {
  title: 'Group Exhibition',
  name: 'exhibition.featured.group',
  icon: FaUsers,
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'artists',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'image',
          type: 'image',
          validation: (Rule: Rule) => Rule.required(),
          options: {
            hotspot: true,
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
};

export default featuredGroup;
