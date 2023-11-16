import { VscOrganization } from 'react-icons/vsc';
import type { DefaultPreviewProps, Rule } from 'sanity';

const team = {
  name: 'aboutUsPage.teamBanner',
  title: 'Team Banner',
  icon: VscOrganization,
  type: 'object',
  fields: [
    {
      name: 'title',
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
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'Team Banner',
    }),
  },
};

export default team;
