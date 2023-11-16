import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import VideoPreview from '@/studio/components/VideoPreview';
import React from 'react';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { SanityAssetDocument } from '@sanity/client';
import { FcHome } from 'react-icons/fc';

type AsssetFieldProps = {
  parent: {
    image: SanityAsset;
    video: {
      video_webm: SanityAssetDocument;
      video_hevc: SanityAssetDocument;
    };
  };
};
type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
};

const commonHero = {
  name: 'common.hero',
  type: 'object',
  title: 'Hero',
  icon: FcHome,
  fields: [
    {
      title: 'Title Top',
      name: 'text',
      type: 'string',
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Subtitle',
      name: 'type',
      type: 'text',
    },
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'asset',
      title: 'Image / Video',
      type: 'object',
      description: 'Please provide input in only one of the following fields',
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
    },
  ],
  preview: {
    select: {
      title: 'title',
      image: 'asset.image',
      webm: 'asset.video.video_webm.asset.url',
      hevc: 'asset.video.video_hevc.asset.url',
    },
    prepare: ({ title, image, webm, hevc }: PrepareProps) => {
      return {
        title,
        subtitle: 'Hero',
        media: image ? (
          image
        ) : webm && hevc ? (
          <VideoPreview background="#eee" webm={webm} hevc={hevc} />
        ) : (
          FcHome
        ),
      };
    },
  },
};

export default commonHero;
