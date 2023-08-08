import { orderRankField } from '@sanity/orderable-document-list';
import { PiUsersThreeLight } from 'react-icons/pi';

const team = {
  name: 'team',
  type: 'document',
  icon: PiUsersThreeLight,
  fields: [
    orderRankField({ type: 'category' }),
    { name: 'name', type: 'string' },
    { name: 'role', type: 'string' },
    {
      name: 'type',
      type: 'string',
      options: {
        list: [
          { title: 'Core', value: 'core' },
          { title: 'Extra', value: 'extra' },
        ],
      },
    },
    { name: 'description', type: 'text' },
    { name: 'image', type: 'image' },
  ],
  preview: {
    select: {
      name: 'name',
      type: 'role',
      role: 'role',
      media: 'image',
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare: ({ name, role, type, media }: any) => ({
      title: name,
      subtitle: `${role} | ${type}`,
      media,
    }),
  },
};

export default team;
