import VideoPreview from '@/studio/components/VideoPreview';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import React from 'react';
import { formatDate } from '@/studio/helper';
import { orderRankField } from '@sanity/orderable-document-list';
// import type { SanityDocument } from '@sanity/client';

type PrepareProps = SanityDefaultPreviewProps & {
  image: SanityAsset;
  webm: string;
  hevc: string;
  artists: Array<{ name: string }>;
  startDate: string;
  endDate?: string;
  gallery?: string;
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
        'This will overwrite the status derived from the provided start and end dates.(Preferred all caps input)',
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
      name: 'exhibitionType',
      title: 'Exhibition Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solo Exhibition', value: 'solo' },
          { title: 'Group Exhibition', value: 'group' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule: Rule) => Rule.required(),
      description: 'This determines the exhibition type. "Group Exhibition Members" section will only show on website when "Group Exhibition" is selected.',
    },
    {
      name: 'artists',
      title: 'Artist in this ehibition',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
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
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'exhibitionTag' }],
      validation: (Rule: Rule) => Rule.required(),
      description: 'Select a tag for this exhibition (e.g., Solo Exhibition, Group Exhibition, etc.)',
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
      name: 'associationsButton',
      title: 'External link Button (Optional)',
      type: 'cta',
      description: 'Button to display below the associations list',
    },
    {
      title: 'Social Links',
      name: 'socials',
      type: 'array',
      of: [{ type: 'social' }],
    },
    {
      title: 'Organised by',
      name: 'organizedBy',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of organizations that organized this exhibition',
    },
    {
      title: 'Published by',
      name: 'publishedBy',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of organizations that published this exhibition',
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
        { type: 'exhibition.team' },
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
      subtitle: 'subtitle',
      type: 'type.name',
      gallery: 'gallery.title',
      exhibitionType: 'exhibitionType',
    },
    prepare: ({
      title,
      image,
      webm,
      hevc,
      subtitle,
      type,
      startDate,
      endDate,
      gallery,
      exhibitionType,
    }: PrepareProps & { gallery: string; subtitle?: string; type?: string; exhibitionType?: 'solo' | 'group' }) => {
      // Determine exhibition type label based on exhibitionType field
      const exhibitionTypeLabel =
        exhibitionType === 'solo'
          ? 'Solo Exhibition'
          : exhibitionType === 'group'
            ? 'Group Exhibition'
            : 'Exhibition';

      // Determine the subtitle to show - prioritize the Subtitle field
      let displaySubtitle = subtitle || '';
      if (!displaySubtitle) {
        if (exhibitionType === 'group') {
          displaySubtitle = 'Group Exhibition';
        } else if (exhibitionType === 'solo') {
          displaySubtitle = type || 'Solo Exhibition';
        } else {
          displaySubtitle = type || 'Exhibition';
        }
      }

      // Format dates: if same date, show only start date
      const isSameDate =
        startDate && endDate && formatDate(startDate) === formatDate(endDate);
      const dateRange = isSameDate
        ? formatDate(startDate)
        : `${formatDate(startDate)}${endDate ? ` - ${formatDate(endDate)}` : ''}`;

      return {
        title: `${title} | ${exhibitionTypeLabel}`,
        subtitle: `${displaySubtitle} | ${gallery || 'Venue TBA'} | ${dateRange}`,
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
