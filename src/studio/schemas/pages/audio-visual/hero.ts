import LockedPreview from '@/studio/components/LockedPreview';
import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'documentaryPage.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  components: { preview: LockedPreview },
  fields: [
    {
      name: 'highlightedDocumentaries',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'documentary' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Highlighted Documentary',
      subtitle: 'Hero',
    }),
  },
};

export default hero;
