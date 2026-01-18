import { orderRankField } from '@sanity/orderable-document-list';
import { PiUsersThreeLight } from 'react-icons/pi';
import type { DefaultPreviewProps, Rule } from 'sanity';

const team = {
  name: 'exhibition.team',
  title: 'Group Exhibition Members',
  icon: PiUsersThreeLight,
  type: 'object',
  fields: [
    orderRankField({ type: 'exhibition.team' }),
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      description: 'Section title (e.g., "Other team members")',
    },
    {
      name: 'members',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
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
              name: 'image',
              type: 'image',
              validation: (Rule: Rule) => Rule.required(),
              options: {
                hotspot: true,
              },
            },
          ],
          preview: {
            select: {
              name: 'name',
              role: 'role',
              media: 'image',
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare: ({ name, role, media }: any) => ({
              title: name,
              subtitle: role,
              media,
            }),
          },
        },
      ],
      validation: (Rule: Rule) => Rule.required().min(1),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'Team Members Section',
    }),
  },
};

export default team;
