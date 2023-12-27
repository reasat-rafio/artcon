import type { SanityImageAssetDocument } from '@sanity/client';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock, Slug } from 'sanity';
import type { Information } from './collection-detail.types';

export interface PageProps<T> {
  site: SiteProps;
  page: T;
}

export interface SiteProps {
  logos: {
    favicon: SanityAsset;
    ogImage: SanityAsset;
    logoDark: SanityAsset;
    logoLight: SanityAsset;
  };
  nav: NavProps;
  contact: ContactProps;
  footer: FooterProps;
}

export interface FooterProps {
  _rev: string;
  _type: string;
  _id: string;
  _updatedAt: Date;
  _createdAt: Date;
  menu: Menu[];
  title: string;
}

export interface ContactProps {
  _rev: string;
  _type: string;
  _id: string;
  _updatedAt: Date;
  _createdAt: Date;
  title: string;
  subtitle: string;
  socialsWithVisibleLinks: SocialsWithVisibleLinkProps[];
  socials: SocialProps[];
  address: {
    darkIcon: SanityAsset;
    lightIcon: SanityAsset;
    address: PortableTextBlock[];
  };
}

export type Type =
  | 'facebook'
  | 'instagram'
  | 'youtube'
  | 'mail'
  | 'whatsapp'
  | 'phone';

export interface SocialProps {
  _key: string;
  _type: string;
  type: Type;
  link: string;
}
export interface SocialsWithVisibleLinkProps {
  _key: string;
  _type: string;
  type: Type;
  info: PortableTextBlock[];
}

export interface NavProps {
  _rev: string;
  _type: string;
  _id: string;
  menu: Menu[];
  _updatedAt: Date;
  _createdAt: Date;
}

export interface Menu {
  _key: string;
  _type: string;
  title: string;
  pageUrl?: string;
  externalUrl?: string;
}

export interface SeoProps {
  _type: string;
  title: string;
  description: string;
  ogImage: SanityAsset;
}

export interface Cta {
  _type?: 'cta';
  title: string;
  href: string;
}
export interface CommonHeroProps {
  _type: 'common.hero';
  _key: string;
  subtitle?: string;
  title: string;
  topTitle?: string;
  cta?: Cta;
  asset: Asset;
}

export interface Asset {
  image?: SanityAsset;
  video?: {
    webm: string;
    mov: string;
  };
}

export interface CommonHeroListProps {
  blocks: CommonHeroProps[];
}

export interface CommonImageAsset {
  _type: 'common.imageAsset';
  _key: string;
  image: SanityAsset;
}

export interface Tag {
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  slug: Slug;
  _updatedAt: Date;
  _createdAt: Date;
}

export interface Quote {
  author?: string;
  _type: 'quote';
  text: string;
  url?: string;
}

export interface VR {
  _type: 'vr';
  caption: string;
  url: string;
}

export interface DescriptionBlock {
  description: PortableTextBlock[];
}

export interface CommonNoteProps {
  _type: 'common.note';
  _key: string;
  notes: Note[];
}

export interface Note {
  quote?: Quote;
  _type: string;
  _key: string;
  descriptionBlock: DescriptionBlock & { title: string; subtitle: string };
}

export interface EbookProps {
  _createdAt: Date;
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: Date;
  url: string;
  image: SanityAsset;
}

export interface CommonArtworkSectionProps {
  _key: string;
  _type: 'common.artwork';
  descriptionBlock: DescriptionBlock & {
    title: string;
    cta: Cta;
  };
  quote?: Quote;
}

export interface ShortArtworks {
  artwork: SanityImageAssetDocument;
  information: Information;
}
[];

export interface CommonOtherExhibitionProps {
  asset: Asset;
  name: string;
  tag: { name: string };
  slug: Slug;
  startDate: string;
  endDate?: string;
  subtitle?: string;
  type?: string | { name: string };
}

export interface Association {
  key: string;
  value: string;
}

export interface Youtube {
  _type: 'youtube';
  url: string;
  caption?: string;
  thumbnail?: SanityImageAssetDocument;
}
