import type { DefaultPreviewProps, Rule } from 'sanity';

const documentaryPage = {
  name: 'documentaryPage',
  title: 'Audio Visual',
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
      of: [{ type: 'documentaryPage.hero' }, { type: 'common.imageAsset' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/audio-visual',
    }),
  },
};

export default documentaryPage;
