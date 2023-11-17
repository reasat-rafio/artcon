import VrPreview from '@/studio/components/VrPreview';
import { orderRankField } from '@sanity/orderable-document-list';
import type { Rule } from 'sanity';
import { BiCameraMovie } from 'react-icons/bi';

const documentary = {
  name: 'documentary',
  type: 'document',
  icon: BiCameraMovie,
  fields: [
    orderRankField({ type: 'documentary' }),
    {
      title: 'Documentary Name',
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    // {
    //   name: 'subtitle',
    //   type: 'string',
    //   validation: (Rule: Rule) => Rule.required(),
    // },
    {
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'category',
      type: 'reference',
      to: [{ type: 'documentaryCategory' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      type: 'image',
      description:
        "If this vr is featured in listing page hero, it'll be used as the cover image",
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
      name: 'url',
      type: 'url',
      components: { input: VrPreview },
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'description',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'Button',
      type: 'cta',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'coverImage',
    },
  },
};

export default documentary;
