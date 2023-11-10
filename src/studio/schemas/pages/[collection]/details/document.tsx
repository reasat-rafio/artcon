import { orderRankField } from '@sanity/orderable-document-list';
import { FaPaintBrush } from 'react-icons/fa';
import type { Rule } from 'sanity';

const collection = {
  name: 'collection',
  type: 'document',
  icon: FaPaintBrush,
  fields: [
    orderRankField({ type: 'collection' }),
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Collection Name',
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
      name: 'information',
      title: 'Artwork Information',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'media',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'size',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'artDate',
          type: 'object',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'creationDetails',
              type: 'string',
              description: 'Example: Executed in 1970',
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'year',
              type: 'string',
              description: 'Example: 1970',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },

        {
          name: 'frame',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'moreInformation',
          description: 'example: This work is in a temporary frame. (frame)',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
    {
      name: 'inquiryButton',
      type: 'cta',
    },
    {
      name: 'artworkImages',
      type: 'array',
      description: 'First image will be used as the main image',
      validation: (Rule: Rule) => Rule.required().max(4),
      of: [
        {
          name: 'artworkImage',
          type: 'image',
          options: {
            hotspot: true,
          },
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
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
      title: 'Top Title',
      type: 'string',
    },
    {
      name: 'type',
      title: 'Subtitle',
      type: 'string',
    },
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },

    {
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'collectionTag' }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'provenance',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },

    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),

      of: [
        { type: 'common.imageAsset' },
        { type: 'collection.summary' },
        { type: 'common.note' },
        { type: 'collection.artist' },
        { type: 'collection.documentation' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'information.artDate.creationDetails',
      media: 'artworkImages',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle,
      media: media[0],
    }),
  },
};

export default collection;
