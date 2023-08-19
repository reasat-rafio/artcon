import type { SanityAssetDocument } from '@sanity/client';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { Rule } from 'sanity';

interface AsssetFieldProps {
  parent: {
    image: SanityAsset;
    video: {
      video_webm: SanityAssetDocument;
      video_hevc: SanityAssetDocument;
    };
  };
}

const asset = {
  name: 'asset',
  type: 'object',
  description:
    'Please provide input in only one of the following fields: Image or Video',
  validation: (Rule: Rule) => Rule.required(),
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      hidden: ({ parent }: AsssetFieldProps) => !!parent?.video?.video_webm,
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
    {
      name: 'video',
      type: 'object',
      hidden: ({ parent }: AsssetFieldProps) => !!parent?.image?.asset,
      fields: [
        {
          name: 'video_webm',
          type: 'file',
          title: 'WebM',
          options: {
            accept: 'video/webm,video/x-matroska',
          },
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'video_hevc',
          type: 'file',
          title: 'MOV - HEVC',
          options: {
            accept: 'video/quicktime,video/mp4',
          },
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
};

export default asset;
