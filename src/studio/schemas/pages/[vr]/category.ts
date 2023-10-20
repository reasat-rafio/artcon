import { GrTag } from 'react-icons/gr';
import type { Rule } from 'sanity';

const vrCategory = {
  name: 'vrCategory',
  title: 'Tag',
  type: 'document',
  icon: GrTag,
  fields: [
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

export default vrCategory;
