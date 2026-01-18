import createDescriptionBlock from '@/studio/lib/helpers/createDescriptionBlock';
import { toPlainText } from '@portabletext/svelte';
import { LuPaintbrush } from 'react-icons/lu';
import type { DefaultPreviewProps, PortableTextBlock, Rule } from 'sanity';

const artwork = {
  title: 'Artwork',
  name: 'common.artwork',
  icon: LuPaintbrush,
  type: 'object',
  fields: [
    {
      name: 'quote',
      type: 'quote',
    },
    createDescriptionBlock({
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    }),
    {
      name: 'artworks',
      title: 'Artworks',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'artworkItem',
          title: 'Artwork Item',
          fields: [
            {
              name: 'title',
              title: 'Artwork Title',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
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
            prepare: ({ title, media }: { title: PortableTextBlock[]; media: any }) => ({
              title: title ? toPlainText(title) : 'Untitled Artwork',
              subtitle: 'Artwork Item',
              media: media,
            }),
          },
        },
      ],
      description: 'Add artwork images with their descriptions. You can add as many as you want.',
    },
    {
      name: 'artworkLink',
      title: 'All Artworks Button Link',
      type: 'cta',
      description: 'Custom link for the "All Artworks" button. If not provided, defaults to collection page.',
    },
  ],
  preview: {
    select: {
      title: 'descriptionBlock.description',
    },
    prepare: ({ title }: DefaultPreviewProps) => ({
      title: toPlainText(title as PortableTextBlock[]),
      subtitle: 'Artwork',
    }),
  },
};

export default artwork;
