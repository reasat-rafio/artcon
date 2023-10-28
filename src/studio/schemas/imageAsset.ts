import { FcMms } from 'react-icons/fc';
import type { Rule } from 'sanity';

const imageAsset = {
  title: 'Image Divider',
  name: 'common.imageAsset',
  type: 'object',
  icon: FcMms,
  fields: [
    {
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      media: 'image',
    },
  },
};

export default imageAsset;
