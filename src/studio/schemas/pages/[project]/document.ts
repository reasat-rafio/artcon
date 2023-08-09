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
      name: 'organisedBy',
      type: 'string',
    },
    {
      name: 'supportedBy',
      type: 'string',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
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
