import type { Asset, Cta, SeoProps } from './common.types';
import type { PortableTextBlock } from 'sanity';
import type { SanityImageAssetDocument } from '@sanity/client';

export interface ExhibitionPreviewProps {
  _id: string;
  _type: string;
  name: string;
  type?: string;
  status?: string;
  startDate: string;
  endDate?: string;
  cta: Cta;
  seo: SeoProps;
  gallery: { name: string };
  description: PortableTextBlock[];
  previewDisplayImage: SanityImageAssetDocument;
  asset: Asset;
  exhibitionType: string | { en: string };
}
