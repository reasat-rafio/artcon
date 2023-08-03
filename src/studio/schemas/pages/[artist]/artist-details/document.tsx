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
  groups: [
    {
      title: 'Personal',
      name: 'personal',
    },
    {
      title: 'Site',
      name: 'site',
    },
  ],
  fields: [
    {
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'personal',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'name',
      type: 'object',
      group: 'personal',
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
      group: 'personal',
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
      group: 'personal',
      validation: (Rule: Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: 'email',
      type: 'string',
      group: 'personal',
    },
    {
      name: 'country',
      type: 'string',
      group: 'personal',
      options: {
        list: [...countries],
      },
    },
    {
      title: 'Website/Profile link',
      name: 'profileLink',
      group: 'personal',
      type: 'url',
    },
    {
      name: 'phone',
      group: 'personal',
      type: 'string',
    },
    {
      title: 'NID',
      name: 'nid',
      group: 'personal',
      type: 'string',
    },
    {
      title: 'Passport',
      name: 'passport',
      group: 'personal',
      type: 'string',
    },
    {
      name: 'born',
      type: 'datetime',
      group: 'personal',
    },
    {
      name: 'died',
      type: 'datetime',
      group: 'personal',
    },
    {
      name: 'address',
      type: 'text',
      group: 'personal',
    },
    {
      name: 'shortBio',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'personal',
    },
    {
      name: 'note',
      type: 'array',
      of: [{ type: 'block' }],
      group: 'personal',
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
