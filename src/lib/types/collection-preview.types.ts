import type { Slug } from 'sanity';
import type { Cta, SeoProps } from './common.types';
import type { Information, Provenance } from './collection-detail.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface CollectionPreviewProps {
  _id: string;
  _type: string;
  name: string;
  subtitle?: string;
  topTitle?: string;
  slug: Slug;
  cta: Cta;
  hideInquiryButton?: boolean;
  isAvailable: boolean;
  seo: SeoProps;
  information: Information;
  provenance: Provenance;
  artworkImages: SanityImageAssetDocument[];
  artist?: {
    name: string;
    born: string;
    country: string;
  };
}
