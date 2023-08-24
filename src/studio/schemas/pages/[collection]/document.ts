import { toPlainText } from '@portabletext/svelte';
import { BsCollection } from 'react-icons/bs';
import type { Rule } from 'sanity';

const collection = {
  name: 'collection',
  type: 'document',
  icon: BsCollection,
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
      name: 'artworkImages',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().max(4),
      of: [
        {
          name: 'artworkImage',
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
      ],
    },
    {
      name: 'information',
      title: 'Artwork Information',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'This will display in detail page and the preview page',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'inquiryButton',
      type: 'cta',
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
      name: 'asset',
      type: 'asset',
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
        { type: 'common.imageAsset' },
        { type: 'collection.summary' },
        { type: 'common.note' },
        { type: 'collection.artist' },
        { type: 'collection.publications' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'information',
      media: 'artworkImages',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ title, subtitle, media }: any) => ({
      title,
      subtitle: toPlainText(subtitle),
      media: media[0],
    }),
  },
};

export default collection;
