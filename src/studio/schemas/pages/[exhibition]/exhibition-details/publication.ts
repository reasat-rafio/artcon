import { FcReadingEbook } from 'react-icons/fc';
import type { Rule } from 'sanity';

const publication = {
  title: 'Publication',
  name: 'exhibition.publication',
  type: 'object',
  icon: FcReadingEbook,
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'invitationCardImage',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'caption',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'quote.text',
      media: 'invitationCardImage',
    },
  },
};

export default publication;
