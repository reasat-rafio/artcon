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
      name: 'startDate',
      type: 'datetime',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'endDate',
      description:
        'If the event is one day long then ignore the end and only fill the start date',
      type: 'datetime',
    },
    {
      name: 'tags',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'exhibitionTag' }] }],
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'artists',
      title: 'Artist in this ehibition',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'artist' }] }],
      validation: (Rule: Rule) => Rule.unique(),
    },
    {
      name: 'publication',
      title: 'Publication',
      type: 'reference',
      to: [{ type: 'publication' }],
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'common.hero' },
        { type: 'exhibition.summary' },
        { type: 'common.imageAsset' },
        { type: 'exhibition.includedArtists' },
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
