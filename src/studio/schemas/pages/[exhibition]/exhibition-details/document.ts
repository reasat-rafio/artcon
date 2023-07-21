import { FcStackOfPhotos } from 'react-icons/fc';
import type { Rule } from 'sanity';

const exhibition = {
  name: 'exhibition',
  type: 'document',
  icon: FcStackOfPhotos,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default exhibition;
