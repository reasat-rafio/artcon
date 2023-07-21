import { GrTag } from 'react-icons/gr';
import type { Rule } from 'sanity';

const exhibitionTag = {
  name: 'exhibitionTag',
  title: 'Tag',
  type: 'document',
  icon: GrTag,
  fields: [
    {
      name: 'name',
      type: 'string',
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
