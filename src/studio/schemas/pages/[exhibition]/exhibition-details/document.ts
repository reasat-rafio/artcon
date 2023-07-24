import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule } from 'sanity';

const exhibition = {
  name: 'exhibition',
  type: 'document',
  icon: FcStackOfPhotos,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibitionTag' }] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'common.hero' },
        { type: 'exhibition.summary' },
        { type: 'common.imageAsset' },
        { type: 'exhibition.featured' },
        { type: 'exhibition.note' },
        { type: 'exhibition.gallery' },
        { type: 'exhibition.newsAndMedia' },
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

export default exhibition;
