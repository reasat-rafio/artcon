import { GiRuleBook } from 'react-icons/gi';
import type { Rule } from 'sanity';

const ebook = {
  name: 'ebook',
  type: 'document',
  icon: GiRuleBook,
  fields: [
    {
      name: 'name',
      type: 'string',
    },

    {
      name: 'url',
      type: 'url',
    },
    {
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      media: 'image',
    },
  },
};

export default ebook;
