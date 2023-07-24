import { FcPortraitMode } from 'react-icons/fc';
import type { Rule } from 'sanity';

const artist = {
  name: 'artist',
  type: 'document',
  icon: FcPortraitMode,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default artist;
