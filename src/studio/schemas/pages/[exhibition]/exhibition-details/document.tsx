import VideoPreview from '@/studio/components/VideoPreview';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';

interface PrepareProps extends SanityDefaultPreviewProps {
  image: SanityAsset;
  webm: string;
  hevc: string;
}

const exhibition = {
  name: 'exhibition',
  type: 'document',
  icon: FcStackOfPhotos,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
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
      name: 'asset',
      type: 'asset',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'status',
      type: 'string',
      description:
        'This will overwrite the status derived from the provided start and end dates.',
    },
    {
      name: 'type',
      type: 'string',
      description:
        'This will replace the automatically determined type based on the count of included artists.',
    },
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },

    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibitionTag' }] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'artists',
      title: 'Artist in this ehibition',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (Rule: Rule) => Rule.unique(),
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: 'publication' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'exhibition.summary' },
        { type: 'common.imageAsset' },
        { type: 'exhibition.includedArtists' },
        { type: 'exhibition.note' },
        { type: 'exhibition.promotion' },
        { type: 'exhibition.artwork' },
        { type: 'exhibition.gallery' },
        { type: 'exhibition.newsAndMedia' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'seo.description',
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
          FcStackOfPhotos
        ),
      };
    },
  },
};

export default exhibition;
