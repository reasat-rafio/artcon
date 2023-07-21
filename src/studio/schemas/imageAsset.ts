import { FcMms } from 'react-icons/fc';
import type { Rule } from 'sanity';

const imageAsset = {
  title: 'Image Asset',
  name: 'common.imageAsset',
  type: 'object',
  icon: FcMms,
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
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
  preview: {
    select: {
      title: 'image.alt',
      media: 'image',
    },
  },
};

export default imageAsset;
