import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const keyValuePairs = {
  name: 'keyValuePairs',
  type: 'object',
  icon: FcInfo,
  fields: [
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
      description: 'Add an external link for this association (e.g., client website)',
    },
    {
      name: 'buttonText',
      type: 'string',
      title: 'Button Text (Optional)',
      description: 'Text for the button (e.g., "Visit Website"). Only shows if URL is provided.',
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
