import { FcInfo } from 'react-icons/fc';
import { LuPaintbrush } from 'react-icons/lu';
import type { Rule } from 'sanity';

const artwork = {
  title: 'artwork',
  name: 'exhibition.artwork',
  icon: LuPaintbrush,
  type: 'object',
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
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'cta',
          type: 'cta',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'artworks',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'artwork',
          type: 'object',
          icon: LuPaintbrush,
          validation: (Rule: Rule) => Rule.required(),
          fields: [
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
                  name: 'description',
                  type: 'text',
                  validation: (Rule: Rule) => Rule.required(),
                },
              ],
            },
          ],
          preview: {
            select: {
              title: 'image.description',
              media: 'image',
            },
          },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'descriptionBlock.title',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default artwork;
