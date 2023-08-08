import { FcServices } from 'react-icons/fc';
import type { Rule } from 'sanity';

const services = {
  name: 'servicePage.services',
  title: 'Services',
  icon: FcServices,
  type: 'object',
  fields: [
    {
      name: 'services',
      type: 'array',
      of: [
        {
          name: 'service',
          type: 'object',
          icon: FcServices,
          fields: [
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'description',
              type: 'array',
              of: [{ type: 'block' }],
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'cta',
              type: 'cta',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'image',
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
              ],
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Services',
    }),
  },
};

export default services;
