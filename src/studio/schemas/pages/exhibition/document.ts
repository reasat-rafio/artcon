import type { DefaultPreviewProps, Rule } from 'sanity';

const exhibitionPage = {
  name: 'exhibitionPage',
  title: 'Exhibition Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [{ type: 'exhibitionPage.hero' }, { type: 'common.imageAsset' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/exhibition',
    }),
  },
};

export default exhibitionPage;
