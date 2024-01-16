import type { DefaultPreviewProps, Rule } from 'sanity';

const termsConditions = {
  name: 'termsConditionsPage',
  title: 'Terms And Conditions',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'termsConditions',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [],
          styles: [],
        },
      ],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/terms-and-conditions',
    }),
  },
};

export default termsConditions;
