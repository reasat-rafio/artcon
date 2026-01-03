import { FaHighlighter } from 'react-icons/fa';
import type { DefaultPreviewProps } from 'sanity';

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

export default summary;
