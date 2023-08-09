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
      of: [
        { type: 'common.hero' },
        { type: 'aboutUsPage.aboutUs' },
        { type: 'aboutUsPage.teamBanner' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
    },
  },
};

export default aboutUsPage;
