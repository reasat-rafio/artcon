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
  ],
  preview: {
    select: {
      title: 'key',
      subtitle: 'value',
    },
  },
};

export default keyValuePairs;
