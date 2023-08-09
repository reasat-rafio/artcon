import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { FaHighlighter } from 'react-icons/fa';
import type { Rule } from 'sanity';

const summary = {
  name: 'project.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },

    createDescriptionBlock({
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
    {
      name: 'vrExhibition',
      title: 'VR Exhibition',
      type: 'reference',
      to: [{ type: 'vrExhibition' }],
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'descriptionBlock.name',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default summary;
