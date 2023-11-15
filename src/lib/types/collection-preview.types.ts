import type { Slug } from 'sanity';
import type { Asset, Cta, SeoProps } from './common.types';
import type { Information, Provenance } from './collection-detail.types';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface CollectionPreviewProps {
  _id: string;
  _type: string;
  name: string;
  type?: string;
  status?: string;
  slug: Slug;
  cta: Cta;
  inquiryButton: Cta;
  isAvailable: boolean;
  seo: SeoProps;
  sliderImageVideo: Asset;
  information: Information;
  provenance: Provenance;
  artworkImages: SanityImageAssetDocument[];
  artist: {
    name: string;
    born: string;
    country: string;
  };
}
