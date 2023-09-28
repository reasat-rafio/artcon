import VideoPreview from '@/studio/components/VideoPreview';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';
import { formatDate } from '@/studio/helper';

type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
  artists: unknown[];
  startDate: string;
  endDate?: string;
};

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
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'This will display in detail page and the preview page',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'associationsList',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'status',
      title: 'Status (Optional)',
      type: 'string',
      description:
        'This will overwrite the status derived from the provided start and end dates.',
    },
    {
      name: 'type',
      title: 'Type (Optional)',
      type: 'string',
      description:
        'This will replace the automatically determined type based on the count of included artists.',
    },
    {
      title: 'Button (Optional)',
      description: 'This will display at hero section.',
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'artists',
      title: 'Artist in this ehibition',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (Rule: Rule) => Rule.unique(),
    },

    {
      name: 'artworks',
      title: 'Featured Artworks in this Exhibition',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      validation: (Rule: Rule) => Rule.unique(),
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: 'publication' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibitionTag' }] }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'previewDisplayImage',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule: Rule) => Rule.required(),
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'exhibition.summary' },
        { type: 'common.imageAsset' },
        { type: 'exhibition.includedArtists' },
        { type: 'common.note' },
        { type: 'exhibition.publication' },
        { type: 'exhibition.artwork' },
        { type: 'exhibition.gallery' },
        { type: 'exhibition.newsAndMedia' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      startDate: 'startDate',
      endDate: 'endDate',
      image: 'asset.image',
      webm: 'asset.video.video_webm.asset.url',
      hevc: 'asset.video.video_hevc.asset.url',
      artists: 'artists',
    },
    prepare: ({
      title,
      image,
      webm,
      hevc,
      artists,
      startDate,
      endDate,
    }: PrepareProps) => {
      const exhibitionType =
        artists?.length === 1 ? 'Solo Exhibition' : 'Group Exhibition';

      return {
        title: `${title} | ${exhibitionType}`,
        subtitle: `${formatDate(startDate)} ${
          endDate ? ` - ${formatDate(endDate)}` : ''
        }`,
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
