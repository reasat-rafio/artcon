import { orderRankField } from '@sanity/orderable-document-list';
import { PiUsersThreeLight } from 'react-icons/pi';
import type { Rule } from 'sanity';

const team = {
  name: 'team',
  type: 'document',
  icon: PiUsersThreeLight,
  fields: [
    orderRankField({ type: 'team' }),
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'role',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Core', value: 'core' },
          { title: 'Extra', value: 'extra' },
        ],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'url', type: 'url' },
    {
      name: 'image',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      name: 'name',
      type: 'type',
      role: 'role',
      media: 'image',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ name, role, type, media }: any) => ({
      title: name,
      subtitle: `${type} | ${role}`,
      media,
    }),
  },
};

export default team;
