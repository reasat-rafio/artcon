import type { Slug } from 'sanity';
import type { CommonImageAsset, SeoProps, Tag } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface DocumentaryPageProps {
  seo: SeoProps;
  sections: Section[];
  documentaries: Documentary[];
  categories: Tag[];
}
type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'documentaryPage.hero';
  highlightedDocumentaries: HighlightedDocumentary[];
}

export interface Documentary {
  _id: string;
  slug: Slug;
  name: string;
  category: Tag;
  coverImage: SanityImageAssetDocument;
  year?: string;
}

export interface HighlightedDocumentary {
  name: string;
  slug: Slug;
  category: Tag;
  coverImage: SanityImageAssetDocument;
  year?: string;
}
