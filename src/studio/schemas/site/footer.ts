import { TbBoxAlignBottom } from 'react-icons/tb';
import type { Rule } from 'sanity';

const footer = {
  name: 'site.footer',
  title: 'Footer',
  icon: TbBoxAlignBottom,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default footer;
