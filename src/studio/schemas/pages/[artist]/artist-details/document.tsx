import { sanityClient } from '@/lib/sanity/sanityClient';
import type { SanityDocument } from '@sanity/client';
import groq from 'groq';
import { FcPortraitMode } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps, Reference } from 'sanity';

type PreviewProps = SanityDefaultPreviewProps & {
  name: {
    en: string;
    bn: string;
  };
  email: string;
  phone: string;
};

const checkTheReferenceExistInOtherArtist = async (refs: Reference[]) => {
  const ids = refs.map((ref) => ref._ref);

  const data = await sanityClient.fetch(
    groq`*[_type == "artist" && references("${ids.join('", "')}")]{
      slug
    }`,
  );
  console.log('====================================');
  console.log(data);
  console.log('====================================');
};

const artist = {
  name: 'artist',
  type: 'document',
  icon: FcPortraitMode,
  groups: [
    {
      title: 'Personal Information and Documents',
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
      name: 'tag',
      title: 'Tag',
      type: 'reference',
      to: [{ type: 'artistTag' }],
      group: 'site',
      validation: (Rule: Rule) => Rule.required(),
    },

    {
      name: 'artworks',
      title: "Artist's Artworks",
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      group: 'site',
      validation: (Rule: Rule) =>
        Rule.custom(async (refs: Reference[]) => {
          // const anyOfTheArtworkLinkedToOtherArtist = false;

          checkTheReferenceExistInOtherArtist(refs);

          return true;
        }),
    },

    {
      name: 'publications',
      title: "Artist's Publications",
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'publication' }] }],
      group: 'site',
    },

    {
      title: 'Personal Information and Documents',
      name: 'personalDocuments',
      type: 'personalDocuments',
      group: 'personal',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        collapsible: true,
        collapsed: true,
      },
    },

    {
      title: 'Site Documents',
      name: 'siteDocuments',
      type: 'siteDocuments',
      group: 'site',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        collapsible: true,
      },
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
