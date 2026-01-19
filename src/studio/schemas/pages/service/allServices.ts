import type { DefaultPreviewProps, Rule } from 'sanity';
import { FcServices } from 'react-icons/fc';

const summary = {
  name: 'allServices.summary',
  title: 'Summary',
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
      title: 'Quotation',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      description: 'Description text for services',
    },
    {
      name: 'media',
      title: 'VR / Video / Image',
      type: 'asset',
      description: 'VR, Video, or Image for the services summary',
    },
  ],
};

const serviceItem = {
  name: 'allServices.serviceItem',
  title: 'Service Item',
  type: 'object',
  icon: FcServices,
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title (Left Side)',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'button',
      type: 'cta',
      title: 'Button (Left Side)',
      description: 'Button displayed below title on left side. Button label defaults to "Get Service" if not specified. If no URL is provided, the button will show a popup form on the service page.',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image (Right Side)',
      description: 'Image displayed on right side',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
        },
      ],
    },
    {
      name: 'summary',
      type: 'quote',
      title: 'Summary (Below Image on Right)',
      description: 'Summary text displayed below image on right side',
    },
    {
      name: 'contentMedia',
      type: 'asset',
      title: 'Content Image / Video (Full Width)',
      description: 'Image or Video displayed full width below the left & right sections',
      validation: (Rule: Rule) => Rule.optional(),
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare: (props: DefaultPreviewProps) => ({
      title: props.title || 'Service Item',
      subtitle: 'Service',
    }),
  },
};

const allServices = {
  name: 'allServices',
  title: 'All Services',
  type: 'document',
  icon: FcServices,
  fields: [
    {
      name: 'summary',
      title: 'Summary',
      type: 'allServices.summary',
    },
    {
      name: 'sections',
      title: 'Services & Dividers',
      type: 'array',
      of: [
        { type: 'allServices.serviceItem' },
        { type: 'common.imageAsset' }
      ],
      description: 'Add services and image dividers. Image dividers can be added before services.',
    },
  ],
  preview: {
    select: {
      title: 'summary.title',
      quote: 'summary.quote.text',
    },
    prepare: (props: DefaultPreviewProps) => ({
      title: props.title || 'All Services',
      subtitle: 'Services Overview',
    }),
  },
};

export default [allServices, summary, serviceItem];
