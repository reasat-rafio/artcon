import { FcCalendar } from 'react-icons/fc';
import type { Rule } from 'sanity';

const event = {
  name: 'event',
  type: 'document',
  icon: FcCalendar,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default event;
