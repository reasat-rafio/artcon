import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FcComments } from 'react-icons/fc';
import type { Rule } from 'sanity';

const note = {
  name: 'common.note',
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

            createDescriptionBlock({
              fields: [
                { name: 'title', type: 'string' },
                { name: 'subtitle', type: 'string' },
              ],
            }),
          ],
          preview: {
            select: {
              title: 'descriptionBlock.title',
              subtitle: 'descriptionBlock.description',
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
