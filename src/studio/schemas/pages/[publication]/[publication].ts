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
      title: 'ISBN',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
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
          { title: 'Available', value: 'available' },
          { title: 'Out of Stock', value: 'outOfStock' },
        ],
      },
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
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'associationsList',
      type: 'array',
      of: [{ type: 'keyValuePairs' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'exproleLink',
      type: 'cta',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      author: 'subtitle',
      subtitle: 'description',
      media: 'publicationImage',
    },
    prepare: ({
      title,
      subtitle,
      author,
      media,
    }: DefaultPreviewProps & { author: string }) => ({
      title,
      subtitle: `${author} | ${toPlainText(subtitle as any)}`,
      media,
    }),
  },
};

export default publication;
