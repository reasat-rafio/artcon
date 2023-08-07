import { BsCollection } from 'react-icons/bs';
import type { Rule } from 'sanity';

const collection = {
  name: 'collection',
  type: 'document',
  icon: BsCollection,
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
};

export default collection;
