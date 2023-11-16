import { FcHome } from 'react-icons/fc';
import type { Rule } from 'sanity';

const hero = {
  name: 'vrPage.hero',
  title: 'Hero',
  icon: FcHome,
  type: 'object',
  fields: [
    {
      name: 'highlightedVr',
      type: 'array',
      validation: (Rule: Rule) => Rule.required(),
      of: [{ type: 'reference', to: [{ type: 'vr' }] }],
    },
  ],
  preview: {
    prepare: () => ({
      title: "Highlighted VR's",
      subtitle: 'Hero',
    }),
  },
};

export default hero;
