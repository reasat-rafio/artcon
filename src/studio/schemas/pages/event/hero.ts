import LockedPreview from '@/studio/components/LockedPreview';
import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'event.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  components: { preview: LockedPreview },
  fields: [
    {
      name: 'highlightedEvents',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Highlighted Events',
      subtitle: 'Hero',
    }),
  },
};

export default hero;
