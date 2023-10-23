import type { Slug } from 'sanity';
import type { CommonImageAsset, SeoProps, Tag } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface PublicationPageProps {
  seo: SeoProps;
  sections: Section[];
  publications: Publication[];
  categories: Tag[];
}

type Section = HeroProps | CommonImageAsset;

export interface Publication {
  _id: string;
  name: string;
  slug: Slug;
  publicationImage: SanityImageAssetDocument;
  category: Tag;
  prices: {
    priceBDT: number;
    discountPriceBDT?: number;
    priceUSD: number;
  };
}

export interface HeroProps {
  _type: 'publication.hero';
  highlightedPublication: HighlightedPublication[];
}

export interface HighlightedPublication {
  name: string;
  subtitle: string;
  slug: Slug;
  category: Tag;
  coverImage: SanityImageAssetDocument;
}
