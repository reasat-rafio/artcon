import VideoPreview from '@/studio/components/VideoPreview';
import { formatDate } from '@/studio/helper';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { orderRankField } from '@sanity/orderable-document-list';
import React from 'react';
import { FcVideoProjector } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';

type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
  artists: unknown[];
  startDate: string;
  endDate?: string;
  tagName: string;
};

const project = {
  name: 'project',
  type: 'document',
  icon: FcVideoProjector,
  fields: [
    orderRankField({ type: 'project' }),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Project Title',
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
      name: 'topTitle',
      title: 'Top Title (Optional)',
      type: 'string',
      description:
        'This will overwrite the top title derived from the provided start and end dates.',
    },

    {
      name: 'subtitle',
      title: 'Subtitle (Optional)',
      type: 'string',
      description: 'This will replace the tag name.',
    },
    {
      title: 'Button (Optional)',
      description: 'This will display at hero section.',
      name: 'cta',
      type: 'cta',
    },

    {
      name: 'tag',
      type: 'reference',
      to: [{ type: 'projectTag' }],
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
      title: 'Description (required)',
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      description: 'This will display in detail page and the preview page',
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'associationsList',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Organised by',
      name: 'organizedBy',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of organizations that organized this project',
    },
    {
      title: 'Published by',
      name: 'publishedBy',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of organizations that published this project',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [
        { type: 'project.summary' },
        { type: 'common.imageAsset' },
        { type: 'project.video' },
        { type: 'project.gallery' },
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
      tagName: 'tag.name',
    },
    prepare: ({
      title,
      image,
      webm,
      hevc,
      startDate,
      endDate,
      tagName,
    }: PrepareProps) => {
      return {
        title: title,
        subtitle: `${tagName} | ${formatDate(startDate)} ${
          endDate ? ` - ${formatDate(endDate)}` : ''
        }`,
        media: image ? (
          image
        ) : webm && hevc ? (
          <VideoPreview background="#eee" webm={webm} hevc={hevc} />
        ) : (
          FcVideoProjector
        ),
      };
    },
  },
};

export default project;
