import type { Type } from '@/lib/types/common.types';
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoYoutube,
  IoShareSocial,
} from 'react-icons/io5';
import { BiLogoGmail } from 'react-icons/bi';
import { AiOutlinePhone } from 'react-icons/ai';
import type { DefaultPreviewProps, Rule } from 'sanity';
import { FaWhatsapp } from 'react-icons/fa';

const social = {
  name: 'social',
  type: 'object',
  icon: IoShareSocial,
  fields: [
    {
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: ['facebook', 'instagram', 'youtube', 'mail', 'phone', 'whatsapp'],
      },
      validation: (Rule: Rule) => Rule.required(),
    },
    { name: 'link', type: 'url', validation: (Rule: Rule) => Rule.required() },
  ],
  preview: {
    select: {
      title: 'link',
      media: 'icon',
      type: 'type',
    },
    prepare({ title, subtitle, type }: DefaultPreviewProps & { type: Type }) {
      return {
        title,
        subtitle,
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
};

export default social;
