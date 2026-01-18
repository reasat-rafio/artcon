import type { Slug } from 'sanity';
import type {
  Asset,
  CommonImageAsset,
  Cta,
  SeoProps,
  Tag,
} from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface CollectionPageProps {
  seo: SeoProps;
  sections: Section[];
  collections: Collection[];
  tags: Tag[];
}

type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'collection.hero';
  highlightedCollections: HighlightedCollection[];
}

export interface HighlightedCollection {
  name: string;
  slug: Slug;
  subtitle?: string;
  topTitle?: string;
  cta?: Cta;
  asset: Asset;
  artist: { slug: Slug; name: string };
}

export interface Collection {
  _id: string;
  slug: Slug;
  name: string;
  subtitle?: string;
  thumbnail: SanityImageAssetDocument;
  category?: Tag;
  media: string;
  year: string;
  artist: { name: string; slug: Slug };
  tag: Tag;
  displayNew: boolean;
  displaySold: boolean;
  isAvailable: boolean;
  _createdAt: string;
}
