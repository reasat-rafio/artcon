import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FaHighlighter } from 'react-icons/fa';
import type { Rule } from 'sanity';

const summary = {
  name: 'artist.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
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

    createDescriptionBlock({
      name: 'statement',
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),

    {
      name: 'vrExhibition',
      title: 'VR Preview',
      type: 'reference',
      to: [{ type: 'vrExhibition' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'descriptionBlock.name',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default summary;
