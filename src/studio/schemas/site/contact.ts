import { FcContacts } from 'react-icons/fc';
import type { Rule } from 'sanity';

const contact = {
  name: 'site.contact',
  title: 'Contact',
  icon: FcContacts,
  type: 'document',
  fields: [
    {
      name: 'address',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'icon',
          type: 'image',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'address',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'socialsWithVisibleLinks',
      type: 'array',
      of: [
        {
          name: 'socialsWithVisibleLink',
          type: 'object',
          fields: [
            {
              name: 'icon',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'info',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },

    {
      name: 'socials',
      type: 'array',
      of: [
        {
          name: 'social',
          type: 'object',
          fields: [
            {
              name: 'icon',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'link',
              type: 'url',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'link',
              media: 'icon',
            },
          },
        },
      ],
    },
  ],
};

export default contact;
