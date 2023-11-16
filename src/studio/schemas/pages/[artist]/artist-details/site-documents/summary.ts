import { FaHighlighter } from 'react-icons/fa';
import { FcInfo } from 'react-icons/fc';
import type { DefaultPreviewProps, Rule } from 'sanity';

const summary = {
  name: 'artist.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,

  fields: [
    {
      name: 'quote',
      type: 'quote',
    },

    {
      name: 'images',
      title: 'Artist And Studio Images',
      type: 'array',
      validation: (Rule: Rule) => Rule.length(2).required(),
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
      icon: FcInfo,
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },

    {
      name: 'vr',
      title: "Artist's Studio VR",
      type: 'reference',
      to: [{ type: 'vr' }],
    },
  ],
  preview: {
    select: {
      title: 'quote.text',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'Summary',
    }),
  },
};

export default summary;
