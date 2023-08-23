import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { LuPaintbrush } from 'react-icons/lu';
import type { Rule } from 'sanity';

const artwork = {
  title: 'artwork',
  name: 'artist.artwork',
  icon: LuPaintbrush,
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
      validation: (Rule: Rule) => Rule.required(),
    },

    createDescriptionBlock({
      fields: [
        {
          name: 'title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          name: 'cta',
          type: 'cta',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'descriptionBlock.title',
      subtitle: 'descriptionBlock.description',
    },
  },
};

export default artwork;
