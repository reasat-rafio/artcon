import type { Rule } from 'sanity';
import { FcDocument } from 'react-icons/fc';
import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';

const documentation = {
  title: 'Documentation',
  name: 'collection.documentation',
  type: 'object',
  icon: FcDocument,
  fields: [
    {
      name: 'documents',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'doc',
          type: 'object',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'image',
              type: 'image',
              options: { hotspot: true },
              validation: (Rule: Rule) => Rule.required(),
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
            {
              name: 'quote',
              type: 'quote',
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
                  name: 'information',
                  type: 'array',
                  description:
                    'Example: Published by ARTcon and Drik Gallery \n ISBN.. ',
                  of: [
                    {
                      type: 'block',
                      styles: [],
                      lists: [],
                    },
                  ],
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
            select: {
              title: 'descriptionBlock.name',
              subtitle: 'descriptionBlock.description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: { documents: 'documents' },
    prepare: ({
      documents,
    }: {
      documents: { descriptionBlock?: { name: string } }[];
    }) => ({
      title: documents?.length
        ? documents
            .map(({ descriptionBlock }) => descriptionBlock?.name)
            .join(', ')
        : 'Documentation',
      subtitle: 'Documentation',
    }),
  },
};

export default documentation;
