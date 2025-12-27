import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const keyValuePairs = {
  name: 'keyValuePairs',
  type: 'object',
  icon: FcInfo,
  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Logo (Optional)',
      description: 'Logo for this association in circle size (like arrow in back button)',
    },
    {
      title: 'Role',
      name: 'key',
      type: 'string',
      description: 'example: Organised by',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'value',
      type: 'string',
      description: 'example: Bangladesh National Museum, Dhaka',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'url',
      type: 'url',
      title: 'External Link (Optional)',
      hidden: true,
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Button Text (Optional)',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'value',
    },
  },
};

export default keyValuePairs;
