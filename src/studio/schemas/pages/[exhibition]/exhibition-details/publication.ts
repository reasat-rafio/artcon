import { FcReadingEbook } from 'react-icons/fc';
import type { Rule } from 'sanity';

const publication = {
  title: 'Exhibitions Publicity Materials',
  name: 'exhibition.publication',
  type: 'object',
  icon: FcReadingEbook,
  fields: [
    {
      name: 'invitationCardImage',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: { hotspot: true },
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
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'fullInvitationCardImage',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: { hotspot: true },
      description: 'This image will display on the popup modal',
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
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'invitationCardImage',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: (props: any) => ({
      ...props,
      title: props.media?.caption ?? '',
      subtitle: 'Exhibitions Publicity Materials',
    }),
  },
};

export default publication;
