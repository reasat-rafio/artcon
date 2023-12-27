import { FaRegStar } from 'react-icons/fa';
import type { Rule } from 'sanity';

const logos = {
  name: 'site.logos',
  title: 'Logos',
  type: 'document',
  icon: FaRegStar,
  fields: [
    {
      name: 'logoLight',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      description:
        'Upload the version of the logo intended for display on dark backgrounds.',
    },
    {
      name: 'logoDark',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      description:
        'Upload the version of the logo optimized for display on light backgrounds.',
    },

    {
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'ogImage',
      title: 'Default SEO Image',
      type: 'image',
      options: {
        accept: 'image/png, image/jpeg, image/webp',
      },
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Logos',
    }),
  },
};

export default logos;
