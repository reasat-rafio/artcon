import LockedPreview from '@/studio/components/LockedPreview';
import SliderPreview from '@/studio/components/SliderPreview';
import { MdOutlineCollections } from 'react-icons/md';
import type { Rule } from 'sanity';

const collection = {
  title: 'Slider',
  name: 'landing.collections',
  type: 'object',
  icon: MdOutlineCollections,
  components: { preview: LockedPreview },
  fields: [
    {
      name: 'collections',
      title: 'Slider',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().unique().min(3),
      of: [
        {
          name: 'collection',
          type: 'reference',
          to: [
            { type: 'vr', components: { preview: SliderPreview } },
            { type: 'exhibition', components: { preview: SliderPreview } },
            { type: 'publication', components: { preview: SliderPreview } },
            { type: 'collection', components: { preview: SliderPreview } },
            { type: 'event', components: { preview: SliderPreview } },
            { type: 'documentary', components: { preview: SliderPreview } },
          ],
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Slider Documents ',
      subtitle: 'Slider',
    }),
  },
};

export default collection;
