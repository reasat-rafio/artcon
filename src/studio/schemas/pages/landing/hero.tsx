import { FaChrome } from 'react-icons/fa';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import VideoPreview from '@/studio/components/VideoPreview';
import React from 'react';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { SanityAssetDocument } from '@sanity/client';

interface AsssetFieldProps {
  parent: {
    image: SanityAsset;
    video: {
      video_webm: SanityAssetDocument;
      video_hevc: SanityAssetDocument;
    };
  };
}
interface PrepareProps extends SanityDefaultPreviewProps {
  image: SanityAsset;
  webm: string;
  hevc: string;
}

const hero = {
  name: 'landingPage.hero',
  type: 'object',
  title: 'Hero',
  icon: FaChrome,
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'asset',
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
      subtitle: 'subtitle',
      image: 'asset.image',
      webm: 'asset.video.video_webm.asset.url',
      hevc: 'asset.video.video_hevc.asset.url',
    },
    prepare: ({ title, subtitle, image, webm, hevc }: PrepareProps) => {
      return {
        title,
        subtitle,
        media: image ? (
          image
        ) : webm && hevc ? (
          <VideoPreview background="#eee" webm={webm} hevc={hevc} />
        ) : (
          FaChrome
        ),
      };
    },
  },
};

export default hero;
