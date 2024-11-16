import VideoPreview from '@/studio/components/VideoPreview';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';
import { formatDate } from '@/studio/helper';
import { orderRankField } from '@sanity/orderable-document-list';
import type { SanityDocument } from '@sanity/client';

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
    orderRankField({ type: 'exhibition' }),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Exhibition Title',
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
      title: 'Hero Image / Video',
      type: 'asset',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'sliderImageVideo',
      type: 'sliderImageVideo',
      title: 'Slider Image / Video',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'topTitle',
      title: 'Top Title (Optional)',
      type: 'string',
      description:
        'This will overwrite the status derived from the provided start and end dates.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle (Optional)',
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
      validation: (Rule: Rule) => Rule.unique().required(),
    },
    {
      name: 'artworks',
      title: 'Featured Artworks in this Exhibition',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'collection' }],
          options: {
            filter: ({ document }: SanityDocument) => {
              return {
                filter: 'artist._ref in $ids',
                params: {
                  ids: document?.artists?.map(
                    (artist: { _ref: string }) => artist._ref,
                  ) ?? [''],
                },
              };
            },
          },
        },
      ],
      validation: (Rule: Rule) => Rule.unique().required(),
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: 'publication' }],
    },
    {
      name: 'tag',
      title: 'Exhibition Type',
      type: 'reference',
      to: [{ type: 'exhibitionTag' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Space / Gallery',
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
        },
      ],
      description: 'This will display in detail page and the preview page',
    },
    {
      name: 'associationsList',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [
        { type: 'exhibition.summary' },
        { type: 'common.imageAsset' },
        { type: 'exhibition.includedArtists' },
        { type: 'common.note' },
        { type: 'exhibition.publication' },
        { type: 'common.artwork' },
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
