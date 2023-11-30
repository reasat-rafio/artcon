import type { DefaultPreviewProps, Rule } from 'sanity';

const projectPage = {
  name: 'projectPage',
  title: 'Project Page',
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
      of: [{ type: 'projectPage.hero' }, { type: 'common.imageAsset' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/project',
    }),
  },
};

export default projectPage;
