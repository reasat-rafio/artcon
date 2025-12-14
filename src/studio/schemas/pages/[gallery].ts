import { FcGallery } from 'react-icons/fc';
import type { Rule } from 'sanity';

const gallery = {
  name: 'gallery',
  type: 'document',
  icon: FcGallery,
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: 'Link to the gallery location (e.g., Google Maps)',
    },
    {
      name: 'getServiceButton',
      title: 'Get Service Button',
      type: 'cta',
      description: 'Button to link to services page',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'location',
    },
  },
};

export default gallery;
