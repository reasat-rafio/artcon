import type { Slug } from 'sanity';
import type { Asset, CommonImageAsset, SeoProps } from './common.types';

export interface ExhibitionPageProps {
  seo: SeoProps;
  sections: Section[];
  exhibitions: Exhibition[];
}

export interface Exhibition {
  _id: string;
  asset: Asset;
  name: string;
  subtitle?: string;
  tag: Tag;
  slug: Slug;
  type: 'Group Exhibition' | { name: string };
}

type Section = HeroProps | CommonImageAsset;

export interface HeroProps {
  _type: 'exhibitionPage.hero';
  highlightedExhibition: HighlightedExhibition[];
}

export interface HighlightedExhibition {
  name: string;
  slug: Slug;
  startDate: string;
  endDate: string;
  topTitle?: string;
  subtitle?: string;
  asset: Asset;
  tag: { name: string }[];
  type: string | { name: string };
}
