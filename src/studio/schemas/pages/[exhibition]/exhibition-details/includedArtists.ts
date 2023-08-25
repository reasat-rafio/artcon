import { FaUserShield } from 'react-icons/fa';
import type { SanityDocument } from 'sanity';

type ExhibitionDocument = SanityDocument & {
  document: { artists: unknown[]; [key: string]: unknown };
};

const includedArtists = {
  title: 'Exhibition Artist"s Section',
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
    prepare: () => ({
      title: 'Exhibition Artist"s Section',
    }),
  },
};

export default includedArtists;
