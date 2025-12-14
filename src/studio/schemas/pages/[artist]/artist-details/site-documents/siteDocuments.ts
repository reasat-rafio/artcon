import type { Rule } from 'sanity';

const siteDocuments = {
  name: 'siteDocuments',
  title: 'Site Documents',
  type: 'object',
  fields: [
    {
      name: 'asset',
      title: 'Hero Image / Video',
      type: 'asset',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
      description:
        'If the artist is featured on the artist listing page, the provided image will serve as the thumbnail in the hero slider. In the event that no image is provided, the hero image or video within the document will be used.',
    },
    {
      name: 'topTitle',
      title: 'Top Title',
      type: 'string',
      description:
        'This will overwrite the status derived from the provided start and end dates.',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      title: 'Button ',
      name: 'cta',
      type: 'cta',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) =>
        Rule.custom(
          (sections: { _type: string; [_key: string]: unknown }[]) => {
            const summaryCount = sections?.filter(
              (section) => section._type === 'artist.summary',
            ).length;
            if (summaryCount < 1) {
              return 'Artist summary is required".';
            }
            return true;
          },
        ),
      of: [
        { type: 'artist.summary' },
        { type: 'common.imageAsset' },
        { type: 'common.artwork' },
        { type: 'artist.video' },
        { type: 'artist.exhibitions' },
        { type: 'artist.publication' },
      ],
    },
  ],
};

export default siteDocuments;
