import { IoNavigate } from 'react-icons/io5';
import type { Rule } from 'sanity';

const navigations = {
  name: 'site.nav',
  title: 'Navigation',
  type: 'document',
  icon: IoNavigate,

  fields: [
    {
      name: 'menu',
      title: 'Menu',
      type: 'array',
      of: [{ type: 'menuItem' }],
      validation: (Rule: Rule) =>
        Rule.required().custom((content: any[]) => {
          const highlightedMenuItems = (content || []).filter(
            ({ highlight }) => highlight,
          );
          return highlightedMenuItems.length > 1
            ? {
                message:
                  'There can only be one highlighted menu item. Please delete the extra ones.',
              }
            : true;
        }),
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Navigations',
    }),
  },
};

export default navigations;
