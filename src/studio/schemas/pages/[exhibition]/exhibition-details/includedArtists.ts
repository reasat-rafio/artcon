import { toPlainText } from '@portabletext/svelte';
import { FaUserShield } from 'react-icons/fa';
import type {
  DefaultPreviewProps,
  PortableTextBlock,
  SanityDocument,
} from 'sanity';

type ExhibitionDocument = SanityDocument & {
  document: { artists: unknown[]; [key: string]: unknown };
};

const includedArtists = {
  title: 'Artist Statement For This Exhibition',
  name: 'exhibition.includedArtists',
  type: 'object',
  icon: FaUserShield,
  fields: [
    { name: 'placeholder', type: 'boolean', hidden: true, initialValue: true },
    {
      name: 'statement',
      type: 'object',
      hidden: ({ document }: ExhibitionDocument) => {
        return document?.artists?.length > 1;
      },
      fields: [
        { name: 'title', type: 'string' },
        { name: 'statement', type: 'array', of: [{ type: 'block' }] },
      ],
    },
  ],
  preview: {
    select: {
      title: 'statement.statement',
    },
    prepare: ({ title }: DefaultPreviewProps) => ({
      title: title
        ? toPlainText(title as PortableTextBlock[])
        : 'No Statement Yet',
      subtitle: 'Artist Statement For This Exhibition',
    }),
  },
};

export default includedArtists;
