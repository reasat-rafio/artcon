import type { SanityDocument } from '@sanity/client';
import { FcPortraitMode } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';

interface PreviewProps extends SanityDefaultPreviewProps {
  name: {
    en: string;
    bn: string;
  };
  email: string;
  phone: string;
}

const artist = {
  name: 'artist',
  type: 'document',
  icon: FcPortraitMode,
  groups: [
    {
      title: 'Personal Documents',
      name: 'personal',
    },
    {
      title: 'Site Documents',
      name: 'site',
    },
  ],
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'site',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      options: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        source: (_: SanityDocument, context: any) =>
          context.parent.personalDocuments.name.en,
      },
      group: 'site',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Personal Documents',
      name: 'personalDocuments',
      type: 'personalDocuments',
      group: 'personal',
      validation: (Rule: Rule) => Rule.required(),
    },

    // {
    //   name: 'exhibitions',
    //   title: "Artist's Exhibitions",
    //   type: 'array',
    //   of: [{ type: 'reference', to: { type: 'exhibition' } }],
    //   group: 'site',
    // },
    {
      name: 'artworks',
      title: "Artist's Artworks",
      type: 'array',
      of: [{ type: 'reference', to: { type: 'collection' } }],
      group: 'site',
    },
    {
      title: 'Site Documents',
      name: 'siteDocuments',
      type: 'siteDocuments',
      group: 'site',
      validation: (Rule: Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      media: 'personalDocuments.artistPortrait',
      name: 'personalDocuments.name',
      email: 'personalDocuments.email',
      phone: 'personalDocuments.phone',
    },
    prepare: ({ media, name, email, phone }: PreviewProps) => ({
      title: `${name.en} | ${name.bn}`,
      subtitle: `${phone} | ${email}`,
      media,
    }),
  },
};

export default artist;
