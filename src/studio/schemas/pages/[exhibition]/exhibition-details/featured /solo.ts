import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FaUserAlt } from 'react-icons/fa';
import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const featuredSolo = {
  title: 'Solo Exhibition',
  name: 'exhibition.featured.solo',
  icon: FaUserAlt,
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },

    createDescriptionBlock([
      {
        name: 'name',
        type: 'string',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'subtile',
        type: 'string',
        validation: (Rule: Rule) => Rule.required(),
      },
      {
        name: 'socials',
        type: 'array',
        of: [{ type: 'social' }],
      },
    ]),

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

    {
      name: 'statement',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'statement',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },

    {
      name: 'vrExhibition',
      type: 'vrExhibition',
      title: 'VR Exhibition',
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

export default featuredSolo;
