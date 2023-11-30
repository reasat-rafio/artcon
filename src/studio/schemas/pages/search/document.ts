import type { DefaultPreviewProps } from 'sanity';

const searchPage = {
  name: 'searchPage',
  title: 'Search Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/search',
    }),
  },
};

export default searchPage;
