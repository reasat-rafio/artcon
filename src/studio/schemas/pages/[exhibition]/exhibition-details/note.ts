import { FcComments } from 'react-icons/fc';
import type { Rule } from 'sanity';

const note = {
  name: 'exhibition.note',
  title: 'Note',
  type: 'object',
  icon: FcComments,
  fields: [
    {
      name: 'notes',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'note',
          type: 'object',
          icon: FcComments,
          fields: [
            {
              name: 'quote',
              type: 'quote',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'descriptionBlock',
              type: 'object',
              validation: (Rule: Rule) => Rule.required(),
              fields: [
                { name: 'title', type: 'string' },
                { name: 'subtitle', type: 'string' },
                {
                  name: 'description',
                  type: 'text',
                  validation: (Rule: Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'descriptionBlock.title',
              subtitle: 'descriptionBlock.subtitle',
            },
          },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Notes',
    }),
  },
};

export default note;
