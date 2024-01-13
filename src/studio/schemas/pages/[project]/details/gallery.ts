import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { toPlainText } from '@portabletext/svelte';
import { FcGallery } from 'react-icons/fc';
import type { DefaultPreviewProps, PortableTextBlock, Rule } from 'sanity';

const gallery = {
  title: 'Photo Gallery',
  name: 'project.gallery',
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
            {
              name: 'caption',
              title: 'Caption Text',
              description: 'This is will display under the image popup',
              type: 'string',
            },
          ],
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
      title: 'descriptionBlock.description',
    },
    prepare: ({ title }: DefaultPreviewProps) => ({
      title: toPlainText(title as PortableTextBlock[]),
      subtitle: 'Photo Gallery',
    }),
  },
};

export default gallery;
