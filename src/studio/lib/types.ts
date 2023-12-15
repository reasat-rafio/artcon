import type { SeoProps } from '@/lib/types/common.types';
import type { SanityDocument } from '@sanity/client';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock } from 'sanity';

export interface ArtistDocument extends SanityDocument {
  seo: SeoProps;
  name:
    | {
        en: string;
        bn: string;
      }
    | string;
  email: string;
  gender: 'male' | 'female' | 'other';
  artistPortrait: SanityAsset | string;
  country: string;
  phone: string;
  nid: string;
  profileLink: string;
  passport: string;
  born: string;
  address: string;
  died: string;
  shortBio: PortableTextBlock[] | string;
  note: PortableTextBlock[] | string;
}

export interface IArtist {
  name: {
    en: string;
    bn: string;
  };
  country: string;
  email?: string;
  phone: string;
  born: string;
}
