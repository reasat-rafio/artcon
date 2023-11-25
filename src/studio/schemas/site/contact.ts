import type { Type } from '@/lib/types/common.types';
import { toPlainText } from '@portabletext/svelte';
import { AiOutlinePhone } from 'react-icons/ai';
import { BiLogoGmail } from 'react-icons/bi';
import { FaWhatsapp } from 'react-icons/fa';
import { FcContacts } from 'react-icons/fc';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoShareSocial,
} from 'react-icons/io5';
import type { PortableTextBlock, Rule } from 'sanity';

const contact = {
  name: 'site.contact',
  title: 'Contact',
  icon: FcContacts,
  type: 'document',
  fields: [
    {
      name: 'title',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'subtitle',
      type: 'text',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'address',
      type: 'object',
      validation: (Rule: Rule) => Rule.required(),
      fields: [
        {
          name: 'darkIcon',
          description: 'This icon will use in lighter background',
          type: 'image',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'lightIcon',
          description: 'This icon will use in darker background',
          type: 'image',
          validation: (Rule: Rule) => Rule.required(),
          fields: [
            {
              name: 'alt',
              title: 'Alternative Text',
              description: 'Important for SEO and accessibility',
              type: 'string',
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
        },
        {
          name: 'address',
          type: 'array',
          of: [{ type: 'block', lists: [], styles: [] }],
          validation: (Rule: Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'socialsWithVisibleLinks',
      type: 'array',
      of: [
        {
          name: 'socialsWithVisibleLink',
          type: 'object',
          fields: [
            {
              name: 'type',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  'facebook',
                  'instagram',
                  'youtube',
                  'mail',
                  'phone',
                  'whatsapp',
                ],
              },
              validation: (Rule: Rule) => Rule.required(),
            },
            {
              name: 'info',
              type: 'array',
              of: [{ type: 'block', lists: [], styles: [] }],
              validation: (Rule: Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'info',
              type: 'type',
            },
            prepare({
              title,
              type,
            }: {
              type: Type;
              title: PortableTextBlock[];
            }) {
              return {
                title: toPlainText(title),
                media:
                  type === 'facebook'
                    ? IoLogoFacebook
                    : type === 'youtube'
                    ? IoLogoYoutube
                    : type === 'instagram'
                    ? IoLogoInstagram
                    : type === 'mail'
                    ? BiLogoGmail
                    : type === 'whatsapp'
                    ? FaWhatsapp
                    : type === 'phone'
                    ? AiOutlinePhone
                    : IoShareSocial,
              };
            },
          },
        },
      ],
    },

    {
      name: 'socials',
      type: 'array',
      of: [
        {
          name: 'social',
          type: 'social',
        },
      ],
    },
  ],
};

export default contact;
