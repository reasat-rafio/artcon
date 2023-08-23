import VideoPreview from '@/studio/components/VideoPreview';
import VrPreview from '@/studio/components/VrPreview';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { PiVirtualRealityFill } from 'react-icons/pi';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';

type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
};

const vr = {
  name: 'vr',
  type: 'document',
  title: 'VR',
  icon: PiVirtualRealityFill,
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'vrCategory' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'cover',
      type: 'asset',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      components: {
        input: VrPreview,
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'startDate',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'endDate',
      description:
        'If the event is one day long then ignore the end and only fill the start date',
      type: 'datetime',
    },
    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      image: 'cover.image',
      webm: 'cover.video.video_webm.asset.url',
      hevc: 'cover.video.video_hevc.asset.url',
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
          PiVirtualRealityFill
        ),
      };
    },
  },
};

export default vr;
