import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FcGallery } from 'react-icons/fc';
import type { Rule } from 'sanity';

const gallery = {
  title: 'Photo Gallery',
  name: 'exhibition.gallery',
  type: 'object',
  icon: FcGallery,
  fields: [
    {
      name: 'images',
      type: 'array',
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
    createDescriptionBlock({
      fields: [
        {
          name: 'title',
          title: 'Section Title',
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

export default gallery;
