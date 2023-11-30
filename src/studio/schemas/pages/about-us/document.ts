import type { DefaultPreviewProps, Rule } from 'sanity';

const aboutUsPage = {
  name: 'aboutUsPage',
  title: 'About us Page',
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
      of: [
        { type: 'common.hero' },
        { type: 'aboutUsPage.aboutUs' },
        { type: 'aboutUsPage.teamBanner' },
      ],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/about-us',
    }),
  },
};

export default aboutUsPage;
