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
      title: 'Subtitle',
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
      title: 'Top Title',
      name: 'topTitle',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
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
      name: 'collectorImage',
      title: 'Collector Image',
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
      name: 'thumbnail',
      title: 'Thumbnail (for listing card)',
      description: 'This image will be displayed on the collection listing page card',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
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
      title: 'Description',
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'associationsList',
      title: 'Associations List',
      description: 'Key-value pairs like Catalogue no, First published, Language, etc.',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'exproleLink',
      title: 'Explore Link',
      type: 'object',
      fields: [
        {
          title: 'Button Title',
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
      title: 'Stock',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'available' },
          { title: 'Out of Stock', value: 'outOfStock' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'asset',
      title: 'Hero Image / Video',
      type: 'asset',
    },
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      category: 'category.name',
      media: 'thumbnail',
    },
    prepare: ({
      title,
      subtitle,
      category,
      media,
    }: DefaultPreviewProps & { subtitle: string; category: string }) => ({
      title,
      subtitle: `${subtitle} | ${category}`,
      media,
    }),
  },
};

export default collection;
