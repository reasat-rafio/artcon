import { FaHighlighter } from 'react-icons/fa';
import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const summary = {
  name: 'exhibition.summary',
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
      name: 'descriptionBlock',
      type: 'object',
      icon: FcInfo,
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'startDate',
          type: 'datetime',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'endDate',
          description:
            'If the event is one day long then ignore the end and only fill the start date',
          type: 'datetime',
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

        {
          name: 'description',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },

    {
      name: 'vrExhibitionnCta',
      type: 'vrExhibitionnCta',
      title: 'VR Exhibitionn Call To Action',
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