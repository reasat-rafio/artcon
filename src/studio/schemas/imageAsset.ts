import { FcMms } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';

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
      options: { hotspot: true },
    },
  ],
  preview: {
    select: {
      title: 'image.asset.originalFilename',
      media: 'image',
    },
    prepare: (props: SanityDefaultPreviewProps) => ({
      ...props,
      subtitle: 'Image Divider',
    }),
  },
};

export default imageAsset;
