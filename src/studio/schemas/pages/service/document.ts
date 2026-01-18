import type { DefaultPreviewProps, Rule } from 'sanity';
import { FaHighlighter } from 'react-icons/fa';
import allServices from './allServices';

const summary = {
  name: 'servicePage.summary',
  title: 'Summary',
  type: 'object',
  icon: FaHighlighter,
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    {
      name: 'description',
      title: 'Description / Paragraph',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      description: 'Optional description text to appear below the quote',
    },
    {
      name: 'vr',
      title: "Service's VR",
      type: 'reference',
      to: [{ type: 'vr' }],
    },
  ],
  preview: {
    select: {
      title: 'quote.text',
    },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: 'Summary',
    }),
  },
};

const servicePage = {
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    },
    {
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule: Rule) => Rule.required().min(1),
      of: [{ type: 'common.hero' }],
    },
  ],
  preview: {
    select: { title: 'seo.title' },
    prepare: (props: DefaultPreviewProps) => ({
      ...props,
      subtitle: '/services',
    }),
  },
};

export default [...allServices, servicePage, summary];
