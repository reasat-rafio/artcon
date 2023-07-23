import { FaQuoteLeft } from 'react-icons/fa';
import type { Rule } from 'sanity';

const vrExhibitionnCta = {
  name: 'vrExhibitionnCta',
  type: 'object',
  title: 'VR Exhibitionn Call To Action',
  icon: FaQuoteLeft,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      media: 'image',
    },
  },
};

export default vrExhibitionnCta;
