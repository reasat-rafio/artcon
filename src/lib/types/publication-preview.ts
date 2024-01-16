import type { PortableTextBlock, Slug } from 'sanity';
import type { Asset, Cta, Quote } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface PublicationPreviewProps {
  _type: string;
  description: PortableTextBlock[];
  _createdAt: Date;
  quote?: Quote;
  subtitle: string;
  prices: Prices;
  slug: Slug;
  gallery: null;
  stock: string;
  associationsList: AssociationsList[];
  _rev: string;
  sliderImageVideo: Asset;
  isbn: string;
  _id: string;
  exproleLink: Cta;
  publishedBy: string[];
  category: Category;
  _updatedAt: Date;
  publicationImage: SanityImageAssetDocument;
  name: string;
}

export interface Category {
  _createdAt: string;
  _rev: string;
  _type: string;
  name: string;
  _id: string;
  _updatedAt: string;
}

export interface Prices {
  discountPriceBDT: number;
  priceBDT: number;
  priceUSD: number;
}

export interface AssociationsList {
  _type: string;
  _key: string;
  value: string;
  key: string;
}
