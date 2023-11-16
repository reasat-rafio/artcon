import LockedPreview from '@/studio/components/LockedPreview';
import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'projectPage.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  components: { preview: LockedPreview },
  fields: [
    {
      name: 'highlightedProjects',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Highlighted Projects',
      subtitle: 'Hero',
    }),
  },
};

export default hero;
