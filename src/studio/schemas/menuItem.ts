import { MdLink } from 'react-icons/md';
import type { Rule } from 'sanity';

const menuItems = {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MdLink,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    {
      name: 'href',
      title: 'URL',
      type: 'string'
    },
    {
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href'
    }
  }
};

export default menuItems;
