/* eslint-disable @typescript-eslint/no-explicit-any */
import { toPlainText } from '@portabletext/svelte';
import { orderRankField } from '@sanity/orderable-document-list';
import { BsFillPostageFill } from 'react-icons/bs';
import type { DefaultPreviewProps, Rule } from 'sanity';

const publication = {
  name: 'publication',
  type: 'document',
  icon: BsFillPostageFill,
  fields: [
    orderRankField({ type: 'publication' }),
    {
      title: 'Publication Title',
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
      name: 'category',
      type: 'reference',
      to: [{ type: 'publicationCategory' }],
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'publishedBy',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'isbn',
      title: 'ISBN (required)',
      type: 'string',
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'creditList',
      title: 'Credit List',
      description: 'Key-value pairs for credits like Author, Editor, Designer, etc.',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
    },
    {
      name: 'prices',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          title: 'Price in BDT',
          name: 'priceBDT',
          type: 'number',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          title: 'Discount Price in BDT',
          name: 'discountPriceBDT',
          type: 'number',
        },
        {
          title: 'Price in USD',
          name: 'priceUSD',
          type: 'number',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'stock',
      type: 'string',
      options: {
        list: [
          { title: 'Available', value: 'Available' },
          { title: 'Out of Stock', value: 'Out of Stock' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'heroImageVideo',
      title: 'Hero Image / Video',
      description: 'This image or video will be displayed on the publication hero carousel',
      type: 'sliderImageVideo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail (for listing card)',
      description: 'This image will be displayed on the publication listing page card',
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
      name: 'publicationImage',
      type: 'image',
      options: {
        hotspot: true,
      },
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'subtitle',
      category: 'category.name',
      media: 'publicationImage',
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

export default publication;
