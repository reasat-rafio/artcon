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
  status?: string;
  type?: string;
  cta?: Cta;
  asset: Asset;
  artist: { name: string };
}

export interface Collection {
  _id: string;
  slug: Slug;
  name: string;
  artworkImage: SanityImageAssetDocument;
  media: string;
  year: string;
  artist: { name: string };
  tag: Tag;
}
