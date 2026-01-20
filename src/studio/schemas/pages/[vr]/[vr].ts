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
      title: 'VR Title',
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
      title: 'Subtitle (required)',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'VR Map Link',
      name: 'link',
      type: 'url',
      description:
        "This link will be applied to the 'Title' in the vr preview page",
    },

    {
      title: 'Space / Gallery',
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
      name: 'url',
      type: 'url',
      title: 'Embedded vr url',
      components: { input: VrPreview },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'thumbnail',
      type: 'image',
    },
    {
      name: 'coverImage',
      type: 'image',
      description:
        'This image will be used as the cover image if this vr is featured in the listing page hero section.',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          title: 'Alternative Text',
          description: 'Important for SEO and accessibility',
          type: 'string',
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
      name: 'caption',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Start Date',
      name: 'startDate',
      type: 'datetime',
    },

    {
      name: 'endDate',
      description:
        'If the event is one day long then ignore the end and only fill the start date',
      type: 'datetime',
    },
    {
      title: 'Status',
      name: 'isActive',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Temporarily Inactive', value: 'temporarily-inactive' },
          { title: 'Inactive', value: 'inactive' },
        ],
      },
      description: 'Choose whether this VR experience is Active, Temporarily Inactive, or Inactive',

    },
    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category.name',
      media: 'coverImage',
    },
  },
};

export default vr;
