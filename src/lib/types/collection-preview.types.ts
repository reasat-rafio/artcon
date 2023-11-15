import type Cta from '@/components/ui/Cta.svelte';
import type { Slug } from 'sanity';
import type { Asset, SeoProps } from './common.types';
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
  seo: SeoProps;
  sliderImageVideo: Asset;
  information: Information;
  provenance: Provenance;
  artworkImages: SanityImageAssetDocument[];
}
