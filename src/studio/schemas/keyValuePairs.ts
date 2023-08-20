import { FcInfo } from 'react-icons/fc';
import type { Rule } from 'sanity';

const keyValuePairs = {
  name: 'keyValuePairs',
  type: 'object',
  icon: FcInfo,
  fields: [
    {
      name: 'key',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'value',
      type: 'string',
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
