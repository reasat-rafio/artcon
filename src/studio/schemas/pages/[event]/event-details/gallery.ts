import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { toPlainText } from '@portabletext/svelte';
import { FcGallery } from 'react-icons/fc';
import type { DefaultPreviewProps, PortableTextBlock, Rule } from 'sanity';

const gallery = {
  title: 'Photo Gallery',
  name: 'event.gallery',
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
      title: 'descriptionBlock.description',
    },
    prepare: ({ title }: DefaultPreviewProps) => ({
      title: toPlainText(title as PortableTextBlock[]),
      subtitle: 'Photo Gallery',
    }),
  },
};

export default gallery;
