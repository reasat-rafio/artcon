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
      validation: (Rule: Rule) =>
        Rule.custom(
          (sections: { _type: string; [_key: string]: unknown }[]) => {
            const summaryCount = sections.filter(
              (section) => section._type === 'artist.summary',
            ).length;
            if (summaryCount < 1) {
              return 'Artist summary is required".';
            }
            return true;
          },
        ),
      of: [
        { type: 'common.hero' },
        { type: 'common.imageAsset' },
        { type: 'artist.summary' },
        { type: 'common.artwork' },
        { type: 'artist.exhibitions' },
        { type: 'artist.publication' },
      ],
    },
  ],
};

export default siteDocuments;
