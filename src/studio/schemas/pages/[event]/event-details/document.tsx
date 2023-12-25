import VideoPreview from '@/studio/components/VideoPreview';
import { formatDate } from '@/studio/helper';
import { FcCalendar } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { orderRankField } from '@sanity/orderable-document-list';

type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
  startDate: string;
  endDate?: string;
};

const event = {
  name: 'event',
  type: 'document',
  icon: FcCalendar,
  fields: [
    orderRankField({ type: 'event' }),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Event Title',
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
      name: 'status',
      title: 'Top Title (Optional)',
      type: 'string',
      description:
        'This will overwrite the status derived from the provided start and end dates.',
    },
    {
      name: 'type',
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
      name: 'tag',
      title: 'Event Type',
      type: 'reference',
      to: [{ type: 'eventTag' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [
        { type: 'common.imageAsset' },
        { type: 'event.summary' },
        { type: 'event.documentation' },
        { type: 'event.gallery' },
        { type: 'event.newsAndMedia' },
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
      startDate,
      endDate,
    }: PrepareProps) => {
      return {
        title: title,
        subtitle: `${formatDate(startDate)} ${
          endDate ? ` - ${formatDate(endDate)}` : ''
        }`,
        media: image ? (
          image
        ) : webm && hevc ? (
          <VideoPreview background="#eee" webm={webm} hevc={hevc} />
        ) : (
          FcCalendar
        ),
      };
    },
  },
};

export default event;
