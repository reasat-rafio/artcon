import { orderRankField } from '@sanity/orderable-document-list';
import { FaPaintBrush } from 'react-icons/fa';
import type { DefaultPreviewProps, Rule } from 'sanity';

const collection = {
  name: 'collection',
  type: 'document',
  icon: FaPaintBrush,
  fields: [
    orderRankField({ type: 'collection' }),
    {
      title: 'Collection Title',
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Subtitle (required)',
      name: 'subtitle',
      type: 'string',
    },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Artist',
      name: 'artist',
      type: 'reference',
      to: [{ type: 'artist' }],
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'collectionTag' }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'publishedBy',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
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
      name: 'sliderImageVideo',
      type: 'sliderImageVideo',
      title: 'Slider Image / Video',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'quote',
      type: 'quote',
    },
    {
      title: 'Description (required)',
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'associationsList',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'exproleLink',
      type: 'object',
      fields: [
        {
          title: 'Button title',
          name: 'title',
          type: 'string',
        },
        {
          name: 'href',
          title: 'Button URL',
          description: `The URL field accepts internal links in the format '/page-slug' or '/parent-slug/slug' (e.g., 'artcon.com/exhibition' becomes '/exhibition'). External URLs must begin with 'https://' or 'http://', while email links should use 'mailto:email@example.com'. Any valid external URL is accepted.`,
          type: 'string',
        },
      ],
    },
    {
      name: 'stock',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Out of Stock', value: 'outOfStock' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },

    // Fields needed for listing page (keep for backwards compatibility)
    {
      name: 'information',
      title: 'Artwork Information (for listing)',
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
              title: 'Creation Details (required)',
              name: 'creationDetails',
              type: 'string',
              description: 'Example: Executed in 1970',
            },
            {
              title: 'Year (required)',
              name: 'year',
              type: 'string',
              description: 'Example: 1970',
            },
          ],
        },
        {
          title: 'Frame (required)',
          name: 'frame',
          type: 'string',
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
      name: 'artworkImages',
      type: 'array',
      description: 'First image will be used as the main image (for listing)',
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
      title: 'Hero Image / Video (for listing page highlight)',
      type: 'asset',
    },
    {
      name: 'topTitle',
      title: 'Top Title (for listing page highlight)',
      type: 'string',
    },
    {
      title: 'Button (for listing page highlight)',
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
      name: 'displayNew',
      title: 'New',
      type: 'boolean',
      description:
        'Toggling this to true will display the new tag on the collection',
      initialValue: false,
      hidden: ({
        document: { displaySold },
      }: {
        document: { displaySold: boolean };
      }) => displaySold,
    },
    {
      name: 'displaySold',
      title: 'Sold',
      type: 'boolean',
      description:
        'Toggling this to true will display the sold tag on the collection',
      initialValue: false,
      hidden: ({
        document: { displayNew },
      }: {
        document: { displayNew: boolean };
      }) => displayNew,
    },
    {
      name: 'isAvailable',
      type: 'boolean',
      title: 'Collection is Available',
      validation: (Rule: Rule) => Rule.required(),
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'name',
      author: 'subtitle',
      category: 'category.title',
      media: 'artworkImages',
    },
    prepare: ({
      title,
      author,
      category,
      media,
    }: DefaultPreviewProps & { author: string; category: string }) => ({
      title,
      subtitle: `${author} | ${category}`,
      media: media?.[0],
    }),
  },
};

export default collection;
