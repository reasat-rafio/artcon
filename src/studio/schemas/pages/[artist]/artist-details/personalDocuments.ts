import type { Rule } from 'sanity';
import countries from '@/lib/countries';

const personalDocuments = {
  title: 'Personal Documents',
  name: 'personalDocuments',
  type: 'object',
  fields: [
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
          // validation: (Rule: Rule) => Rule.required(),
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
      validation: (Rule: Rule) => Rule.required(),
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
      type: 'date',
      validation: (Rule: Rule) => Rule.required(),
      placeholder: 'yy/ mm/ dd',
    },
    {
      name: 'died',
      type: 'date',
      placeholder: 'yy/ mm/ dd',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      title: 'Short Bio',
      name: 'shortBio',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      title: 'Social Links',
      name: 'socials',
      type: 'array',
      of: [{ type: 'social' }],
      // validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'note',
      type: 'array',
      of: [{ type: 'block', lists: [], styles: [] }],
    },
  ],
};

export default personalDocuments;
