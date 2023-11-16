import LockedPreview from '@/studio/components/LockedPreview';
import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'exhibitionPage.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  components: { preview: LockedPreview },
  fields: [
    {
      name: 'highlightedExhibition',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'exhibition' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Highlighted Exhibitions',
      subtitle: 'Hero',
    }),
  },
};

export default hero;
