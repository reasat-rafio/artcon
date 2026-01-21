import { FcLink } from 'react-icons/fc';
import type { Rule } from 'sanity';

const cta = {
  name: 'cta',
  title: 'Button',
  type: 'object',
  icon: FcLink,
  fields: [
    {
      title: 'Button title',
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'href',
      title: 'Button URL',
      description: `The URL field accepts internal links in the format '/page-slug' or '/parent-slug/slug' (e.g., 'artcon.com/exhibition' becomes '/exhibition'). External URLs must begin with 'https://' or 'http://', while email links should use 'mailto:email@example.com'. Any valid external URL is accepted. Leave empty to show a popup form instead.`,
      type: 'string',
      validation: (Rule: Rule) => Rule.optional(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'href',
    },
  },
};

export default cta;
