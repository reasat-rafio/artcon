import type { DefaultPreviewProps, Rule } from 'sanity';

const privacyPolicy = {
  name: 'privacyPolicyPage',
  title: 'Privacy Policy',
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
      name: 'privacyPolicy',
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
    {
      title: 'Button',
      name: 'cta',
      type: 'cta',
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/privacy-policy',
    }),
  },
};

export default privacyPolicy;
