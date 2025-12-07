import { sanityClient } from '@/lib/sanity/sanityClient';
import { removeDraftsPrefix } from '@/studio/helper';
import type { SanityDocument } from '@sanity/client';
import groq from 'groq';
import { FcPortraitMode } from 'react-icons/fc';
import {
  type Rule,
  type SanityDefaultPreviewProps,
  type Reference,
  defineField,
  type ArrayRule,
} from 'sanity';

type PreviewProps = SanityDefaultPreviewProps & {
  name: {
    en: string;
    bn: string;
  };
  email: string;
  phone: string;
};

const referenceExistInOtherArtist = async (
  refs: Reference[],
  docId: string,
) => {
  const ids = refs?.map((ref) => ref._ref) ?? [];
  if (ids?.length) {
    const data: { name: string }[] = await sanityClient.fetch(
      groq`*[_type == "artist"
        && _id != "${docId}" && references("${ids.join('", "')}")]{
          "name": personalDocuments.name.en
        }`,
    );

    return data?.length
      ? `One of the artworks is linked in the artist name ${data.map(
          ({ name }) => `${name}'s, `,
        )}`
      : true;
  } else return true;
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

    defineField({
      name: 'artworks',
      title: "Artist's Artworks",
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'collection' }] }],
      group: 'site',
      validation: (Rule: ArrayRule<unknown[]>) =>
        Rule.custom((refs, { document }) => {
          const docId = removeDraftsPrefix(document?._id as string);
          return referenceExistInOtherArtist(refs as Reference[], docId);
        }),
    }),

    {
      name: 'customArtworks',
      title: 'Custom Artworks',
      description: 'Upload custom artwork images with descriptions for this artist',
      type: 'array',
      group: 'site',
      of: [
        {
          type: 'object',
          name: 'artworkItem',
          title: 'Artwork Item',
          fields: [
            {
              name: 'image',
              title: 'Artwork Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'array',
              of: [
                {
                  type: 'block',
                  styles: [
                    { title: 'Normal', value: 'normal' },
                    { title: 'H1', value: 'h1' },
                    { title: 'H2', value: 'h2' },
                    { title: 'H3', value: 'h3' },
                    { title: 'H4', value: 'h4' },
                    { title: 'H5', value: 'h5' },
                    { title: 'H6', value: 'h6' },
                    { title: 'Quote', value: 'blockquote' },
                  ],
                  lists: [
                    { title: 'Bullet', value: 'bullet' },
                    { title: 'Numbered', value: 'number' },
                  ],
                  marks: {
                    decorators: [
                      { title: 'Strong', value: 'strong' },
                      { title: 'Emphasis', value: 'em' },
                      { title: 'Code', value: 'code' },
                      { title: 'Underline', value: 'underline' },
                      { title: 'Strike', value: 'strike-through' },
                    ],
                    annotations: [
                      {
                        name: 'link',
                        type: 'object',
                        title: 'Link',
                        fields: [
                          {
                            name: 'href',
                            type: 'string',
                            title: 'URL',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
              description: 'The description will be displayed exactly as you write it, preserving formatting.',
            },
          ],
          preview: {
            select: {
              title: 'description',
              media: 'image',
            },
          },
        },
      ],
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
