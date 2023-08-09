import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule, SanityDocument } from 'sanity';

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
      name: 'slug',
      type: 'slug',
      options: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source: (_: SanityDocument, context: any) =>
          context?.parent?.sections[0]?.title,
      },
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
        { type: 'exhibition.promotion' },
        { type: 'exhibition.artwork' },
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
