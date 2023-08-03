import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FcReadingEbook } from 'react-icons/fc';
import type { Rule } from 'sanity';

const promotion = {
  title: 'Promotion',
  name: 'exhibition.promotion',
  type: 'object',
  icon: FcReadingEbook,
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'images',
      type: 'array',
      validation: (Rule: Rule) => Rule.length(2),
      of: [
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
            {
              name: 'caption',
              type: 'text',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
      ],
    },

    createDescriptionBlock([
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
        name: 'information',
        type: 'array',
        validation: (Rule: Rule) => Rule.required(),
        of: [{ type: 'block' }],
      },
      {
        name: 'cta',
        type: 'cta',
        validation: (Rule: Rule) => Rule.required(),
      },
    ]),
  ],
  preview: {
    select: {
      title: 'descriptionBlock.title',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default promotion;
