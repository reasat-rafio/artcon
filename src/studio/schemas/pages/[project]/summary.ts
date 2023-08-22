import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FaHighlighter } from 'react-icons/fa';
import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const summary = {
  name: 'project.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },

    createDescriptionBlock({
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'moreInformations',
          type: 'array',
          of: [
            {
              name: 'information',
              type: 'object',
              icon: FcInfo,
              fields: [
                {
                  name: 'key',
                  type: 'string',
                  validation: (Rule: Rule) => Rule.required(),
                },
                {
                  name: 'value',
                  type: 'string',
                  validation: (Rule: Rule) => Rule.required(),
                },
              ],
              preview: {
                select: {
                  title: 'key',
                  subtitle: 'value',
                },
              },
            },
          ],
        },
      ],
    }),
    {
      name: 'vr',
      title: 'VR',
      type: 'reference',
      to: [{ type: 'vr' }],
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
