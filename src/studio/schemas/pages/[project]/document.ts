import type { SanityDocument } from '@sanity/client';
import { FcVideoProjector } from 'react-icons/fc';
import type { Rule } from 'sanity';

const project = {
  name: 'project',
  type: 'document',
  icon: FcVideoProjector,
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
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [
        { type: 'common.hero' },
        { type: 'common.imageAsset' },
        { type: 'project.summary' },
        { type: 'project.gallery' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'seo.title',
      subtitle: 'seo.description',
      media: 'seo.ogImage',
    },
  },
};

export default project;
