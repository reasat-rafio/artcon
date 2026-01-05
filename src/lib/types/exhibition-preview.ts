import type { Asset, Cta, SeoProps } from './common.types';
import type { PortableTextBlock, Slug } from 'sanity';

export interface ExhibitionPreviewProps {
  _id: string;
  _type: string;
  name: string;
  subtitle?: string;
  topTitle?: string;
  startDate: string;
  endDate?: string;
  slug: Slug;
  cta: Cta;
  seo: SeoProps;
  gallery: { name: string; url?: string; location?: string };
  description?: PortableTextBlock[];
  sliderImageVideo: Asset;
  asset: Asset;
  exhibitionType: string | { en: string };
}
