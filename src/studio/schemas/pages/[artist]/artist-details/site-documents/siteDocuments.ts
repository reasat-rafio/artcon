import type { Rule } from 'sanity';

const siteDocuments = {
  name: 'siteDocuments',
  title: 'Site Documents',
  type: 'object',
  fields: [
    {
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        { type: 'common.hero' },
        { type: 'common.imageAsset' },
        { type: 'artist.summary' },
      ],
    },
  ],
};

export default siteDocuments;
