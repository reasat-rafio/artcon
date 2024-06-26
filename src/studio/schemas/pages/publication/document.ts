import type { DefaultPreviewProps, Rule } from 'sanity';

const publicationPage = {
  name: 'publicationPage',
  title: 'Publication Page',
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
      of: [{ type: 'publication.hero' }, { type: 'common.imageAsset' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/publication',
    }),
  },
};

export default publicationPage;
