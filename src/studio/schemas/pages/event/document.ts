import type { DefaultPreviewProps, Rule } from 'sanity';

const eventPage = {
  name: 'eventPage',
  title: 'Event Page',
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
      of: [{ type: 'event.hero' }, { type: 'common.imageAsset' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/event',
    }),
  },
};

export default eventPage;
