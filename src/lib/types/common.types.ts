import type { SanityAsset } from '@sanity/image-url/lib/types/types';
import type { PortableTextBlock } from 'sanity';

export interface PageProps<T> {
  site: SiteProps;
  page: T;
}

export interface SiteProps {
  logos: {
    favicon: SanityAsset;
    mobileLogo: SanityAsset;
    ogImage: SanityAsset;
    logo: SanityAsset;
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
  socialsWithVisibleLinks: SocialsWithVisibleLinkProps[];
  socials: SocialProps[];
  address: {
    icon: SanityAsset;
    address: PortableTextBlock;
  };
}

export interface SocialProps {
  _key: string;
  _type: string;
  icon: SanityAsset;
  link: string;
}
export interface SocialsWithVisibleLinkProps {
  _key: string;
  _type: string;
  icon: SanityAsset;
  info: PortableTextBlock;
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
  _type: 'seo';
  title: string;
  description: string;
  ogImage: SanityAsset;
}

export interface Cta {
  _type: 'cta';
  title: string;
  href: string;
}
export interface CommonHeroProps {
  _type: 'common.hero';
  _key: string;
  type?: string;
  title: string;
  subtitle?: string;
  cta?: Cta;
  asset: {
    image?: SanityAsset;
    video?: {
      webm: string;
      mov: string;
    };
  };
}

export interface CommonHeroListProps {
  _type: 'common.heroList';
  _key: string;
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
  _updatedAt: Date;
  _createdAt: Date;
}

export interface Quote {
  author: string;
  _type: string;
  text: string;
  url?: string;
}

export interface VRExhibition {
  image: SanityAsset;
  _type: string;
  url: string;
}

export interface DescriptionBlock {
  description: string;
}
