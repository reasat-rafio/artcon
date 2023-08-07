import type { Rule } from 'sanity';

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
      of: [{ type: 'block' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
};

export default termsConditions;
