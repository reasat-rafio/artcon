import type { Asset, Cta, SeoProps, Tag } from './common.types';
import type { PortableTextBlock, Slug } from 'sanity';

export interface EventPreviewProps {
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
  gallery: { name: string };
  description?: PortableTextBlock[];
  sliderImageVideo: Asset;
  asset: Asset;
  tag: Tag;
}
