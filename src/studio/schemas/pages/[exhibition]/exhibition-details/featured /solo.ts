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
          name: 'datetime',
          type: 'datetime',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'socials',
          type: 'array',
          of: [{ type: 'social' }],
        },

        {
          name: 'description',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
      preview: {
        select: {
          title: 'name',
          subtitle: 'description',
        },
      },
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

export default featuredSolo;
