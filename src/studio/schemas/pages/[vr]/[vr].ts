import VrPreview from '@/studio/components/VrPreview';
import { orderRankField } from '@sanity/orderable-document-list';
import { PiVirtualRealityFill } from 'react-icons/pi';
import type { Rule } from 'sanity';

const vr = {
  name: 'vr',
  type: 'document',
  title: 'VR',
  icon: PiVirtualRealityFill,
  fields: [
    orderRankField({ type: 'vr' }),
    {
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
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'vrCategory' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'previewImage',
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
      name: 'placeholderImage',
      title: 'Thumbnail',
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
        {
          name: 'caption',
          type: 'text',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'url',
      type: 'url',
      components: { input: VrPreview },
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
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'previewImage',
    },
  },
};

export default vr;
