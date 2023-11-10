import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FcNews } from 'react-icons/fc';
import type { Rule } from 'sanity';

const newsAndMedia = {
  title: 'News And Media',
  name: 'event.newsAndMedia',
  type: 'object',
  icon: FcNews,
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    {
      name: 'newsAndMedia',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [
        {
          name: 'newsAndMedia',
          type: 'object',
          icon: FcNews,
          validation: (Rule: Rule) => Rule.required(),
          fields: [
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
              ],
            },
            {
              name: 'title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'subtitle',
              type: 'string',
              title: 'Media Name',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'link',
              type: 'url',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'subtitle',
              media: 'image',
            },
          },
        },
      ],
    },

    createDescriptionBlock({
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'descriptionBlock.title',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default newsAndMedia;
