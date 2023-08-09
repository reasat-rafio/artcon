import { PiVirtualRealityFill } from 'react-icons/pi';
import type { Rule } from 'sanity';

const vrExhibition = {
  name: 'vrExhibition',
  type: 'document',
  title: 'VR Exhibition',
  icon: PiVirtualRealityFill,
  fields: [
    { name: 'name', type: 'string' },
    {
      name: 'url',
      type: 'url',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Placeholder Image',
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      media: 'image',
    },
  },
};

export default vrExhibition;
