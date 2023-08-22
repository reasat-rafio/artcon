import VrPreview from '@/studio/components/VrPreview';
import { PiVirtualRealityFill } from 'react-icons/pi';
import type { Rule } from 'sanity';

const vr = {
  name: 'vr',
  type: 'document',
  title: 'VR',
  icon: PiVirtualRealityFill,
  fields: [
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
      name: 'cover',
      type: 'asset',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      components: {
        input: VrPreview,
      },
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
      name: 'gallery',
      type: 'reference',
      to: [{ type: 'gallery' }],
      validation: (Rule: Rule) => Rule.required(),
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
      subtitle: 'url',
      media: 'image',
    },
  },
};

export default vr;
