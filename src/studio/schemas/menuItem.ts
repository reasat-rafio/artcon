import { MdLink } from 'react-icons/md';
import type { Rule } from 'sanity';

const menuItem = {
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  icon: MdLink,
  validation: (Rule: Rule) =>
    Rule.custom((content: any) => {
      const pageUrlAndExternalURlBothPresent =
        !!content?.pageUrl && !!content?.externalUrl;
      return pageUrlAndExternalURlBothPresent
        ? {
            message:
              'There should be only one page url or external url set. Please remove the unwanted one'
          }
        : true;
    }),
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required()
    },
    { name: 'pageUrl', type: 'string' },
    { name: 'externalUrl', type: 'url' }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
      highlight: 'highlight'
    }
  }
};

export default menuItem;
