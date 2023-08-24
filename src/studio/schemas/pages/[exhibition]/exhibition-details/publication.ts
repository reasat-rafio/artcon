import { FcReadingEbook } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';

const publication = {
  title: 'Publication Section',
  name: 'exhibition.publication',
  type: 'object',
  icon: FcReadingEbook,
  fields: [
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
      media: 'invitationCardImage',
    },
    prepare: (props: SanityDefaultPreviewProps) => ({
      ...props,
      title: 'Publication Section',
    }),
  },
};

export default publication;
