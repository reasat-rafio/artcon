import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface PageProps<T> {
  site: SiteDataProps;
  page: T;
}

export interface SiteDataProps {
  logos: {
    favicon: SanityAsset;
    mobileLogo: SanityAsset;
    ogImage: SanityAsset;
    logo: SanityAsset;
  };
  nav: Nav;
}

export interface Nav {
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
