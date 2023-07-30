import { FcPortraitMode } from 'react-icons/fc';
import type { Rule, SanityDefaultPreviewProps } from 'sanity';
import countries from '@/lib/countries';

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
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          title: 'English',
          name: 'en',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
        {
          title: 'Bangla',
          name: 'bn',
          type: 'string',
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'gender',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Male', value: 'male' },
          { title: 'Female', value: 'female' },
          { title: 'Other', value: 'other' },
        ],
      },
    },
    {
      name: 'artistPortrait',
      type: 'image',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'email',
      type: 'string',
    },
    {
      name: 'country',
      type: 'string',
      options: {
        list: [...countries],
      },
    },
    {
      title: 'Website/Profile link',
      name: 'profileLink',
      type: 'url',
    },
    {
      name: 'phone',
      type: 'string',
    },
    {
      title: 'NID',
      name: 'nid',
      type: 'string',
    },
    {
      title: 'Passport',
      name: 'passport',
      type: 'string',
    },
    {
      name: 'born',
      type: 'datetime',
    },
    {
      name: 'died',
      type: 'datetime',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'shortBio',
      type: 'array',
      of: [{ type: 'block' }],
    },
    {
      name: 'note',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      media: 'artistPortrait',
      name: 'name',
      email: 'email',
      phone: 'phone',
    },
    prepare: ({ media, name, email, phone }: PreviewProps) => ({
      title: `${name.en} | ${name.bn}`,
      subtitle: `${phone} | ${email}`,
      media,
    }),
  },
};

export default artist;
