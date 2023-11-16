import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { toPlainText } from '@portabletext/svelte';
import { LuPaintbrush } from 'react-icons/lu';
import type { DefaultPreviewProps, PortableTextBlock, Rule } from 'sanity';

const artwork = {
  title: 'Artwork',
  name: 'common.artwork',
  icon: LuPaintbrush,
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    createDescriptionBlock({
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          title: 'Button',
          name: 'cta',
          type: 'cta',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'descriptionBlock.description',
    },
    prepare: ({ title }: DefaultPreviewProps) => ({
      title: toPlainText(title as PortableTextBlock[]),
      subtitle: 'Artwork',
    }),
  },
};

export default artwork;
