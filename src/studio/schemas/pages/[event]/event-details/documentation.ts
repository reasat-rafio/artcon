import type { Rule } from 'sanity';
import { FcDocument } from 'react-icons/fc';
import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';

const documentation = {
  title: 'Documentation',
  name: 'event.documentation',
  type: 'object',
  icon: FcDocument,
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    {
      name: 'images',
      type: 'array',
      validation: (Rule: Rule) => Rule.max(2).required(),
      of: [
        {
          name: 'image',
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
      ],
    },

    createDescriptionBlock({
      fields: [
        {
          name: 'name',
          type: 'string',
          description: 'Example: Gentle Grass ',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'author',
          type: 'string',
          description: 'Example: Anisuzzaman Faruque',
        },
        {
          name: 'publishedBy',
          type: 'array',
          of: [{ type: 'string' }],
        },
        {
          name: 'isbn',
          title: 'ISBN',
          type: 'string',
        },
        {
          title: 'Button',
          name: 'cta',
          type: 'cta',
        },
      ],
    }),
  ],
  preview: {
    select: { descriptionBlock: 'descriptionBlock' },
    prepare: ({
      descriptionBlock,
    }: {
      descriptionBlock?: { name: string };
    }) => ({
      title: descriptionBlock?.name ?? 'Documentation',
      subtitle: 'Documentation',
    }),
  },
};

export default documentation;
