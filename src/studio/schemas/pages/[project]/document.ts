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
  ],
};

export default project;
