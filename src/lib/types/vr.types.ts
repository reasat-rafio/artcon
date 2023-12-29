import type { Slug } from 'sanity';
import type { CommonImageAsset, SeoProps, Tag } from './common.types';
import type { SanityImageAssetDocument } from '@sanity/client';
import type { SanityAsset } from '@sanity/image-url/lib/types/types';

export interface VrPageProps {
  seo: SeoProps;
  sections: Section[];
  vrs: Vr[];
  tags: Tag[];
}

type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'vrPage.hero';
  highlightedVr: HighlightedVr[];
}

export interface HighlightedVr {
  name: string;
  subtitle: string;
  slug: Slug;
  category: Tag;
  coverImage: SanityImageAssetDocument;
}

export interface Vr {
  _id: string;
  name: string;
  slug: Slug;
  gallery: Gallery;
  category: Tag;
  url: string;
  thumbnail: SanityAsset;
}

export interface Gallery {
  name: string;
}
