/* eslint-disable @typescript-eslint/no-explicit-any */
import { orderRankField } from '@sanity/orderable-document-list';
import type { DefaultPreviewProps, Rule } from 'sanity';
import { BiCameraMovie } from 'react-icons/bi';
import { toPlainText } from '@portabletext/svelte';

const audioVisual = {
  name: 'documentary',
  type: 'document',
  title: 'Audio Visual',
  icon: BiCameraMovie,
  fields: [
    orderRankField({ type: 'documentary' }),
    {
      title: 'Documentary Title',
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
      name: 'type',
      type: 'reference',
      to: [{ type: 'audioVisualType' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'documentaryCategory' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'year',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'duration',
      type: 'string',
    },
    {
      name: 'exploreUrl',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Hero Cover Image',
      name: 'coverImage',
      type: 'image',
      description:
        'This image will be used as the cover image if this documentary is featured in the listing page hero section.',
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
      name: 'documentaryVideo',
      type: 'youtube',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'synopsys',
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
          of: [{ type: 'block', lists: [], styles: [] }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'information',
      type: 'array',
      of: [{ type: 'block', styles: [], lists: [] }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'information',
      media: 'coverImage',
      year: 'year',
    },
    prepare: ({
      title,
      subtitle,
      year,
      media,
    }: DefaultPreviewProps & { year: string }) => ({
      title,
      subtitle: `${year} | ${toPlainText(subtitle as any)}`,
      media,
    }),
  },
};

export default audioVisual;
