import { FcOrganization } from 'react-icons/fc';
import type { DefaultPreviewProps, Rule } from 'sanity';

const aboutUs = {
  name: 'aboutUsPage.aboutUs',
  title: 'About Us',
  icon: FcOrganization,
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    {
      name: 'descriptionBlock',
      type: 'object',
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'description',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'descriptionBlock.title',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'About Us',
    }),
  },
};

export default aboutUs;
